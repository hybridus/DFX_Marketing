set -e
SK=$(ls -d /root/.claude/skills/synced/*/pptx)
cd "$(dirname "$0")/pilot"
cat p0.js p1.js p2.js p3.js > build_op.js
node build_op.js
python3 inject.py raw.pptx ../DFX_OnePlatform_deck.pptx builds.json
python3 $SK/scripts/office/validate.py ../DFX_OnePlatform_deck.pptx | tail -5
cd ..; rm -rf qa; mkdir qa
python3 $SK/scripts/office/soffice.py --headless --convert-to pdf DFX_OnePlatform_deck.pptx >/dev/null 2>&1
pdftoppm -r 100 -png DFX_OnePlatform_deck.pdf qa/s; ls qa | wc -l
