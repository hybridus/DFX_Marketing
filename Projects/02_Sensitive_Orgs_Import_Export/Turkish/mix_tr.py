#!/usr/bin/env python3
"""Mix the Turkish VO takes into the silent Turkish master -> renders/master_tr_vo.mp4 (VO only, like the English v7 master; loudnorm -16 LUFS / -1.5 TP).
Each take is placed at its Turkish audible start (i18n/starts_tr.json, produced by build_tr.py).  Usage: python3 -I mix_tr.py [silent.mp4] [out.mp4]"""
import json, os, subprocess, sys
H = os.path.dirname(os.path.abspath(__file__)); os.chdir(H)
SIL = sys.argv[1] if len(sys.argv) > 1 else 'renders/master_tr_silent.mp4'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'renders/master_tr_vo.mp4'
d = json.load(open('i18n/starts_tr.json')); st = d['starts']
order = list(st.keys())
def dur(f):
    o = subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True,check=True).stdout
    return float(o)
for i, k in enumerate(order):                       # safety net: no overlap between takes, every file present
    f = 'vo/%s.mp3' % k
    if not os.path.isfile(f) or os.path.getsize(f) < 5000: sys.exit('ABORT missing/corrupt ' + f)
    if i + 1 < len(order) and st[k] + dur(f) > st[order[i+1]] + 0.05: sys.exit('ABORT overlap %s -> %s' % (k, order[i+1]))
ins = []; fc = []; lab = ''
for i, k in enumerate(order):
    ms = int(round(st[k] * 1000)); ins += ['-i', 'vo/%s.mp3' % k]
    fc.append('[%d:a]adelay=%d|%d,afade=t=in:d=0.02[a%d]' % (i + 1, ms, ms, i)); lab += '[a%d]' % i
fc.append(lab + 'amix=inputs=%d:normalize=0:duration=longest,loudnorm=I=-16:TP=-1.5:LRA=9,apad=whole_dur=%.3f[mix]' % (len(order), d['END']))
subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-i',SIL]+ins+['-filter_complex',';'.join(fc),'-map','0:v','-map','[mix]','-c:v','copy','-c:a','aac','-b:a','192k','-t','%.3f' % d['END'],'-movflags','+faststart',OUT],check=True)
print('wrote', OUT)
