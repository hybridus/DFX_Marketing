/* DFX isometric asset library. World units; projection is global so assets can be placed anywhere on one map.
   Usage: ISO.init(svg,{cx,cy,s}); ISO.assets.kiosk(g, ox, oy) ... Every asset draws into group g at world offset (ox,oy). */
(function (W) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var ISO = { cam: { cx: 960, cy: 700, s: 1.5 }, assets: {} };
  W.ISO = ISO;

  function se(t, a, x, p) {
    var e = document.createElementNS(NS, t);
    if (a) for (var k in a) e.setAttribute(k, String(a[k]));
    if (x !== undefined) e.textContent = x;
    if (p) p.appendChild(e);
    return e;
  }
  ISO.se = se;
  function I(x, y, z) { var c = ISO.cam; return [c.cx + (x - y) * 0.866 * c.s, c.cy + (x + y) * 0.5 * c.s - z * c.s]; }
  ISO.I = I;
  function pts(a) { return a.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '); }
  ISO.pts = pts;
  function P(a, fill, stroke, p, sw) {
    return se('polygon', { points: pts(a), fill: fill, stroke: stroke || 'none', 'stroke-width': sw || 1.2, 'stroke-linejoin': 'round' }, undefined, p);
  }
  ISO.P = P;
  /* rounded rectangle outline, counter-clockwise, as [u,v] points */
  function rr(x0, z0, x1, z1, r, n) {
    var o = [], c = [[x1 - r, z1 - r, 0], [x0 + r, z1 - r, 90], [x0 + r, z0 + r, 180], [x1 - r, z0 + r, 270]];
    c.forEach(function (k) { for (var i = 0; i <= n; i++) { var a = (k[2] + 90 * i / n) * Math.PI / 180; o.push([k[0] + r * Math.cos(a), k[1] + r * Math.sin(a)]); } });
    return o;
  }
  ISO.rr = rr;
  /* extrude an (x,z) profile along y (ya back .. yb front, offset by ox,oy) */
  function extrudeXZ(prof, ya, yb, sideFill, frontFill, p, stroke, ox, oy) {
    ox = ox || 0; oy = oy || 0;
    var n = prof.length;
    for (var i = 0; i < n; i++) {
      var a = prof[i], b = prof[(i + 1) % n], nx = b[1] - a[1], nz = -(b[0] - a[0]);
      if (nx > -0.01 || nz > 0.01) P([I(ox + a[0], oy + ya, a[1]), I(ox + b[0], oy + ya, b[1]), I(ox + b[0], oy + yb, b[1]), I(ox + a[0], oy + yb, a[1])], sideFill, 'none', p, .5);
    }
    return P(prof.map(function (q) { return I(ox + q[0], oy + yb, q[1]); }), frontFill, stroke || '#55616D', p, 1.4);
  }
  ISO.extrudeXZ = extrudeXZ;
  /* extrude an (x,y) footprint upward in z, far sides first then the top */
  function extrudeXY(foot, z0, z1, sideFill, topFill, p, stroke, ox, oy) {
    ox = ox || 0; oy = oy || 0;
    var q = [];
    for (var i = 0; i < foot.length; i++) { var a = foot[i], b = foot[(i + 1) % foot.length]; q.push({ a: a, b: b, k: a[0] + a[1] + b[0] + b[1] }); }
    q.sort(function (u, v) { return u.k - v.k; });
    q.forEach(function (e) { P([I(ox + e.a[0], oy + e.a[1], z0), I(ox + e.b[0], oy + e.b[1], z0), I(ox + e.b[0], oy + e.b[1], z1), I(ox + e.a[0], oy + e.a[1], z1)], sideFill, 'none', p, .5); });
    return P(foot.map(function (t) { return I(ox + t[0], oy + t[1], z1); }), topFill, stroke || 'none', p, 1.2);
  }
  ISO.extrudeXY = extrudeXY;
  function box(x, y, z, w, d, h, top, left, right, p, st, ox, oy) {
    ox = ox || 0; oy = oy || 0; x += ox; y += oy;
    P([I(x, y + d, z), I(x + w, y + d, z), I(x + w, y + d, z + h), I(x, y + d, z + h)], left, st, p);
    P([I(x + w, y + d, z), I(x + w, y, z), I(x + w, y, z + h), I(x + w, y + d, z + h)], right, st, p);
    P([I(x, y, z + h), I(x + w, y, z + h), I(x + w, y + d, z + h), I(x, y + d, z + h)], top, st, p);
  }
  ISO.box = box;

  /* shared gradients, shadow and tokens */
  ISO.defs = function (svg) {
    var d = svg.querySelector('defs') || se('defs', null, undefined, svg);
    function lg(id, stops, x2, y2) { var g = se('linearGradient', { id: id, x1: 0, y1: 0, x2: x2, y2: y2 }, undefined, d); stops.forEach(function (t) { se('stop', { offset: t[0], 'stop-color': t[1] }, undefined, g); }); }
    lg('fl', [[0, '#1E2731'], [1, '#10151B']], 1, 1);
    lg('gold', [[0, '#FFD25C'], [.5, '#F5A800'], [1, '#B87800']], 1, 0);
    lg('steel', [[0, '#F4F6F8'], [.35, '#AEB7C0'], [.7, '#E3E8EC'], [1, '#7F8A95']], 0, 1);
    lg('glass', [[0, '#16202B'], [1, '#0A0F15']], 0, 1);
    lg('bodyL', [[0, '#3B4651'], [1, '#222A32']], 0, 1);
    lg('bodyR', [[0, '#1C232A'], [1, '#10151A']], 0, 1);
    lg('usbBody', [[0, '#3A4450'], [1, '#151A20']], 0, 1);
    var f = se('filter', { id: 'sh', x: '-30%', y: '-30%', width: '160%', height: '160%' }, undefined, d);
    se('feDropShadow', { dx: 0, dy: 16, stdDeviation: 13, 'flood-color': '#000', 'flood-opacity': .55 }, undefined, f);
    var hd = se('radialGradient', { id: 'head', cx: '40%', cy: '35%' }, undefined, d);
    se('stop', { offset: 0, 'stop-color': '#7A8794' }, undefined, hd); se('stop', { offset: 1, 'stop-color': '#3A444F' }, undefined, hd);
    var m = se('marker', { id: 'ar', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 12, markerHeight: 12, orient: 'auto' }, undefined, d);
    se('path', { d: 'M0 0L10 5L0 10z', fill: '#F5F7FA' }, undefined, m);
  };

  /* ---------------- ASSET 1: DFX Media Transfer Station (kiosk) ----------------
     Footprint about 140 x 120, height 330. Screen faces +y (toward the lower-left of the picture).
     opts.files: array of {n, on} rows shown on the glass. Returns anchor points in screen space. */
  ISO.assets.kiosk = function (g, ox, oy, opts) {
    opts = opts || {};
    var K = se('g', { filter: 'url(#sh)' }, undefined, g);
    extrudeXY(rr(-70, -60, 70, 60, 22, 6), 0, 10, '#10151A', '#2A323C', K, '#3A444F', ox, oy);        // base plate
    extrudeXZ(rr(-18, 10, 18, 120, 10, 5), -14, 14, 'url(#bodyR)', 'url(#bodyL)', K, null, ox, oy);   // stem
    extrudeXZ(rr(-48, 110, 48, 330, 22, 8), -16, 16, 'url(#bodyR)', 'url(#bodyL)', K, null, ox, oy);  // slab
    var FY = 16;
    function Lf(u, v) { return I(ox - 48 + 8 + u * 80, oy + FY, 110 + 14 + v * 190); }
    P(rr(-40, 126, 40, 318, 12, 6).map(function (q) { return I(ox + q[0], oy + FY, q[1]); }), 'url(#glass)', '#0B0D10', K, 2);
    P([I(ox - 36, oy + FY, 310), I(ox - 6, oy + FY, 310), I(ox - 30, oy + FY, 200), I(ox - 36, oy + FY, 200)], '#FFFFFF', null, K).setAttribute('opacity', '.035');
    P([Lf(.05, .93), Lf(.55, .93), Lf(.55, .95), Lf(.05, .95)], '#F5A800', 'none', K);
    var rows = opts.files || [{ n: 1, on: 1 }, { n: 2, on: 1 }, { n: 3, on: 1 }, { n: 4, on: 0 }, { n: 5, on: 1 }, { n: 6, on: 0 }];
    rows.forEach(function (r, i) {
      var v = .8 - i * .125, on = r.on;
      P([Lf(.05, v), Lf(.95, v), Lf(.95, v - .1), Lf(.05, v - .1)], '#161D25', on ? '#E6EDF5' : '#33404C', K, 1);
      P([Lf(.09, v - .03), Lf(.15, v - .03), Lf(.15, v - .07), Lf(.09, v - .07)], on ? '#F5F7FA' : 'none', '#7E8A96', K, 1);
    });
    P([I(ox + 48, oy - 16, 150), I(ox + 48, oy - 16, 300), I(ox + 48, oy - 12, 300), I(ox + 48, oy - 12, 150)], 'url(#gold)', 'none', K);   // gold edge light
    extrudeXY(rr(-44, 16, 44, 78, 16, 6), 84, 96, '#10151A', '#232B34', K, '#55616D', ox, oy);        // console shelf
    var c = I(ox - 20, oy + 48, 96);
    [16, 10, 4].forEach(function (r, i) { se('ellipse', { cx: c[0], cy: c[1], rx: r * 1.7, ry: r * .95, fill: 'none', stroke: '#F5A800', 'stroke-width': 2.4, opacity: 1 - i * .2 }, undefined, K); });  // NFC reader
    P([I(ox + 24, oy + 78, 86), I(ox + 38, oy + 78, 86), I(ox + 38, oy + 78, 94), I(ox + 24, oy + 78, 94)], '#050607', '#8A949F', K, 1);   // USB port
    return { screen: I(ox, oy + FY, 230), nfc: c, port: I(ox + 31, oy + 78, 90) };
  };

  /* extrude a (y,z) profile along x (xa..xb); visible: end face at xb, strips facing +y or +z */
  function extrudeYZ(prof, xa, xb, sideFill, endFill, p, stroke, ox, oy) {
    ox = ox || 0; oy = oy || 0;
    var n = prof.length, area = 0, i;
    for (i = 0; i < n; i++) { var a0 = prof[i], b0 = prof[(i + 1) % n]; area += a0[0] * b0[1] - b0[0] * a0[1]; }
    var sgn = area > 0 ? 1 : -1;
    for (i = 0; i < n; i++) {
      var a = prof[i], b = prof[(i + 1) % n], dy = b[0] - a[0], dz = b[1] - a[1];
      var ny = sgn * dz, nz = -sgn * dy;
      if (ny > 0.01 || nz > 0.01) P([I(ox + xa, oy + a[0], a[1]), I(ox + xa, oy + b[0], b[1]), I(ox + xb, oy + b[0], b[1]), I(ox + xb, oy + a[0], a[1])], sideFill, 'none', p, .5);
    }
    return P(prof.map(function (q) { return I(ox + xb, oy + q[0], q[1]); }), endFill, stroke || '#55616D', p, 1.2);
  }
  ISO.extrudeYZ = extrudeYZ;

  /* ---------------- ASSET 1 (v2): angular bent-profile kiosk ---------------- */
  ISO.assets.kiosk2 = function (g, ox, oy, opts) {
    opts = opts || {};
    var K = se('g', { filter: 'url(#sh)' }, undefined, g);
    var s = -30, H = 330, Z1 = 215;                       // short upper section leans back by 30 units
    // base plate with four mounting holes
    box(-90, -72, 0, 180, 144, 8, '#2C343D', '#171C22', '#10151A', K, '#3E4955', ox, oy);
    [[-76, -58], [76, -58], [-76, 58], [76, 58]].forEach(function (h) {
      var c = I(ox + h[0], oy + h[1], 8.2); se('ellipse', { cx: c[0], cy: c[1], rx: 6, ry: 3.4, fill: '#07090B', stroke: '#6B7683', 'stroke-width': 1 }, undefined, K);
    });
    var rail = [[14, 8], [14, Z1], [14 + s, H], [-14 + s, H], [-14, Z1], [-14, 8]];
    // far rail (left)
    extrudeYZ(rail, -54, -40, '#1A2027', '#3A444F', K, '#5B6773', ox, oy);
    // recessed central pedestal panel, set back from the rail fronts
    P([I(ox - 40, oy + 6, 8), I(ox + 40, oy + 6, 8), I(ox + 40, oy + 6, Z1), I(ox - 40, oy + 6, Z1)], '#232B34', '#0B0D10', K, 1);
    [-14, 14].forEach(function (x) { se('polyline', { points: ISO.pts([I(ox + x, oy + 6, 8), I(ox + x, oy + 6, Z1)]), stroke: '#0B0D10', 'stroke-width': 2, fill: 'none' }, undefined, K); });
    // upper enclosure: thick frame between the rails
    var yF = 11;                                          // frame front is slightly proud of the panel, behind the rail front
    function F(u, v) { return I(ox - 40 + u * 80, oy + yF + s * v, Z1 + (H - Z1) * v); }
    // top and back thickness
    P([I(ox - 40, oy + yF + s, H), I(ox + 40, oy + yF + s, H), I(ox + 40, oy - 14 + s, H), I(ox - 40, oy - 14 + s, H)], '#2E3741', '#4A5560', K, 1);
    P([F(0, 0), F(1, 0), F(1, 1), F(0, 1)], '#2A323C', '#55616D', K, 1.4);          // frame face
    // inset portrait screen with a thick border
    P([F(.14, .1), F(.86, .1), F(.86, .9), F(.14, .9)], '#0A0F15', '#0B0D10', K, 2);
    P([F(.17, .13), F(.83, .13), F(.83, .87), F(.17, .87)], 'url(#glass)', '#1A222B', K, 1);
    // screen content
    P([F(.2, .84), F(.5, .84), F(.5, .86), F(.2, .86)], '#F5A800', 'none', K);
    var rows = (opts.files || [1, 1, 1, 0, 1, 0]).slice(0, 4);
    rows.forEach(function (on, i) {
      var v = .76 - i * .19;
      P([F(.2, v), F(.8, v), F(.8, v - .15), F(.2, v - .15)], '#161D25', on ? '#E6EDF5' : '#33404C', K, 1);
      P([F(.23, v - .04), F(.29, v - .04), F(.29, v - .11), F(.23, v - .11)], on ? '#F5F7FA' : 'none', '#7E8A96', K, 1);
    });
    var nfc = I(ox - 18, oy + 66, 204);
    // near rail (right) last
    extrudeYZ(rail, 40, 54, '#1A2027', '#3A444F', K, '#5B6773', ox, oy);
    // keyboard tray just below the bend, projecting forward
    box(-36, 14, 197, 72, 52, 14, '#2A323C', '#171C22', '#10151A', K, '#4A5560', ox, oy);
    P([I(ox + 36, oy + 24, 201.5), I(ox + 36, oy + 44, 201.5), I(ox + 36, oy + 44, 208.5), I(ox + 36, oy + 24, 208.5)], '#050607', '#C9D1DA', K, 1.6);   // USB port on the tray side
    for (var r = 0; r < 4; r++) for (var c = 0; c < 10; c++) {
      var kx = -32 + c * 6.4, ky = 19 + r * 11.5;
      P([I(ox + kx, oy + ky, 211.2), I(ox + kx + 5, oy + ky, 211.2), I(ox + kx + 5, oy + ky + 9, 211.2), I(ox + kx, oy + ky + 9, 211.2)], '#1B222A', '#3A444F', K, .8);
    }
    P([I(ox - 31, oy + 66, 199.5), I(ox - 5, oy + 66, 199.5), I(ox - 5, oy + 66, 208.5), I(ox - 31, oy + 66, 208.5)], '#10151A', '#F5A800', K, 1.8);
    [3, 6.5, 10].forEach(function (r, i) {
      var a0 = I(ox - 18 + r * .55, oy + 66, 204 - r * .45), a1 = I(ox - 18 + r * .55, oy + 66, 204 + r * .45);
      se('path', { d: 'M' + a0[0].toFixed(1) + ' ' + a0[1].toFixed(1) + ' Q' + (a0[0] + r * 1.1).toFixed(1) + ' ' + ((a0[1] + a1[1]) / 2).toFixed(1) + ' ' + a1[0].toFixed(1) + ' ' + a1[1].toFixed(1), fill: 'none', stroke: '#F5A800', 'stroke-width': 1.6, 'stroke-linecap': 'round', opacity: 1 - i * .22 }, undefined, K);
    });
    return { screen: F(.5, .5), nfc: nfc, port: I(ox + 36, oy + 34, 206), keyboard: I(ox, oy + 40, 212) };
  };

  /* ---------------- ASSET 2: employee (faces -y, toward the kiosk; badge hand raised) ----------------
     Height 345 (a little taller than the kiosk). Arm ends at the NFC pad when placed at ox=22, oy=110 next to the kiosk. */
  ISO.assets.person = function (g, ox, oy, opts) {
    opts = opts || {};
    var fp = I(ox, oy, 0), A = se('g', { filter: 'url(#sh)', transform: 'translate(' + fp[0].toFixed(1) + ' ' + fp[1].toFixed(1) + ') scale(.8) translate(' + (-fp[0]).toFixed(1) + ' ' + (-fp[1]).toFixed(1) + ')' }, undefined, g);
    se('ellipse', { cx: I(ox, oy, 0)[0], cy: I(ox, oy, 0)[1] + 4, rx: 74, ry: 30, fill: '#07090B', opacity: .5 }, undefined, A);
    // shoes and legs
    [-20, 4].forEach(function (x, i) {
      box(x - 2, -14, 0, 20, 30, 12, '#262E37', '#10151A', '#0B0E12', A, '#3A444F', ox, oy);       // shoe
      box(x - 2, -9, 12, 20, 20, 138, i ? '#323C48' : '#3A4552', '#242C36', '#1B222A', A, '#566371', ox, oy);   // leg
    });
    // hips and torso (jacket)
    extrudeXY(rr(-27, -15, 27, 15, 9, 5), 146, 170, '#2B3643', '#3E4C5D', A, '#5A6877', ox, oy);
    extrudeXY(rr(-28, -16, 28, 16, 10, 5), 168, 262, '#3A4859', '#566A80', A, '#7388A0', ox, oy);
    extrudeXY(rr(-36, -17, 36, 17, 12, 5), 250, 290, '#42536A', '#62788F', A, '#8296AD', ox, oy);   // shoulders
    // collar line on the back and lanyard strap
    se('polyline', { points: ISO.pts([I(ox - 10, oy + 17, 290), I(ox, oy + 17, 274), I(ox + 10, oy + 17, 290)]), stroke: '#F5A800', 'stroke-width': 2.4, fill: 'none', 'stroke-linejoin': 'round' }, undefined, A);
    // neck, head, hair
    box(-7, -7, 290, 14, 14, 16, '#8A96A3', '#707C89', '#5B6773', A, '#2E3841', ox, oy);
    extrudeXY(rr(-15, -16, 15, 16, 12, 6), 306, 346, '#8A96A3', '#B4BEC8', A, '#5B6773', ox, oy);
    extrudeXY(rr(-16, -17, 16, 17, 12, 6), 334, 349, '#161B21', '#252D36', A, '#0B0E12', ox, oy);
    // far arm hanging (+x side)
    box(36, -9, 190, 13, 18, 98, '#3A4859', '#2B3643', '#222C37', A, '#5A6877', ox, oy);
    box(37, -8, 172, 11, 16, 20, '#B4BEC8', '#8A96A3', '#707C89', A, '#5B6773', ox, oy);       // hand
    // near arm: upper arm down, forearm forward toward the reader
    box(-49, -9, 236, 13, 18, 54, '#3A4859', '#2B3643', '#222C37', A, '#5A6877', ox, oy);
    box(-49, -46, 226, 13, 40, 14, '#4A5B70', '#334254', '#2A3645', A, '#7388A0', ox, oy);
    box(-49, -56, 224, 13, 12, 18, '#B4BEC8', '#8A96A3', '#707C89', A, '#5B6773', ox, oy);    // hand
    // badge card held at the hand, white with gold stripe
    var x0 = -47, y0 = -70, z0 = 218;
    P([I(ox + x0, oy + y0, z0), I(ox + x0 + 10, oy + y0, z0), I(ox + x0 + 10, oy + y0, z0 + 24), I(ox + x0, oy + y0, z0 + 24)], '#F5F7FA', '#C9D1DA', A, 1);
    P([I(ox + x0, oy + y0, z0 + 4), I(ox + x0 + 10, oy + y0, z0 + 4), I(ox + x0 + 10, oy + y0, z0 + 8), I(ox + x0, oy + y0, z0 + 8)], '#F5A800', 'none', A);
    function sc(q) { return [fp[0] + (q[0] - fp[0]) * .8, fp[1] + (q[1] - fp[1]) * .8]; }
    return { badge: sc(I(ox + x0 + 5, oy + y0, z0 + 12)), head: sc(I(ox, oy, 349)), hand: sc(I(ox - 43, oy - 56, 232)) };
  };

  function chaikin(poly, n) {
    var pts_ = poly;
    for (var k = 0; k < n; k++) {
      var o = [];
      for (var i = 0; i < pts_.length; i++) {
        var a = pts_[i], b = pts_[(i + 1) % pts_.length];
        o.push([.75 * a[0] + .25 * b[0], .75 * a[1] + .25 * b[1]], [.25 * a[0] + .75 * b[0], .25 * a[1] + .75 * b[1]]);
      }
      pts_ = o;
    }
    return pts_;
  }
  /* strip around a segment of width w, as a (y,z) quad */
  function strip(a, b, w) {
    var dy = b[0] - a[0], dz = b[1] - a[1], L = Math.sqrt(dy * dy + dz * dz) || 1, ny = -dz / L * w / 2, nz = dy / L * w / 2;
    return [[a[0] + ny, a[1] + nz], [b[0] + ny, b[1] + nz], [b[0] - ny, b[1] - nz], [a[0] - ny, a[1] - nz]];
  }

  /* ---------------- ASSET 2 (v2): employee in profile, facing -y, near arm raised with the badge ----------------
     Place at ox=-43, oy=118 beside the kiosk: the raised hand meets the NFC pad. */
  ISO.assets.person2 = function (g, ox, oy, opts) {
    opts = opts || {};
    var fp = I(ox, oy, 0), SC = .9;
    var A = se('g', { filter: 'url(#sh)', transform: 'translate(' + fp[0].toFixed(1) + ' ' + fp[1].toFixed(1) + ') scale(' + SC + ') translate(' + (-fp[0]).toFixed(1) + ' ' + (-fp[1]).toFixed(1) + ')' }, undefined, g);
    se('ellipse', { cx: fp[0], cy: fp[1] + 4, rx: 70, ry: 28, fill: '#07090B', opacity: .5 }, undefined, A);
    var skin = ['#8A96A3', '#B4BEC8', '#5B6773'];
    // far arm (hangs on the -x side, mostly hidden)
    extrudeYZ(strip([2, 280], [8, 200], 13), -40, -28, '#26303B', '#3A4859', A, '#566371', ox, oy);
    // legs and shoes
    var legPoly = [[-9, 152], [14, 152], [14, 14], [17, 0], [-32, 0], [-34, 9], [-14, 19], [-9, 32]];
    if (opts.legs2) {
      var base = [[-13, 152], [17, 152], [16, 104], [14, 80], [12, 42], [12, 20], [16, 0], [-33, 0], [-36, 9], [-14, 21], [-9, 42], [-9, 80], [-12, 104]];
      function stance(dy) { return base.map(function (q) { return [q[0] + dy * (1 - q[1] / 152), q[1]]; }); }
      extrudeYZ(stance(14), -20, -2, '#141A21', '#27313C', A, '#566371', ox, oy);                    // far leg stepped back
      extrudeYZ(stance(-10), 2, 20, '#1E252D', '#3C4857', A, '#6A7A8C', ox, oy);                     // near leg stepped forward
      se('polyline', { points: ISO.pts([I(ox + 20, oy + 2 - 6, 150), I(ox + 20, oy + 2 + 2, 30)]), stroke: '#566371', 'stroke-width': 1.2, fill: 'none' }, undefined, A);
    } else if (opts.refined) {
      var back = legPoly.map(function (q) { return [q[0] + 12, q[1]]; });
      extrudeYZ(back, -16, -2, '#161C23', '#2A3440', A, '#566371', ox, oy);                       // far leg stepped back
      extrudeYZ(legPoly, 2, 16, '#1E252D', '#3A4655', A, '#6A7A8C', ox, oy);                       // near leg
      se('polyline', { points: ISO.pts([I(ox + 16, oy - 9, 150), I(ox + 16, oy - 9, 34)]), stroke: '#566371', 'stroke-width': 1.2, fill: 'none' }, undefined, A);  // trouser crease
    } else extrudeYZ(legPoly, -15, 15, '#1E252D', '#36414E', A, '#566371', ox, oy);
    // jacket
    extrudeYZ(chaikin([[-19, 150], [21, 150], [23, 186], [22, 232], [20, 264], [15, 287], [4, 296], [-9, 296], [-18, 284], [-23, 256], [-23, 216], [-21, 176]], 2), -27, 27, '#2B3643', '#4A5C72', A, '#7388A0', ox, oy);
    if (opts.refined) {
      se('polyline', { points: ISO.pts([I(ox + 27, oy - 18, 172), I(ox + 27, oy + 21, 172)]), stroke: '#7388A0', 'stroke-width': 1.4, fill: 'none' }, undefined, A);      // jacket hem
      P([I(ox + 27, oy + 2, 192), I(ox + 27, oy + 14, 192), I(ox + 27, oy + 14, 204), I(ox + 27, oy + 2, 204)], 'none', '#7388A0', A, 1.2);                                  // pocket
    }
    // collar line and lanyard on the +x face
    se('polyline', { points: ISO.pts([I(ox + 27, oy - 9, 294), I(ox + 27, oy - 15, 262), I(ox + 27, oy - 18, 236)]), stroke: '#F5A800', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }, undefined, A);
    // neck and head with a nose
    extrudeYZ([[-8, 290], [8, 290], [8, 314], [-8, 314]], -8, 8, skin[2], skin[0], A, '#4A5560', ox, oy);
    var hs = opts.refined ? 1.12 : 1;
    function H(q) { return [q[0] * hs, 308 + (q[1] - 308) * hs]; }
    extrudeYZ(chaikin([[-12, 308], [10, 308], [18, 320], [19, 338], [11, 352], [-6, 356], [-15, 348], [-17, 336], [-26, 328], [-17, 322]].map(H), 1), -15 * hs, 15 * hs, skin[2], skin[1], A, '#4A5560', ox, oy);
    extrudeYZ(chaikin([[19, 336], [17, 351], [6, 359], [-9, 359], [-17, 350], [-15, 344], [0, 349], [12, 340]].map(H), 1), -16 * hs, 16 * hs, '#0F1318', '#252D36', A, '#0B0E12', ox, oy);
    // near arm: upper arm down to the elbow, forearm forward to the reader, hand and badge
    var sh = [-1, 282], el = [8, 218], hd = [-52, 224];
    extrudeYZ(strip(sh, el, 15), 26, 41, '#2F3B49', '#4A5B70', A, '#7388A0', ox, oy);
    extrudeYZ(strip(el, hd, 14), 26, 41, '#2F3B49', '#4A5B70', A, '#7388A0', ox, oy);
    extrudeYZ(chaikin([[-52, 216], [-62, 216], [-64, 232], [-54, 234]], 2), 28, 39, skin[2], skin[1], A, '#4A5560', ox, oy);
    var bx = 31.5;
    P([I(ox + bx + 3, oy - 70, 212), I(ox + bx + 3, oy - 62, 212), I(ox + bx + 3, oy - 62, 238), I(ox + bx + 3, oy - 70, 238)], '#F5F7FA', '#C9D1DA', A, 1);
    P([I(ox + bx + 3, oy - 70, 218), I(ox + bx + 3, oy - 62, 218), I(ox + bx + 3, oy - 62, 223), I(ox + bx + 3, oy - 70, 223)], '#F5A800', 'none', A);
    function sc(q) { return [fp[0] + (q[0] - fp[0]) * SC, fp[1] + (q[1] - fp[1]) * SC]; }
    return { badge: sc(I(ox + bx + 3, oy - 66, 230)), head: sc(I(ox, oy, 359)), hand: sc(I(ox + 33, oy - 58, 224)) };
  };

  /* ---------------- ASSET 3: USB memory stick (lies along +x; connector tip at ox,oy; z0 = centre height) ---------------- */
  ISO.assets.usb = function (g, ox, oy, opts) {
    opts = opts || {};
    var z0 = opts.z0 || 0, U = se('g', { filter: 'url(#sh)' }, undefined, g);
    // simplified: plain steel plug + plain capsule body + lanyard hole (no band, no contact detail)
    extrudeXY([[0, -5.5], [22, -5.5], [22, 5.5], [0, 5.5]], z0 - 2.6, z0 + 2.6, '#8B96A1', 'url(#steel)', U, '#5E6975', ox, oy);
    extrudeXY(rr(22, -11, 80, 11, 8, 6), z0 - 6.5, z0 + 6.5, '#1B232C', 'url(#usbBody)', U, '#7C8896', ox, oy);
    var h = I(ox + 71, oy, z0 + 6.7);
    se('ellipse', { cx: h[0], cy: h[1], rx: 3.8 * ISO.cam.s, ry: 2.3 * ISO.cam.s, fill: '#0A0D10', stroke: '#C9D1DA', 'stroke-width': 1.2 }, undefined, U);
    // dark-red biohazard-style trefoil on the top face (flat on the iso plane)
    var zt = z0 + 6.8, cxm = 47, Ub = se('g', { 'class': 'usb-badge' }, undefined, U);
    if (opts.badge === false) Ub.setAttribute('display', 'none');
    function disc(x, y, r, fill, st, sw) { var q = []; for (var k = 0; k < 24; k++) { var an = k / 24 * Math.PI * 2; q.push(I(ox + x + Math.cos(an) * r, oy + y + Math.sin(an) * r, zt)); } return P(q, fill, st || 'none', Ub, sw || 1); }
    disc(cxm, 0, 9.6, '#3A0A10', '#B3121F', 1.2);
    for (var l = 0; l < 3; l++) { var ang = -Math.PI / 2 + l * Math.PI * 2 / 3; disc(cxm + Math.cos(ang) * 4.3, Math.sin(ang) * 4.3, 3.6, '#B3121F', 'none'); }
    disc(cxm, 0, 2.2, '#3A0A10', 'none');
    disc(cxm, 0, 1.0, '#B3121F', 'none');
    return { connector: I(ox + 11, oy, z0 + 2.6), band: I(ox + 45, oy, z0 + 6.6), hole: h, body: I(ox + 33, oy, z0 + 6.6) };
  };

  /* ---------------- ASSET: institution building (government / partner organisation); front faces +y, entrance centred ---------------- */
  ISO.assets.institution = function (g, ox, oy, opts) {
    opts = opts || {};
    var Wd = opts.w || 200, D = opts.d || 110, H = 64, B = se('g', { filter: 'url(#sh)' }, undefined, g);
    var T = '#2B3440', L = '#1D2530', R = '#161C24', S = '#3A4552', GOLD = '#F5A800';
    box(-12, -4, 0, Wd + 24, D + 30, 5, S, '#222A34', '#1A2028', B, '#4A5662', ox, oy);
    box(0, 0, 5, Wd, D, H, T, L, R, B, '#55616D', ox, oy);
    for (var r = 0; r < 2; r++) for (var c = 0; c < 4; c++) {
      var y0 = 14 + c * 24, z0 = 18 + r * 22;
      P([I(ox + Wd, oy + y0, 5 + z0), I(ox + Wd, oy + y0 + 13, 5 + z0), I(ox + Wd, oy + y0 + 13, 5 + z0 + 12), I(ox + Wd, oy + y0, 5 + z0 + 12)], '#0E131A', '#55616D', B, 1);
    }
    var cx = Wd / 2;
    P([I(ox + cx - 13, oy + D, 5), I(ox + cx + 13, oy + D, 5), I(ox + cx + 13, oy + D, 5 + 36), I(ox + cx - 13, oy + D, 5 + 36)], '#0A0D10', GOLD, B, 1.4);
    var nc = 6, cw = 8;
    for (var i = 0; i < nc; i++) {
      var x = 18 + i * ((Wd - 36 - cw) / (nc - 1));
      box(x, D + 2, 5, cw, cw, H - 8, '#8B96A1', '#6C7782', '#59636E', B, '#3A444F', ox, oy);
    }
    box(8, D - 2, 5 + H - 8, Wd - 16, 16, 7, '#3A4552', '#2A323C', '#20272F', B, '#55616D', ox, oy);
    var yp = D + 14, zb = 5 + H - 1;
    P([I(ox + 6, oy + yp, zb), I(ox + Wd - 6, oy + yp, zb), I(ox + Wd / 2, oy + yp, zb + 24)], '#2A323C', '#55616D', B, 1.4);
    P([I(ox + 22, oy + yp, zb + 3), I(ox + Wd - 22, oy + yp, zb + 3), I(ox + Wd / 2, oy + yp, zb + 17)], 'none', GOLD, B, 1);
    var fx = Wd / 2, fy = D / 2, a0 = I(ox + fx, oy + fy, 5 + H), a1 = I(ox + fx, oy + fy, 5 + H + 44);
    se('line', { x1: a0[0], y1: a0[1], x2: a1[0], y2: a1[1], stroke: '#C9D1DA', 'stroke-width': 1.6 }, undefined, B);
    P([I(ox + fx, oy + fy, 5 + H + 44), I(ox + fx, oy + fy + 26, 5 + H + 42), I(ox + fx, oy + fy + 26, 5 + H + 30), I(ox + fx, oy + fy, 5 + H + 32)], GOLD, 'none', B);
    return { entrance: [ox + cx, oy + D + 24], top: I(ox + cx, oy + D / 2, 5 + H + 46) };
  };

  /* ---------------- ASSET 4: DFX One Platform (options A cabinet, B three racks, C open frame) ---------------- */
  var SLOTS = ['Policy', 'AV 1', 'AV 2', 'AV 3', 'AV 4', 'TruCDR', 'Sandbox', 'Seal & store'];
  function faceSlot(g, ox, oy, y, x0, x1, z0, z1, label, strip) {
    P([I(ox + x0, oy + y, z0), I(ox + x1, oy + y, z0), I(ox + x1, oy + y, z1), I(ox + x0, oy + y, z1)], '#0E131A', '#3A444F', g, 1);
    var m = (z1 - z0) * 0.5 + z0, h = (z1 - z0) * 0.14;
    if (label) {
      var o = I(ox + x0 + 4, oy + y, z1 - 3), sc = ISO.cam.s;
      se('text', { transform: 'matrix(' + (0.866 * sc) + ' ' + (0.5 * sc) + ' 0 ' + sc + ' ' + o[0] + ' ' + (o[1] + (z1 - z0 - 6) * sc * 0.0) + ')', style: 'font:600 ' + Math.min(8, (z1 - z0) * 0.5) + 'px Inter;fill:#E6EDF5' }, label, g);
      P([I(ox + x1 - 7, oy + y, m + h), I(ox + x1 - 4, oy + y, m + h), I(ox + x1 - 4, oy + y, m - h), I(ox + x1 - 7, oy + y, m - h)], '#F5A800', 'none', g);
    } else {
      P([I(ox + x0 + 5, oy + y, m + h), I(ox + x1 - 14, oy + y, m + h), I(ox + x1 - 14, oy + y, m - h), I(ox + x0 + 5, oy + y, m - h)], strip || '#C9D1DA', 'none', g);
      P([I(ox + x1 - 9, oy + y, m + h * 1.2), I(ox + x1 - 5, oy + y, m + h * 1.2), I(ox + x1 - 5, oy + y, m - h * 1.2), I(ox + x1 - 9, oy + y, m - h * 1.2)], '#F5A800', 'none', g);
    }
  }
  var TOP = '#3A444F', LEFT = '#222A32', RIGHT = '#161C22', EDGE = '#4A5560';
  ISO.assets.platformA = function (g, ox, oy, opts) {
    opts = opts || {}; var G = se('g', { filter: 'url(#sh)' }, undefined, g), w = 100, d = 70, h = 236;
    box(-8, -8, 0, w + 16, d + 16, 8, '#2E3741', '#171C22', '#10141A', G, EDGE, ox, oy);
    box(0, 0, 8, w, d, h, TOP, LEFT, RIGHT, G, EDGE, ox, oy);
    box(0, 0, 8 + h, w, d, 6, '#46515E', '#2A323C', '#1D232A', G, EDGE, ox, oy);
    var n = SLOTS.length, gap = 5, sh = (h - 22 - gap * (n - 1)) / n;
    for (var i = 0; i < n; i++) { var z1 = 8 + h - 12 - i * (sh + gap); faceSlot(G, ox, oy, d, 8, w - 8, z1 - sh, z1, opts.labels ? SLOTS[i] : null); }
    return { front: I(ox + w / 2, oy + d, 8 + h / 2), top: I(ox + w / 2, oy + d / 2, 8 + h + 6) };
  };
  ISO.assets.platformB = function (g, ox, oy) {
    var G = se('g', { filter: 'url(#sh)' }, undefined, g), d = 64, w = 46, hs = [150, 226, 150], cnt = [2, 6, 2];
    box(-8, -8, 0, 3 * w + 2 * 14 + 16, d + 16, 8, '#2E3741', '#171C22', '#10141A', G, EDGE, ox, oy);
    for (var r = 0; r < 3; r++) {
      var x = r * (w + 14), h = hs[r];
      box(x, 0, 8, w, d, h, TOP, LEFT, RIGHT, G, EDGE, ox, oy);
      box(x, 0, 8 + h, w, d, 5, '#46515E', '#2A323C', '#1D232A', G, EDGE, ox, oy);
      var n = cnt[r], gap = 5, sh = Math.min(26, (h - 20 - gap * (n - 1)) / n);
      for (var i = 0; i < n; i++) { var z1 = 8 + h - 10 - i * (sh + gap); faceSlot(G, ox, oy, d, x + 5, x + w - 5, z1 - sh, z1, null); }
    }
    return { front: I(ox + 85, oy + d, 100) };
  };
  ISO.assets.platformC = function (g, ox, oy) {
    var G = se('g', { filter: 'url(#sh)' }, undefined, g), w = 104, d = 76, h = 236, pw = 8;
    box(-8, -8, 0, w + 16, d + 16, 8, '#2E3741', '#171C22', '#10141A', G, EDGE, ox, oy);
    box(0, 0, 8, pw, pw, h, TOP, LEFT, RIGHT, G, EDGE, ox, oy);
    box(w - pw, 0, 8, pw, pw, h, TOP, LEFT, RIGHT, G, EDGE, ox, oy);
    var n = SLOTS.length, gap = 6, sh = 18;
    for (var i = n - 1; i >= 0; i--) {
      var z = 20 + (n - 1 - i) * (sh + gap), off = (i % 2) * 8 - 4;
      box(14 + off, 10, z, w - 28, d - 24, sh, '#46515E', '#2A323C', '#1D232A', G, EDGE, ox, oy);
      P([I(ox + 14 + off + 6, oy + d - 14, z + sh * 0.65), I(ox + w - 14 + off - 22, oy + d - 14, z + sh * 0.65), I(ox + w - 14 + off - 22, oy + d - 14, z + sh * 0.35), I(ox + 14 + off + 6, oy + d - 14, z + sh * 0.35)], '#C9D1DA', 'none', G);
      P([I(ox + w - 14 + off - 14, oy + d - 14, z + sh * 0.7), I(ox + w - 14 + off - 8, oy + d - 14, z + sh * 0.7), I(ox + w - 14 + off - 8, oy + d - 14, z + sh * 0.3), I(ox + w - 14 + off - 14, oy + d - 14, z + sh * 0.3)], '#F5A800', 'none', G);
    }
    box(0, d - pw, 8, pw, pw, h, TOP, LEFT, RIGHT, G, EDGE, ox, oy);
    box(w - pw, d - pw, 8, pw, pw, h, TOP, LEFT, RIGHT, G, EDGE, ox, oy);
    box(0, 0, 8 + h, w, d, 5, '#46515E', '#2A323C', '#1D232A', G, EDGE, ox, oy);
    return { front: I(ox + w / 2, oy + d, 120) };
  };

  /* Option D: single rack server. D1 engines as modules on top, D2 engines as vertical bays in the front */
  ISO.assets.platformD = function (g, ox, oy, opts) {
    opts = opts || {}; var G = se('g', { filter: 'url(#sh)' }, undefined, g), w = 150, d = 90, h = 40;
    box(-6, -6, 0, w + 12, d + 12, 6, '#2E3741', '#171C22', '#10141A', G, EDGE, ox, oy);
    box(0, 0, 6, w, d, h, TOP, LEFT, RIGHT, G, EDGE, ox, oy);
    var z1 = 6 + h;
    if (opts.top) {
      // 8 small engine modules on the lid: policy, 4 AV, TruCDR, Sandbox, seal; two rows of four, row nearest the viewer drawn last
      var cols = [['#E6EDF5', 0], ['#C9D1DA', 1], ['#C9D1DA', 2], ['#C9D1DA', 3]];
      for (var r = 0; r < 2; r++) for (var c = 0; c < 4; c++) {
        var x = 10 + c * 34, y = 12 + r * 38;
        box(x, y, z1, 28, 28, 14, '#46515E', '#2A323C', '#1D232A', G, EDGE, ox, oy);
        P([I(ox + x + 4, oy + y + 28, z1 + 10), I(ox + x + 24, oy + y + 28, z1 + 10), I(ox + x + 24, oy + y + 28, z1 + 6), I(ox + x + 4, oy + y + 28, z1 + 6)], (r === 1 && c === 3) ? '#F5A800' : '#C9D1DA', 'none', G);
      }
    }
    // front face bays
    var n = 8, gap = 5, bw = (w - 20 - gap * (n - 1)) / n;
    for (var i = 0; i < n; i++) {
      var x0 = 10 + i * (bw + gap);
      if (opts.top) { P([I(ox + x0, oy + d, 12), I(ox + x0 + bw, oy + d, 12), I(ox + x0 + bw, oy + d, 38), I(ox + x0, oy + d, 38)], '#0E131A', '#3A444F', G, 1); P([I(ox + x0 + 2, oy + d, 30), I(ox + x0 + bw - 2, oy + d, 30), I(ox + x0 + bw - 2, oy + d, 27), I(ox + x0 + 2, oy + d, 27)], '#8FA0B3', 'none', G); }
      else {
        P([I(ox + x0, oy + d, 11), I(ox + x0 + bw, oy + d, 11), I(ox + x0 + bw, oy + d, 42), I(ox + x0, oy + d, 42)], '#0E131A', '#3A444F', G, 1);
        P([I(ox + x0 + 2.5, oy + d, 38), I(ox + x0 + bw - 2.5, oy + d, 38), I(ox + x0 + bw - 2.5, oy + d, 16), I(ox + x0 + 2.5, oy + d, 16)], i === 7 ? '#F5A800' : '#C9D1DA', 'none', G);
      }
    }
    return { front: I(ox + w / 2, oy + d, 26) };
  };

  /* Asset 4 refined (D1+): rack-server appliance with a centered name plate. opts: w,d,h,lines[],fs,mods(bool),lift[] */
  ISO.MODS = ['AV 1', 'AV 2', 'AV 3', 'AV 4', 'TruCDR', 'Policy Engine', 'Managed File Transfer', 'User Portal'];
  ISO.assets.platformD1 = function (g, ox, oy, opts) {
    opts = opts || {}; var G = se('g', { filter: 'url(#sh)' }, undefined, g), w = opts.w || 196, d = opts.d || 112, h = opts.h || 48, z1 = 6 + h, tops = [];
    var lines = opts.lines || ['DFX ONE PLATFORM'], fs = opts.fs || 11;
    box(-7, -7, 0, w + 14, d + 14, 6, '#2E3741', '#171C22', '#10141A', G, EDGE, ox, oy);
    box(0, 0, 6, w, d, h, TOP, LEFT, RIGHT, G, EDGE, ox, oy);
    P([I(ox, oy + d, z1), I(ox + w, oy + d, z1), I(ox + w, oy + d, z1 - 2.5), I(ox, oy + d, z1 - 2.5)], opts.rail || '#F5A800', 'none', G);
    // name plate: centered horizontally and vertically on the front face (+y face)
    var zc = 6 + (h - 2.5) / 2, o = I(ox + w / 2, oy + d, zc), sc = ISO.cam.s, lh = fs * 1.25;
    lines.forEach(function (ln, i) {
      var dy = fs * 0.36 + (i - (lines.length - 1) / 2) * lh;
      se('text', { transform: 'matrix(' + (0.866 * sc) + ' ' + (0.5 * sc) + ' 0 ' + sc + ' ' + o[0] + ' ' + o[1] + ')', x: 0, y: dy, 'text-anchor': 'middle', style: 'font:700 ' + fs + 'px Inter;fill:#F5F7FA;letter-spacing:.08em' }, ln, G);
    });
    // server look: two vertical bays at the left end, three status LEDs at the right end (plate stays centered)
    for (var bi = 0; bi < 2; bi++) { var bx = 7 + bi * 8; P([I(ox + bx, oy + d, 12), I(ox + bx + 6, oy + d, 12), I(ox + bx + 6, oy + d, 6 + h - 8), I(ox + bx, oy + d, 6 + h - 8)], '#0E131A', '#3A444F', G, 1); P([I(ox + bx + 1.5, oy + d, 15), I(ox + bx + 4.5, oy + d, 15), I(ox + bx + 4.5, oy + d, 6 + h - 11), I(ox + bx + 1.5, oy + d, 6 + h - 11)], '#8FA0B3', 'none', G); }
    [['#3DDC84', 0], ['#F5A800', 1], ['#E6EDF5', 2]].forEach(function (L) { var zz = 14 + L[1] * 11, lx = w - 13; P([I(ox + lx, oy + d, zz + 5), I(ox + lx + 7, oy + d, zz + 5), I(ox + lx + 7, oy + d, zz), I(ox + lx, oy + d, zz)], L[0], 'none', G); });
    if (opts.mods) for (var r = 0; r < 2; r++) for (var c = 0; c < 4; c++) {
      var k = r * 4 + c, x = 14 + c * 44, y = 12 + r * 50, lift = (opts.lift ? opts.lift[k] : 0), mh = 16;
      box(x, y, z1 + lift, 38, 36, mh, '#46515E', '#2A323C', '#1D232A', G, EDGE, ox, oy);
      P([I(ox + x + 5, oy + y + 36, z1 + lift + 11), I(ox + x + 33, oy + y + 36, z1 + lift + 11), I(ox + x + 33, oy + y + 36, z1 + lift + 6), I(ox + x + 5, oy + y + 36, z1 + lift + 6)], k === 7 ? '#F5A800' : '#C9D1DA', 'none', G);
      tops.push(I(ox + x + 19, oy + y + 18, z1 + lift + mh));
    }
    else if (opts.lid === 'arrow') { // gateway lid: three flat chevrons pointing along +x = one-way flow
      var ac = '#F5A800';
      var rv = opts.rev ? 1 : 0, mx = function (u) { return rv ? w - u : u; }; // opts.rev: mirrored lid, chevrons point along -x
      [28, 74, 120].forEach(function (u0) {
        P([I(ox + mx(u0), oy + 26, z1), I(ox + mx(u0 + 30), oy + 26, z1), I(ox + mx(u0 + 52), oy + d / 2, z1), I(ox + mx(u0 + 30), oy + d - 26, z1), I(ox + mx(u0), oy + d - 26, z1), I(ox + mx(u0 + 22), oy + d / 2, z1)], ac, 'none', G);
      });
      tops.push(I(ox + 100, oy + d / 2, z1), I(ox + 178, oy + d / 2, z1), I(ox + 18, oy + d / 2, z1));
    }
    else { // sandbox-style lid: one inset glass chamber
      box(w * 0.2, d * 0.2, z1, w * 0.6, d * 0.6, 12, '#46515E', '#2A323C', '#1D232A', G, EDGE, ox, oy);
      tops.push(I(ox + w / 2, oy + d / 2, z1 + 12));
    }
    return { tops: tops, front: I(ox + w / 2, oy + d, zc), center: I(ox + w / 2, oy + d / 2, z1 + 16) };
  };
  ISO.assets.sandbox = function (g, ox, oy, opts) {
    opts = opts || {}; opts.lines = ['DFX MALWARE', 'MITIGATION SANDBOX']; opts.fs = opts.fs || 9.5; opts.mods = 0; return ISO.assets.platformD1(g, ox, oy, opts);
  };
  ISO.assets.gateway = function (g, ox, oy, opts) {
    opts = opts || {}; var z = opts.zone === 'ot' ? '#2CC4D9' : '#9B6FD8';
    return ISO.assets.platformD1(g, ox, oy, { lines: ['DFX UNIDIRECTIONAL', 'GATEWAY'], fs: 10, mods: 0, lid: 'arrow', rail: z, rev: opts.rev });
  };

  /* Asset 7: desk PC (Web Portal user). opts.zone: 'corp' | 'cls' ; monitor + keyboard + tower on a desk */
  ISO.assets.deskpc = function (g, ox, oy, opts) {
    opts = opts || {}; var zc = opts.zone === 'cls' ? '#9B6FD8' : opts.zone === 'ot' ? '#2CC4D9' : '#4F8FC9', G = se('g', { filter: 'url(#sh)' }, undefined, g);
    var dw = 150, dd = 80, dz = 40;
    // desk legs (far first) and top
    box(4, 4, 0, 6, 6, dz, '#2E3741', '#1D232A', '#141A20', G, EDGE, ox, oy);
    box(dw - 10, 4, 0, 6, 6, dz, '#2E3741', '#1D232A', '#141A20', G, EDGE, ox, oy);
    box(4, dd - 10, 0, 6, 6, dz, '#2E3741', '#1D232A', '#141A20', G, EDGE, ox, oy);
    box(dw - 10, dd - 10, 0, 6, 6, dz, '#2E3741', '#1D232A', '#141A20', G, EDGE, ox, oy);
    box(0, 0, dz, dw, dd, 5, '#46515E', '#2A323C', '#1D232A', G, EDGE, ox, oy);
    var z0 = dz + 5;
    // monitor: slim panel with thin bezel on a tapered neck and a low rounded base
    var mw = 130, mh = 73, my = 22, mx = 10, md = 4.5, mz = z0 + 20;
    extrudeXY(rr(56, 8, 94, 34, 6, 5), z0, z0 + 2.5, '#222A32', '#3A444F', G, EDGE, ox, oy);
    extrudeXY([[70, my - 2], [80, my - 2], [78, my + 5], [72, my + 5]], z0 + 2.5, mz + 4, '#2A323C', '#323B46', G, EDGE, ox, oy);
    box(mx, my, mz, mw, md, mh, '#3A444F', '#222A32', '#161C22', G, EDGE, ox, oy);
    var f = function (u, v) { return I(ox + mx + 3 + u * (mw - 6), oy + my + md, mz + 3 + v * (mh - 6)); };
    P([f(0, 0), f(1, 0), f(1, 1), f(0, 1)], '#0E131A', '#0B0D10', G, 1);
    P([f(0.04, 0.9), f(0.5, 0.9), f(0.5, 0.95), f(0.04, 0.95)], zc, 'none', G);
    for (var r = 0; r < 4; r++) { var v0 = 0.72 - r * 0.2; P([f(0.04, v0), f(0.96, v0), f(0.96, v0 - 0.14), f(0.04, v0 - 0.14)], '#1A2027', '#3A444F', G, 1); P([f(0.07, v0 - 0.04), f(0.12, v0 - 0.04), f(0.12, v0 - 0.1), f(0.07, v0 - 0.1)], r === 3 ? '#F5A800' : '#3DDC84', 'none', G); }
    // zone-colored bezel stripe along the monitor's base edge
    P([I(ox + mx, oy + my + md, mz + 2), I(ox + mx + mw, oy + my + md, mz + 2), I(ox + mx + mw, oy + my + md, mz), I(ox + mx, oy + my + md, mz)], zc, 'none', G);
    // keyboard
    box(30, 52, z0, 62, 20, 3, '#2E3741', '#1D232A', '#141A20', G, EDGE, ox, oy);
    for (var kr = 0; kr < 3; kr++) for (var kc = 0; kc < 9; kc++) {
      var kx = 33 + kc * 6.5, ky = 54 + kr * 5.6; P([I(ox + kx, oy + ky, z0 + 3), I(ox + kx + 4.8, oy + ky, z0 + 3), I(ox + kx + 4.8, oy + ky + 3.8, z0 + 3), I(ox + kx, oy + ky + 3.8, z0 + 3)], '#46515E', 'none', G);
    }
    return { screen: I(ox + mx + mw / 2, oy + my + 2, mz + mh), tops: [I(ox + mx + mw / 2, oy + my + 2, mz + mh)] };
  };

  /* Asset 8: large CNC machine (half-room size) with an integrated operator console (OT Management PC, or the CNC computer when isolated).
     opts.zone: 'ot' (cyan, connected) | 'iso' (gray, isolated) */
  ISO.assets.cnc = function (g, ox, oy, opts) {
    opts = opts || {}; var zc = opts.zone === 'iso' ? '#8FA0B3' : '#2CC4D9', G = se('g', { filter: 'url(#sh)' }, undefined, g);
    var w = 300, d = 170, bh = 70, eh = 120;
    box(-8, -8, 0, w + 16, d + 16, 6, '#2E3741', '#171C22', '#10141A', G, EDGE, ox, oy);
    box(0, 0, 6, w, d, bh, '#3A444F', '#222A32', '#161C22', G, EDGE, ox, oy);                 // machine base
    box(12, 10, 6 + bh, w - 24, d - 20, eh, '#46515E', '#2A323C', '#1D232A', G, EDGE, ox, oy); // enclosure
    var zt = 6 + bh, y = d - 10, f = function (u, v) { return I(ox + 20 + u * (w - 70), oy + y, zt + 10 + v * (eh - 22)); };
    P([f(0, 0), f(1, 0), f(1, 1), f(0, 1)], '#0E131A', '#0B0D10', G, 1);                    // big front window
    P([f(0.03, 0.05), f(0.97, 0.05), f(0.97, 0.95), f(0.03, 0.95)], '#17202A', '#3A444F', G, 1);
    P([f(0.5, 0.05), f(0.5, 0.95), f(0.505, 0.95), f(0.505, 0.05)], '#3A444F', 'none', G);   // sliding door seam
    P([f(0.08, 0.86), f(0.3, 0.86), f(0.4, 0.45), f(0.18, 0.45)], '#FFFFFF', 'none', G).setAttribute('opacity', '.06');
    P([f(0.1, 0.3), f(0.9, 0.3), f(0.9, 0.2), f(0.1, 0.2)], '#5E6975', 'none', G);           // work table
    P([f(0.32, 0.4), f(0.52, 0.4), f(0.52, 0.3), f(0.32, 0.3)], '#C9D1DA', 'none', G);       // workpiece in a vise
    P([f(0.3, 0.45), f(0.54, 0.45), f(0.54, 0.4), f(0.3, 0.4)], '#8FA0B3', 'none', G);
    P([f(0.4, 0.95), f(0.5, 0.95), f(0.5, 0.62), f(0.4, 0.62)], '#46515E', 'none', G);       // spindle head
    P([f(0.425, 0.62), f(0.475, 0.62), f(0.46, 0.46), f(0.44, 0.46)], '#F5A800', 'none', G); // tool
    // zone rail along the top of the base
    P([I(ox, oy + d, zt), I(ox + w, oy + d, zt), I(ox + w, oy + d, zt - 3), I(ox, oy + d, zt - 3)], zc, 'none', G);
    // chip conveyor and coolant tank on the +x side
    box(w, 14, 14, 46, 26, 10, '#3A444F', '#222A32', '#161C22', G, EDGE, ox, oy);
    box(w + 30, 14, 14, 16, 26, 16, '#2E3741', '#1D232A', '#141A20', G, EDGE, ox, oy);
    box(w, 60, 6, 30, 50, 44, '#323B46', '#1D232A', '#141A20', G, EDGE, ox, oy);
    P([I(ox + w + 30, oy + 80, 46), I(ox + w + 30, oy + 110, 46), I(ox + w + 30, oy + 110, 38), I(ox + w + 30, oy + 80, 38)], zc, 'none', G);
    // tool-changer carousel (drum) on the roof, back left, and a signal lamp front right
    var dr = []; for (var k = 0; k < 20; k++) { var an = k / 20 * Math.PI * 2; dr.push([50 + Math.cos(an) * 26, 50 + Math.sin(an) * 26]); }
    extrudeXY(dr, zt + eh, zt + eh + 12, '#2A323C', '#46515E', G, EDGE, ox, oy);
    for (var tk = 0; tk < 8; tk++) { var ta = tk / 8 * Math.PI * 2; box(50 + Math.cos(ta) * 19 - 2, 50 + Math.sin(ta) * 19 - 2, zt + eh + 12, 4, 4, 6, '#8FA0B3', '#5E6975', '#3A444F', G, 'none', ox, oy); }
    box(w - 50, d - 50, zt + eh, 16, 16, 12, zc, opts.zone === 'iso' ? '#5E6975' : '#1F8FA0', opts.zone === 'iso' ? '#3A444F' : '#16707F', G, EDGE, ox, oy);
    // integrated operator console at the front-right corner: slim pedestal, wide monitor, keyboard shelf
    var cx = w + 8, cy = d - 38, ped = 90;
    box(cx + 32, cy + 10, 0, 18, 14, ped, '#323B46', '#1D232A', '#141A20', G, EDGE, ox, oy);
    box(cx - 6, cy + 4, ped - 6, 94, 34, 4, '#3A444F', '#222A32', '#161C22', G, EDGE, ox, oy);   // keyboard shelf
    for (var kc = 0; kc < 9; kc++) P([I(ox + cx + kc * 9 + 4, oy + cy + 18, ped - 2), I(ox + cx + kc * 9 + 10, oy + cy + 18, ped - 2), I(ox + cx + kc * 9 + 10, oy + cy + 26, ped - 2), I(ox + cx + kc * 9 + 4, oy + cy + 26, ped - 2)], '#46515E', 'none', G);
    var mw = 92, mh = 54, mz = ped + 14, my = cy + 8;
    box(cx - 6, my, mz, mw, 4.5, mh, '#3A444F', '#222A32', '#161C22', G, EDGE, ox, oy);
    var h = function (u, v) { return I(ox + cx - 3 + u * (mw - 6), oy + my + 4.5, mz + 3 + v * (mh - 6)); };
    P([h(0, 0), h(1, 0), h(1, 1), h(0, 1)], '#0E131A', '#0B0D10', G, 1);
    P([h(0.05, 0.88), h(0.5, 0.88), h(0.5, 0.95), h(0.05, 0.95)], zc, 'none', G);
    [0.62, 0.38, 0.14].forEach(function (v, i) { P([h(0.05, v + 0.17), h(0.95, v + 0.17), h(0.95, v), h(0.05, v)], '#1A2027', '#3A444F', G, 1); P([h(0.08, v + 0.12), h(0.13, v + 0.12), h(0.13, v + 0.05), h(0.08, v + 0.05)], i === 2 ? '#F5A800' : '#3DDC84', 'none', G); });
    P([I(ox + cx - 6, oy + my + 4.5, mz + 2), I(ox + cx - 6 + mw, oy + my + 4.5, mz + 2), I(ox + cx - 6 + mw, oy + my + 4.5, mz), I(ox + cx - 6, oy + my + 4.5, mz)], zc, 'none', G);
    return { top: I(ox + w - 42, oy + d - 42, zt + eh + 12), screen: I(ox + cx + mw / 2 - 6, oy + my + 2, mz + mh) };
  };

  /* Asset 9: DFX PASS handheld (about 32 x 16 units, a little larger than a Pro Max phone), lying screen-up, USB cable stub to the +/-x side */
  ISO.assets.pass = function (g, ox, oy, opts) {
    opts = opts || {}; var G = se('g', { filter: 'url(#sh)' }, undefined, g), z = 0;
    // USB cable and plug leaving the short edge toward -x
    var L = opts.cable || 34;
    extrudeXY([[-L, 6.2], [1, 6.2], [1, 9.8], [-L, 9.8]], 0, 1.8, '#10141A', '#2A323C', G, 'none', ox, oy);
    extrudeXY([[-L - 10, 5.2], [-L, 5.2], [-L, 10.8], [-L - 10, 10.8]], 0, 2.6, '#8B96A1', 'url(#steel)', G, '#5E6975', ox, oy);
    // body: rounded slab with a gold edge ring, then the glass screen
    extrudeXY(rr(0, 0, 32, 16, 2.6, 5), 0, 1.9, '#1B232C', '#2A323C', G, '#F5A800', ox, oy);
    var u = function (a, c) { return I(ox + 1.2 + a * 29.6, oy + 1.0 + c * 14, 1.95); };
    P(rr(1.2, 1.0, 30.8, 15, 1.6, 4).map(function (q) { return I(ox + q[0], oy + q[1], 1.95); }), '#0E131A', '#0B0D10', G, 0.6);
    // screen content: header, badge icon, PIN dots, status line
    var tk = I(ox + 2.0, oy + 4.1, 1.97), ks = ISO.cam.s;
    se('text', { transform: 'matrix(' + (0.866 * ks) + ' ' + (0.5 * ks) + ' ' + (-0.866 * ks) + ' ' + (0.5 * ks) + ' ' + tk[0] + ' ' + tk[1] + ')', x: 0, y: 0, style: 'font:800 3.6px Inter,sans-serif;fill:#F5A800;letter-spacing:.18px' }, 'DFX PASS', G);
    P([u(0.05, 0.28), u(0.95, 0.28), u(0.95, 0.5), u(0.05, 0.5)], '#1A2027', '#3A444F', G, 0.5);
    for (var k = 0; k < 4; k++) P([u(0.12 + k * 0.1, 0.35), u(0.17 + k * 0.1, 0.35), u(0.17 + k * 0.1, 0.43), u(0.12 + k * 0.1, 0.43)], '#E6EDF5', 'none', G);
    P([u(0.05, 0.6), u(0.95, 0.6), u(0.95, 0.75), u(0.05, 0.75)], '#1A2027', '#3A444F', G, 0.5);
    P([u(0.08, 0.64), u(0.14, 0.64), u(0.14, 0.71), u(0.08, 0.71)], '#3DDC84', 'none', G);
    P([u(0.05, 0.84), u(0.95, 0.84), u(0.95, 0.9), u(0.05, 0.9)], '#2A323C', 'none', G);
    return { screen: I(ox + 16, oy + 8, 2.15), plug: I(ox - 40, oy + 8, 2.6), top: I(ox + 16, oy + 8, 2.15) };
  };
})(window);
