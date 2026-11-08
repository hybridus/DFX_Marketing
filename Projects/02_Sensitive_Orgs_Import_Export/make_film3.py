#!/usr/bin/env python3
"""Generate film3.html (the time-driven film page) from environment.html (project 02).
Strips the two static caption lines, wraps the USB asset in group #usbG, removes window.__done,
and appends the world/ui layers plus engine.js.  Run from this folder:  python3 -I make_film3.py"""
import re, os
H = os.path.dirname(os.path.abspath(__file__))
s = open(os.path.join(H, 'environment.html'), encoding='utf-8').read()
lines = [l for l in s.split('\n') if "Sensitive organizations · Import and export between" not in l and "Import runs left to right, export runs right to left." not in l]
s = '\n'.join(lines)
old = "ISO.assets.kiosk2(g,60,200);ISO.assets.usb(g,96,234,{z0:205});"
new = "ISO.assets.kiosk2(g,60,200);var usbG=se('g',{id:'usbG'},undefined,g);window.usbG=usbG;ISO.assets.usb(usbG,96,234,{z0:205});"
assert s.count(old) == 1, 'usb line not found'
s = s.replace(old, new)
tail_old = "window.__done=1;\n</script></body></html>"
assert s.count(tail_old) == 1, 'tail not found'
tail_new = ("\n\nvar world=se('g',{id:'world'},undefined,s);\n"
 "Array.prototype.slice.call(s.childNodes).forEach(function(n){if(n!==world&&n.nodeName!=='defs')world.appendChild(n);});\n"
 "var ui=se('g',{id:'ui'},undefined,s);\n</script><script src=\"engine.js\"></script></body></html>")
s = s.replace(tail_old, tail_new)
open(os.path.join(H, 'film3.html'), 'w', encoding='utf-8').write(s)
print('film3.html written')
