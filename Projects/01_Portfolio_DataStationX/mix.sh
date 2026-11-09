#!/usr/bin/env bash
# Mix voiceover (vo/*.mp3) + UI cues (no ambient bed since v2: it was audible noise) into the silent master -> master_vo.mp4 (166 s, 2 s hold at the end).
# Needs: python3 + numpy, ffmpeg.  Input: master_silent.mp4 (render.sh) or renders/master_silent_v4.mp4.
set -euo pipefail
cd "$(dirname "$0")"
SIL=${1:-renders/master_silent_v4.mp4}
python3 -I mkaudio.py          # writes bed.wav, cues.wav (cue times follow the film timeline)
P(){ echo "[$1]atrim=$2:$3,asetpts=PTS-STARTPTS,afade=t=in:d=0.03,afade=t=out:st=$(python3 -c "print(max(0,$3-$2-0.05))"):d=0.05,adelay=$4|$4[$5];"; }
D(){ echo "[$1:a]adelay=$2|$2,afade=t=in:d=0.02[$3];"; }
FC=""
# scene 0 is cut at its pauses so the words land on the zone pushes (Corporate 4s, Classified 9s, OT 13.5s, risk line 18.8s)
FC+=$(P 1 0 1.05 3200 a1); FC+=$(P 1 1.55 2.04 4300 a2); FC+=$(P 1 2.41 3.06 9200 a3)
FC+=$(P 1 3.52 4.83 13600 a4); FC+=$(P 1 5.27 6.84 15000 a5); FC+=$(P 1 7.31 8.95 17000 a6); FC+=$(P 1 9.47 13.5 18900 a7)
i=2
for T in 23400 33000 57000 64300 88800 97000 107000 126800 135000 155600 160300; do FC+=$(D $i $T b$i); i=$((i+1)); done
FC+="[a1][a2][a3][a4][a5][a6][a7][b2][b3][b4][b5][b6][b7][b8][b9][b10][b11][b12]amix=inputs=18:normalize=0:duration=longest,apad=whole_dur=166,atrim=0:166[vo];"
FC+="[13:a]volume=0.55[cu];"
FC+="[vo][cu]amix=inputs=2:normalize=0:duration=longest,loudnorm=I=-16:TP=-1.5:LRA=9,atrim=0:166[mix]"
ffmpeg -y -hide_banner -loglevel error -i "$SIL" -i vo/s00.mp3 \
 -i vo/s01.mp3 -i vo/s02.mp3 -i vo/s03.mp3 -i vo/s04.mp3 -i vo/s05.mp3 -i vo/s06.mp3 -i vo/s07.mp3 -i vo/s08.mp3 -i vo/s09.mp3 -i vo/s10a.mp3 -i vo/s10b.mp3 \
 -i cues.wav \
 -filter_complex "[0:v]tpad=stop_mode=clone:stop_duration=2,trim=0:166,setpts=PTS-STARTPTS[v];$FC" \
 -map "[v]" -map "[mix]" -c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -movflags +faststart ${2:-master_vo.mp4}
rm -f bed.wav cues.wav
