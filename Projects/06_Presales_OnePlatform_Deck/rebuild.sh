set -e
SK=$(ls -d /root/.claude/skills/synced/*/pptx)
cd "$(dirname "$0")"
rm -f DFX_OnePlatform_deck.pptx DFX_OnePlatform_deck.pdf; rm -rf qa; mkdir -p qa
for V in ot corp; do
 (cd pilot && cat p0.js p1.js p2.js p3.js > build_op.js && V=$V node build_op.js && python3 inject.py raw_$V.pptx ../DFX_OnePlatform_$V.pptx builds_$V.json)
 python3 $SK/scripts/office/validate.py DFX_OnePlatform_$V.pptx | tail -3
 python3 $SK/scripts/office/soffice.py --headless --convert-to pdf DFX_OnePlatform_$V.pptx >/dev/null 2>&1
 mkdir -p qa/$V; pdftoppm -r 60 -png DFX_OnePlatform_$V.pdf qa/$V/s
done
ls qa/ot | wc -l; ls qa/corp | wc -l
