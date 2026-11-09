#!/usr/bin/env bash
# Project 02: place vo/*.mp3 at the real-time start of each scene and mux into a silent master.
# usage: bash mix_vo.sh renders/master_silent_v6.mp4 renders/master_vo_v1.mp4 starts.json
set -euo pipefail
cd "$(dirname "$0")"
SIL=$1; OUT=$2; ST=$3
mapfile -t L < <(python3 -I - "$ST" <<'PY'
import json,sys
d=json.load(open(sys.argv[1]))
for k,v in d.items():
    if k!="END": print(k, int(round((v+0.3)*1000)))
PY
)
INS=(); FC=""; i=1; MIXIN=""
for line in "${L[@]}"; do
  k=${line% *}; ms=${line#* }
  INS+=(-i "vo/$k.mp3")
  FC+="[$i:a]adelay=${ms}|${ms},afade=t=in:d=0.02[a$i];"; MIXIN+="[a$i]"; i=$((i+1))
done
N=$((i-1))
FC+="${MIXIN}amix=inputs=$N:normalize=0:duration=longest,loudnorm=I=-16:TP=-1.5:LRA=9[mix]"
ffmpeg -y -hide_banner -loglevel error -i "$SIL" "${INS[@]}" -filter_complex "$FC" -map 0:v -map "[mix]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
