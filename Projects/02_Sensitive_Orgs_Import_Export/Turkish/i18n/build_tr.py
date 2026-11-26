#!/usr/bin/env python3
"""Build the Turkish film page of project 02 from the English sources WITHOUT modifying them.
1) exact-literal table tr.json (each rule must match exactly its expected count, else abort) is applied to COPIES of ../../engine.js and ../../environment.html;
2) warp.json -> clock warp G (Turkish film time -> English film time), appended to the generated engine, so the English animation plays unchanged
   and every popup / camera move / chip lands on the Turkish phrase it belongs to;
3) writes ../engine.js, ../film3.html, starts_tr.json (Turkish VO file start times on the Turkish timeline) and prints the slope table.
Run:  python3 -I Turkish/i18n/build_tr.py"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); TR = os.path.dirname(HERE); P2 = os.path.dirname(TR)
rules = json.load(open(os.path.join(HERE, 'tr.json'), encoding='utf-8'))
warp = json.load(open(os.path.join(HERE, 'warp.json'), encoding='utf-8'))['lines']

def apply(src, table, label):
    for old, new, n in table:
        c = src.count(old)
        if c != n: sys.exit('ABORT %s: expected %d match(es), found %d for %r' % (label, n, c, old[:80]))
        src = src.replace(old, new)
    return src

env = open(os.path.join(P2, 'environment.html'), encoding='utf-8').read()
eng = open(os.path.join(P2, 'engine.js'), encoding='utf-8').read()
env = apply(env, rules['env'] + [['src="../../Common/iso/iso-lib.js"', 'src="../../../Common/iso/iso-lib.js"', 1]], 'env')
eng = apply(eng, rules['engine'], 'engine')

# ---- warp: anchors [turkish_time, english_time]
order = ['s00i','s00','s01','s02','s02b','s03','s04','s05','s06','s07','s08','s09','s10','s11','s12','s13','s14','s15','s16a','s16b']
anch = [[0.0, 0.0]]; starts = {}; cum = 0.0; prev_end = (0.0, 0.0)
for k in order:
    w = warp[k]; A = w['A_en']; T = A + cum
    pts = [(A, T)] + [(A + e, T + t) for e, t in w['pairs']] + [(A + w['en_end'], T + w['tr_end'])]
    for e, t in w['pairs']:
        if not (0 < e < w['en_end'] and 0 < t < w['tr_end']): sys.exit('ABORT pair outside line %s %s' % (k, (e, t)))
    for i in range(1, len(pts)):
        if not (pts[i][0] > pts[i-1][0] and pts[i][1] > pts[i-1][1]): sys.exit('ABORT not monotone in %s at %s' % (k, pts[i]))
    for en, tr in pts:
        if not (tr > anch[-1][0] and en > anch[-1][1]): sys.exit('ABORT not monotone at line %s (%s,%s)' % (k, tr, en))
        anch.append([round(tr, 3), round(en, 3)])
    starts[k] = round(T, 3)
    cum += w['tr_end'] - w['en_end']
T_END_EN = 242.1 + 6.03 + 1.4
T_END_TR = T_END_EN + cum
slopes = []
for i in range(1, len(anch)):
    s = (anch[i][1] - anch[i-1][1]) / (anch[i][0] - anch[i-1][0]); slopes.append((s, anch[i-1][0], anch[i][0]))
bad = [x for x in slopes if x[0] < 0.45 or x[0] > 1.7]
print('anchors', len(anch), '| slope min %.2f max %.2f | TR film length %.2f s (EN %.2f)' % (min(x[0] for x in slopes), max(x[0] for x in slopes), T_END_TR, T_END_EN))
for s, a, b in bad: print('  SLOPE WARNING %.2f between TR %.2f and %.2f' % (s, a, b))
json.dump({'starts': starts, 'END': round(T_END_TR, 3)}, open(os.path.join(HERE, 'starts_tr.json'), 'w'), indent=1)

wrap = ("\n/* ---- Turkish build: clock warp (Turkish film time -> English film time), generated from i18n/warp.json ---- */\n"
 "(function(){var GA=" + json.dumps(anch) + ";\n"
 "function mono(){for(var i=1;i<GA.length;i++)if(!(GA[i][0]>GA[i-1][0]&&GA[i][1]>GA[i-1][1]))throw new Error('warp not monotone at '+i);}mono();\n"
 "function G(t){if(t<=GA[0][0])return t;for(var i=1;i<GA.length;i++){if(t<=GA[i][0]){var a=GA[i-1],b=GA[i];return a[1]+(t-a[0])*(b[1]-a[1])/(b[0]-a[0]);}}var l=GA[GA.length-1];return l[1]+(t-l[0]);}\n"
 "function GI(e){for(var i=1;i<GA.length;i++){if(e<=GA[i][1]){var a=GA[i-1],b=GA[i];return a[0]+(e-a[1])*(b[0]-a[0])/(b[1]-a[1]);}}var l=GA[GA.length-1];return l[0]+(e-l[1]);}\n"
 "var orig=window.setTime,origCheck=window.__check,endEn=window.T_END;\n"
 "window.setTime=function(t){orig(G(t));};\n"
 "window.__check=function(){var s=window.setTime;window.setTime=orig;try{return origCheck();}finally{window.setTime=s;}};\n"
 "window.T_END=GI(endEn);window.WARP=G;window.WARP_INV=GI;})();\n")
eng = eng + wrap

lines = [l for l in env.split('\n') if "Sensitive organizations · Import and export between" not in l and "Import runs left to right, export runs right to left." not in l]
s = '\n'.join(lines)
old = "ISO.assets.kiosk2(g,60,200);ISO.assets.usb(g,96,234,{z0:205});"
new = "ISO.assets.kiosk2(g,60,200);var usbG=se('g',{id:'usbG'},undefined,g);window.usbG=usbG;ISO.assets.usb(usbG,96,234,{z0:205});"
assert s.count(old) == 1, 'usb line'
s = s.replace(old, new)
tail_old = "window.__done=1;\n</script></body></html>"
assert s.count(tail_old) == 1, 'tail'
tail_new = ("\n\nvar world=se('g',{id:'world'},undefined,s);\n"
 "Array.prototype.slice.call(s.childNodes).forEach(function(n){if(n!==world&&n.nodeName!=='defs')world.appendChild(n);});\n"
 "var ui=se('g',{id:'ui'},undefined,s);\n</script><script src=\"engine.js\"></script></body></html>")
s = s.replace(tail_old, tail_new)
s = s.replace('<html>', '<html lang="tr">', 1) if '<html>' in s else s
open(os.path.join(TR, 'engine.js'), 'w', encoding='utf-8').write(eng)
open(os.path.join(TR, 'film3.html'), 'w', encoding='utf-8').write(s)
print('built Turkish/engine.js + Turkish/film3.html;', len(rules['engine']), 'engine rules,', len(rules['env']) + 1, 'env rules')
