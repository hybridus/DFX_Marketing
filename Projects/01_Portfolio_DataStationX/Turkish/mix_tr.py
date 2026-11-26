#!/usr/bin/env python3
"""Mix Turkish VO + UI cues into the silent Turkish master -> renders/master_tr_vo.mp4 (166 s: 164 s film + 2 s hold).
Picture timing equals the English film; each Turkish take is placed (and, where a line spans several visual beats,
cut at its natural pauses) so key words land on their visual beats.  Cues come from ../mkaudio.py (read-only, run here).
Usage: python3 -I mix_tr.py [silent.mp4] [out.mp4]"""
import subprocess, sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); os.chdir(H)
SIL = sys.argv[1] if len(sys.argv) > 1 else 'renders/master_tr_silent.mp4'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'renders/master_tr_vo.mp4'
FILES = ['s00','s01','s02','s03','s04','s05','s06','s07','s08','s09','s10a','s10b']
# (file, src_start_s, src_end_s or None, film_start_ms)
SEG = [
 ('s00', 0.00, 0.66, 3200), ('s00', 1.05, 1.71, 4300), ('s00', 2.06, 2.63, 9200), ('s00', 2.85, 3.85, 13500),
 ('s00', 4.34, 6.77, 14550), ('s00', 7.18, 9.80, 17050), ('s00', 10.10, 14.37, 19750),
 ('s01', 0, None, 23950),
 ('s02', 0.00, 3.30, 33000), ('s02', 3.66, 7.04, 36500), ('s02', 7.36, 8.36, 40000), ('s02', 8.55, 11.08, 42800), ('s02', 11.36, None, 46500),
 ('s03', 0, None, 57000), ('s04', 0, None, 64300), ('s05', 0, None, 88500), ('s06', 0, None, 97600),
 ('s07', 0, None, 107000), ('s08', 0, None, 126800), ('s09', 0, None, 135000),
 ('s10a', 0, None, 155600), ('s10b', 0, None, 160300)]
json.dump([list(s) for s in SEG], open('i18n/starts_tr.json', 'w'), indent=1)
subprocess.run([sys.executable, '-I', '../mkaudio.py'], check=True)   # writes bed.wav (unused) + cues.wav here
fc = []; labels = []
for i, (f, a, b, ms) in enumerate(SEG):
    idx = FILES.index(f) + 1
    trim = 'atrim=%s:%s' % (a, b) if b else 'atrim=start=%s' % a
    dur = (b - a) if b else None
    fo = ('afade=t=out:st=%.3f:d=0.05,' % max(0, dur - 0.05)) if dur else ''
    fc.append('[%d]%s,asetpts=PTS-STARTPTS,afade=t=in:d=0.03,%sadelay=%d|%d[a%d]' % (idx, trim, fo, ms, ms, i)); labels.append('[a%d]' % i)
cue_idx = len(FILES) + 1
fc.append(''.join(labels) + 'amix=inputs=%d:normalize=0:duration=longest,apad=whole_dur=166,atrim=0:166[vo]' % len(SEG))
fc.append('[%d:a]volume=0.55[cu]' % cue_idx)
fc.append('[vo][cu]amix=inputs=2:normalize=0:duration=longest,loudnorm=I=-16:TP=-1.5:LRA=9,atrim=0:166[mix]')
cmd = ['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', SIL] + sum([['-i', 'vo/%s.mp3' % f] for f in FILES], []) + ['-i', 'cues.wav',
       '-filter_complex', '[0:v]tpad=stop_mode=clone:stop_duration=2,trim=0:166,setpts=PTS-STARTPTS[v];' + ';'.join(fc),
       '-map', '[v]', '-map', '[mix]', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', OUT]
subprocess.run(cmd, check=True)
for f in ('bed.wav', 'cues.wav'):
    if os.path.exists(f): os.remove(f)
print('wrote', OUT)
