set -e
SK=$(ls -d /root/.claude/skills/synced/*/pptx)
cd "$(dirname "$0")/pilot"
cat p0.js p1.js p2.js p3.js p4.js p5.js > build_sra.js
node build_sra.js
python3 inject.py raw.pptx ../DFX_SRA_deck.pptx builds.json
python3 $SK/scripts/office/validate.py ../DFX_SRA_deck.pptx | tail -5
cd ..; rm -rf qa; mkdir qa
python3 $SK/scripts/office/soffice.py --headless --convert-to pdf DFX_SRA_deck.pptx >/dev/null 2>&1
pdftoppm -r 100 -png DFX_SRA_deck.pdf qa/s; ls qa | wc -l
