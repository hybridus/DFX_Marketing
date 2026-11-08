#!/usr/bin/env bash
# Render the silent master in 3 parallel parts -> join.  Length comes from the engine (stretch table).
# Needs: node + playwright (chromium), ffmpeg.  Run from this folder.  Usage: ./render.sh [version]  -> renders/master_silent_<version>.mp4
set -euo pipefail
cd "$(dirname "$0")"
VER="${1:-v2}"
python3 -I make_film3.py
export NODE_PATH="$(npm root -g)"
TOTAL=$(node ../../Common/tools/duration.js)
read A B <<<"$(python3 -c "t=$TOTAL;print(round(t/3,3),round(2*t/3,3))")"
T=../../Common/tools/render_range.js
node $T 0 $A part_p1.mp4 & node $T $A $B part_p2.mp4 & node $T $B $TOTAL part_p3.mp4 & wait
printf "file part_p1.mp4\nfile part_p2.mp4\nfile part_p3.mp4\n" > list.txt
ffmpeg -y -f concat -i list.txt -c copy renders/master_silent_$VER.mp4
rm -f part_p*.mp4 list.txt
