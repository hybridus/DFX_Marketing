#!/usr/bin/env bash
# Render the silent master: 3 parallel parts (0-56, 56-110, 110-164 s) -> join.  ~8 min on 2 cores.
# Needs: node + playwright (chromium), ffmpeg.  Run from this folder.  Output: master_silent.mp4
set -euo pipefail
cd "$(dirname "$0")"
python3 -I make_film3.py
T=../../Common/tools/render_range.js
export NODE_PATH="$(npm root -g)"
node $T 0 56   part_p1.mp4 & node $T 56 110 part_p2.mp4 & node $T 110 164 part_p3.mp4 & wait
printf "file part_p1.mp4\nfile part_p2.mp4\nfile part_p3.mp4\n" > list.txt
ffmpeg -y -f concat -i list.txt -c copy master_silent.mp4
rm -f part_p*.mp4 list.txt
