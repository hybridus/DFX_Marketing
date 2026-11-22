/* WORKED EXAMPLE / PROPOSAL, NOT part of iso-lib.js and NOT approved artwork.
   Shows how a new rack-appliance product (here: "DFX Secure Email Gateway", official name still to be confirmed by Burak) is made
   by COMPOSITION on platformD1: same plate, bays, LEDs, name plate, rail. Only the text and one lid glyph differ.
   To promote: confirm the name, copy this function into iso-lib.js after ISO.assets.gateway, add the manifest entry
   (see Common/docs/NEW_ASSET_PLAYBOOK.md), run lint + previews + --write-baseline.
   Load for a preview: node Common/tools/preview_assets.js --template Common/iso/templates/example-secure-email-gateway.js */
(function (W) {
  var ISO = W.ISO, I = ISO.I, P = ISO.P;
  ISO.assets.emailGateway = function (g, ox, oy, opts) {
    opts = opts || {};
    // 1. base appliance: glass-chamber lid (default lid), gold rail unless a zone colour is passed
    var r = ISO.assets.platformD1(g, ox, oy, { lines: opts.lines || ['DFX SECURE EMAIL', 'GATEWAY'], fs: opts.fs || 10, mods: 0, rail: opts.rail });
    // 2. signature glyph: a flat envelope on top of the lid chamber (chamber top = z1+12 with z1 = 6+48)
    var w = 196, d = 112, zt = 6 + 48 + 12 + 0.2, host = g.lastChild;           // draw into the asset's shadow group
    var x0 = w * 0.2 + 22, x1 = w * 0.8 - 22, y0 = d * 0.2 + 12, y1 = d * 0.8 - 12, ym = (y0 + y1) / 2, xm = (x0 + x1) / 2;
    function q(x, y) { return I(ox + x, oy + y, zt); }
    P([q(x0, y0), q(x1, y0), q(x1, y1), q(x0, y1)], '#0E131A', '#F5A800', host, 1.4);           // envelope body
    ISO.se('polyline', { points: ISO.pts([q(x0, y0), q(xm, ym + 4), q(x1, y0)]), fill: 'none', stroke: '#F5A800', 'stroke-width': 1.4, 'stroke-linejoin': 'round' }, undefined, host); // flap
    ISO.se('polyline', { points: ISO.pts([q(x0, y1), q(xm - 14, ym + 2)]), fill: 'none', stroke: '#46515E', 'stroke-width': 1 }, undefined, host);
    ISO.se('polyline', { points: ISO.pts([q(x1, y1), q(xm + 14, ym + 2)]), fill: 'none', stroke: '#46515E', 'stroke-width': 1 }, undefined, host);
    r.glyph = I(ox + xm, oy + ym, zt);
    return r;
  };
})(window);
