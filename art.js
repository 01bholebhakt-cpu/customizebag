(function () {
  var CB = window.CB = window.CB || {};
  var esc = CB.esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var COLORS = CB.COLORS = [["sand", "Sand", "#d8bf98"], ["sage", "Sage", "#9db493"], ["blush", "Blush", "#eab9b2"], ["terracotta", "Terracotta", "#c4694a"], ["navy", "Navy", "#2f4163"], ["ivory", "Ivory", "#f1e8d8"], ["lilac", "Lilac", "#b8a5d0"], ["mustard", "Mustard", "#d8a43a"], ["black", "Black", "#2b2b2e"]];
  var TCOL = CB.TCOL = [["ivory", "Ivory", "#fbf5e9"], ["gold", "Gold", "#c9a14a"], ["black", "Black", "#222"], ["navy", "Navy", "#2f4163"], ["rose", "Rose", "#b24a67"]];
  var STYLES = CB.STYLES = [["script", "Script", "'Pacifico',cursive"], ["serif", "Classic", "'Bodoni Moda',serif"], ["sans", "Modern", "'Manrope',sans-serif"]];
  var CHARMS = CB.CHARMS = [["none", "No charm", 0], ["heart", "Heart", 120], ["star", "Star", 120], ["initial", "Initial", 150]];
  var colorHex = CB.colorHex = function (k) { return COLORS.filter(function (c) { return c[0] === k; })[0][2]; };
  var P = CB.P = [
    ["Classic Tote", "tote", 1199, 1499, 14, "totes", "Bestseller", "A roomy everyday canvas tote with your name across the front. Reinforced handles, inner pocket and a magnetic closure.", "Work, college, shopping"],
    ["Mini Tote", "mini", 899, 0, 22, "totes", "New", "A compact tote for the essentials. Light, structured and easy to carry.", "Brunch, errands"],
    ["Beach Tote", "tote", 1349, 1599, 9, "totes", "", "Extra deep and wide, made for the long weekend and everything in it.", "Travel, beach"],
    ["Bridesmaid Tote", "tote", 1249, 0, 30, "totes", "Bestseller", "A tote made for the bridal party, each with her own name.", "Weddings, bridesmaid"],
    ["Teacher Tote", "tote", 1099, 0, 18, "totes", "", "A thoughtful thank-you gift with her name on it.", "Teacher's day, gifting"],
    ["Sling Bag", "sling", 1099, 1399, 11, "sling", "Bestseller", "A cross-body sling with an adjustable strap and a secure zip.", "Travel, daily"],
    ["Gym Sling", "sling", 999, 0, 16, "sling", "New", "A lightweight sling for the gym, the studio and everything after.", "Fitness, daily"],
    ["Bucket Bag", "bucket", 1299, 0, 8, "sling", "New", "A soft bucket bag with a drawstring top and a leather-look base.", "Outings, gifting"],
    ["Zip Pouch", "pouch", 499, 0, 40, "pouches", "Bestseller", "A neat zip pouch for makeup, pens or cables.", "Return gifts, hampers"],
    ["Makeup Pouch", "pouch", 649, 799, 26, "pouches", "", "A wider pouch that stands up on the shelf.", "Bridesmaids, travel"],
    ["Jewellery Roll", "roll", 799, 0, 15, "pouches", "", "A roll-up organiser for rings, chains and earrings.", "Gifts, travel"],
    ["Laptop Sleeve", "laptop", 1099, 0, 12, "work", "", "A padded sleeve for 13 to 15 inch laptops.", "Office, college"],
    ["Backpack", "backpack", 1799, 2199, 7, "work", "New", "A zip backpack with a front pocket and your name.", "School, travel"],
    ["Kids Backpack", "backpack", 1399, 0, 13, "work", "", "A smaller backpack, just the right size for little shoulders.", "School, birthdays"],
    ["Potli Bag", "potli", 799, 0, 20, "festive", "Bestseller", "A drawstring potli for weddings and festive days.", "Weddings, festive"],
    ["Wedding Potli", "potli", 999, 1199, 10, "festive", "New", "A richer potli with a gold-tone finish, made for the big day.", "Weddings, return gifts"]
  ].map(function (a, i) { return { id: i + 1, slug: a[0].toLowerCase().replace(/ /g, "-"), name: a[0], type: a[1], price: a[2], old: a[3], stock: a[4], cat: a[5], tag: a[6], desc: a[7], use: a[8] }; });
  var byId = CB.byId = {}; P.forEach(function (p) { byId[p.id] = p; });
  CB.CATS = [["totes", "Totes"], ["sling", "Sling & Bucket"], ["pouches", "Pouches"], ["work", "Work & School"], ["festive", "Festive & Wedding"]];

  /* ---------- bag art (SVG, live) ---------- */
  function shade(h, a) { var n = parseInt(h.slice(1), 16), r = n >> 16, g = n >> 8 & 255, b = n & 255, f = function (x) { return Math.max(0, Math.min(255, Math.round(x + a * (a < 0 ? x : 255 - x)))); }; return "#" + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1); }
  var uid = 0;
  CB.art = function (type, color, text, style, tcolor, charm, fx) {
    fx = fx || {};
    var c = colorHex(color || "sand"), d = shade(c, -.18), l = shade(c, .22), id = "g" + (++uid);
    var tc = (TCOL.filter(function (x) { return x[0] === (tcolor || "ivory"); })[0] || TCOL[0])[2];
    var fam = (STYLES.filter(function (x) { return x[0] === (style || "script"); })[0] || STYLES[0])[2];
    var t = (text || "").slice(0, 14), body = "", cx = 200, cy = 250, size;
    var defs = '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + l + '"/><stop offset=".55" stop-color="' + c + '"/><stop offset="1" stop-color="' + d + '"/></linearGradient><filter id="s' + id + '" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#000" flood-opacity=".18"/></filter></defs>';
    var F = "url(#" + id + ")", stitch = ' stroke="' + d + '" stroke-dasharray="5 5" fill="none" stroke-width="1.6" opacity=".7"';
    var strap = function (p) { return '<path d="' + p + '" fill="none" stroke="' + d + '" stroke-width="13" stroke-linecap="round"/><path d="' + p + '" fill="none" stroke="' + c + '" stroke-width="8" stroke-linecap="round"/>'; };
    if (type === "tote" || type === "mini") { var w = type === "tote" ? 270 : 220, h = type === "tote" ? 270 : 210, x = 200 - w / 2, y = 400 - h - 40; cy = y + h * .55; body = strap("M" + (x + w * .26) + " " + (y + 6) + "C" + (x + w * .26) + " " + (y - 110) + "," + (x + w * .74) + " " + (y - 110) + "," + (x + w * .74) + " " + (y + 6)) + '<path d="M' + x + " " + y + "H" + (x + w) + "L" + (x + w - 12) + " " + (y + h) + "H" + (x + 12) + 'Z" fill="' + F + '"/><path d="M' + (x + 10) + " " + (y + 14) + "H" + (x + w - 10) + '"' + stitch + "/>"; }
    else if (type === "sling") { body = strap("M120 150C60 120 60 40 200 30C340 40 340 120 280 150") + '<path d="M95 150H305Q325 150 322 175L305 335Q302 360 280 360H120Q98 360 95 335L78 175Q75 150 95 150Z" fill="' + F + '"/><path d="M95 205H305" fill="none" stroke="' + d + '" stroke-width="2" opacity=".6"/><rect x="186" y="195" width="28" height="20" rx="5" fill="' + d + '"/>'; cy = 285; }
    else if (type === "bucket") { body = '<path d="M130 120Q200 70 270 120" fill="none" stroke="' + d + '" stroke-width="10" stroke-linecap="round"/><path d="M110 130Q200 160 290 130L318 345Q200 380 82 345Z" fill="' + F + '"/><path d="M110 130Q200 160 290 130" fill="none" stroke="' + d + '" stroke-width="3"/><path d="M125 152Q200 175 275 152" ' + stitch + '/><path d="M170 150V200M230 150V200" stroke="' + d + '" stroke-width="3"/>'; cy = 280; }
    else if (type === "pouch") { body = '<path d="M70 170Q70 150 90 150H310Q330 150 330 170L322 320Q321 345 300 345H100Q79 345 78 320Z" fill="' + F + '"/><path d="M76 190H324" stroke="' + d + '" stroke-width="3"/><rect x="70" y="150" width="260" height="36" rx="14" fill="' + shade(c, -.08) + '"/><path d="M300 168h30" stroke="' + d + '" stroke-width="5" stroke-linecap="round"/><circle cx="332" cy="168" r="7" fill="' + tc + '"/>'; cy = 268; }
    else if (type === "laptop") { body = '<path d="M60 120Q60 100 80 100H320Q340 100 340 120V320Q340 345 315 345H85Q60 345 60 320Z" fill="' + F + '"/><path d="M60 150H340" stroke="' + d + '" stroke-width="3"/><path d="M80 130H300" ' + stitch + '/><rect x="290" y="132" width="34" height="8" rx="4" fill="' + d + '"/>'; cy = 245; }
    else if (type === "potli") { body = '<path d="M130 120Q200 90 270 120" fill="none" stroke="' + d + '" stroke-width="8" stroke-linecap="round"/><path d="M135 140Q200 160 265 140Q350 230 320 320Q290 365 200 365Q110 365 80 320Q50 230 135 140Z" fill="' + F + '"/><path d="M135 140Q200 165 265 140" fill="none" stroke="' + d + '" stroke-width="4"/><circle cx="130" cy="118" r="9" fill="' + tc + '"/><circle cx="270" cy="118" r="9" fill="' + tc + '"/>'; cy = 275; }
    else if (type === "backpack") { body = strap("M150 100C150 30 250 30 250 100") + '<path d="M95 110Q95 90 120 90H280Q305 90 305 110V335Q305 365 275 365H125Q95 365 95 335Z" fill="' + F + '"/><path d="M118 112H282" ' + stitch + '/><rect x="125" y="250" width="150" height="85" rx="14" fill="' + shade(c, -.08) + '" stroke="' + d + '" stroke-width="2"/><path d="M125 275H275" stroke="' + d + '" stroke-width="3"/>'; cy = 185; }
    else { body = '<path d="M60 130Q60 112 80 112H320Q340 112 340 130V330Q340 350 320 350H80Q60 350 60 330Z" fill="' + F + '"/><path d="M60 175H340" stroke="' + d + '" stroke-width="3"/><path d="M200 112V185" stroke="' + d + '" stroke-width="3"/><circle cx="200" cy="190" r="9" fill="' + tc + '"/>'; cy = 270; }
    size = t.length > 10 ? 30 : t.length > 7 ? 38 : 48; if (type === "pouch" || type === "mini") size = Math.round(size * .78);
    var txt = t ? '<text x="200" y="' + cy + '" text-anchor="middle" dominant-baseline="middle" font-family="' + fam + '" font-size="' + size + '" fill="' + tc + '" style="paint-order:stroke" stroke="' + shade(c, -.1) + '" stroke-width=".6">' + esc(t) + "</text>" : "";
    var ch = "";
    if (charm && charm !== "none") { var cxp = type === "pouch" ? 332 : 305, cyp = type === "pouch" ? 195 : 330, cc = tc === "#fbf5e9" ? "#c9a14a" : tc; ch = '<path d="M' + cxp + " " + (cyp - 40) + "V" + (cyp - 12) + '" stroke="#999" stroke-width="2"/>' + (charm === "heart" ? '<path d="M' + cxp + " " + (cyp + 14) + "C" + (cxp - 26) + " " + (cyp - 6) + "," + (cxp - 12) + " " + (cyp - 22) + "," + cxp + " " + (cyp - 8) + "C" + (cxp + 12) + " " + (cyp - 22) + "," + (cxp + 26) + " " + (cyp - 6) + "," + cxp + " " + (cyp + 14) + 'Z" fill="' + cc + '"/>' : charm === "star" ? '<path d="M' + cxp + " " + (cyp - 14) + "l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z\" fill=\"" + cc + '" transform="translate(0 4) scale(1.1)"/>' : '<circle cx="' + cxp + '" cy="' + cyp + '" r="16" fill="' + cc + '"/><text x="' + cxp + '" y="' + (cyp + 1) + '" text-anchor="middle" dominant-baseline="middle" font-size="16" font-family="Georgia,serif" fill="#fff">' + esc((t[0] || "A").toUpperCase()) + "</text>"); }
    var tex = '<filter id="x' + id + '" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="' + (fx.f || "1.3 1.1") + '" numOctaves="3" seed="7" result="n"/><feDiffuseLighting in="n" lighting-color="#fff" surfaceScale="' + (fx.s || .8) + '" diffuseConstant="1.1" result="l"><feDistantLight azimuth="225" elevation="58"/></feDiffuseLighting><feComposite in="SourceGraphic" in2="l" operator="arithmetic" k1="1.32" k2="0" k3="0" k4="0" result="t"/><feComposite in="t" in2="SourceAlpha" operator="in"/></filter>';
    var inner = '<g filter="url(#s' + id + ')">' + body + "</g>" + txt;
    if (fx.photo) inner = '<g filter="url(#x' + id + ')"><g filter="url(#s' + id + ')">' + body + "</g>" + txt + "</g>";
    return '<svg viewBox="' + (fx.vb || "0 0 400 400") + '" role="img" aria-label="' + esc(type) + ' bag preview">' + defs.replace("</defs>", tex + "</defs>") + (fx.noshadow ? "" : '<ellipse cx="200" cy="385" rx="130" ry="9" fill="#000" opacity=".08"/>') + inner + ch + "</svg>";
  };
  var defaultColor = function (p) { return COLORS[(p.id * 2) % COLORS.length][0]; }, defaultText = function (p) { return ["Aisha", "Riya", "Mom", "Sana", "Priya", "Meera", "Neha", "Diya"][p.id % 8]; };
  CB.defColor = defaultColor; CB.defText = defaultText;
  CB.pArt = function (p) { return CB.art(p.type, defaultColor(p), defaultText(p), p.id % 3 ? "script" : "serif", p.id % 4 === 0 ? "gold" : "ivory", "none"); };

  CB.pArt = function (p) { return CB.art(p.type, CB.defColor(p), CB.defText(p), p.id % 3 ? "script" : "serif", p.id % 4 === 0 ? "gold" : "ivory", "none"); };
})();
