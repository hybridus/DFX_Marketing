#!/usr/bin/env bash
# Project 02 Turkish silent master: build page, render 3 parallel parts, join -> renders/master_tr_silent.mp4. Run from anywhere.
set -euo pipefail
cd "$(dirname "$0")"
python3 -I i18n/build_tr.py
export NODE_PATH="$(npm root -g)"
TOTAL=$(node ../../../Common/tools/duration.js)
read A B <<<"$(python3 -c "t=$TOTAL;print(round(t/3,3),round(2*t/3,3))")"
T=../../../Common/tools/render_range.js
node $T 0 $A part_p1.mp4 & node $T $A $B part_p2.mp4 & node $T $B $TOTAL part_p3.mp4 & wait
printf "file part_p1.mp4\nfile part_p2.mp4\nfile part_p3.mp4\n" > list.txt
ffmpeg -y -f concat -i list.txt -c copy renders/master_tr_silent.mp4
rm -f part_p*.mp4 list.txt
echo "done $TOTAL s"
