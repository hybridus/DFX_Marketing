#!/usr/bin/env bash
# Turkish silent master: build page (build_tr.py), render 3 parallel parts, join -> renders/master_tr_silent.mp4
set -euo pipefail
cd "$(dirname "$0")"
python3 -I i18n/build_tr.py
T=../../../Common/tools/render_range.js
export NODE_PATH="$(npm root -g)"
node $T 0 56 part_p1.mp4 & node $T 56 110 part_p2.mp4 & node $T 110 164 part_p3.mp4 & wait
printf "file part_p1.mp4\nfile part_p2.mp4\nfile part_p3.mp4\n" > list.txt
ffmpeg -y -f concat -i list.txt -c copy renders/master_tr_silent.mp4
rm -f part_p*.mp4 list.txt
