#!/usr/bin/env python3
"""Build the Turkish film page from the English sources WITHOUT modifying them.
Reads ../engine.js and ../environment.html (read-only), applies the exact-literal table in tr.json
(each rule must match exactly its expected count, else abort), writes ../engine.js and ../film3.html
inside Turkish/ (generated files).  Run:  python3 -I Turkish/i18n/build_tr.py"""
import json, os, sys, hashlib
HERE = os.path.dirname(os.path.abspath(__file__))
TR = os.path.dirname(HERE)            # Turkish/
P1 = os.path.dirname(TR)              # project 01 (English, locked)
rules = json.load(open(os.path.join(HERE, 'tr.json'), encoding='utf-8'))

def apply(src, table, label):
    for old, new, n in table:
        c = src.count(old)
        if c != n:
            sys.exit('ABORT %s: expected %d match(es), found %d for %r' % (label, n, c, old[:80]))
        src = src.replace(old, new)
    return src

env = open(os.path.join(P1, 'environment.html'), encoding='utf-8').read()
eng = open(os.path.join(P1, 'engine.js'), encoding='utf-8').read()
env = apply(env, rules['env'] + [['src="../../Common/iso/iso-lib.js"', 'src="../../../Common/iso/iso-lib.js"', 1]], 'env')
eng = apply(eng, rules['engine'], 'engine')

# same transformation as the English make_film3.py
lines = [l for l in env.split('\n') if "DataFlowX environment · isometric master map" not in l and "All approved assets on one map." not in l]
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
