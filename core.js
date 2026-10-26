/* Customize Bags: storage, cart, orders, header/footer, search, quick add. */
(function () {
  var CB = window.CB;
  var CFG = CB.CFG = {
    name: "Customize Bags", whatsapp: "919352746184", phone: "+91 93527 46184", insta: "https://www.instagram.com/", handle: "@customizebags", tagline: "Your style. Your personal touch.",
    ship: { free: 1999, charge: 79, eta: "5 to 8 working days" },
    coupons: { FIRST10: { pct: 10, label: "10% off your first order" } },
    reviews: [] /* add real reviews: {n:"Name",c:"City",t:"Text",s:5} */
  };
  var $ = CB.$ = function (s, r) { return (r || document).querySelector(s); }, $$ = CB.$$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = CB.esc, P = CB.P;
  var money = CB.money = function (n) { return "₹" + Math.round(n).toLocaleString("en-IN"); };
  var mem = {};
  var sget = CB.sget = function (k, d) { try { var v = localStorage.getItem("cb:" + k); return v ? JSON.parse(v) : (k in mem ? mem[k] : d); } catch (e) { return k in mem ? mem[k] : d; } };
  var sset = CB.sset = function (k, v) { mem[k] = v; try { localStorage.setItem("cb:" + k, JSON.stringify(v)); } catch (e) {} };
  /* owner overrides (admin) */
  var ov = sget("ov", {}); P.forEach(function (p) { var o = ov[p.id]; if (o) { if (o.price != null) p.price = o.price; if (o.old != null) p.old = o.old; if (o.stock != null) p.stock = o.stock; if (o.hide) p.hide = true; } });
  CB.visible = function () { return P.filter(function (p) { return !p.hide; }); };
  var cps = sget("coupons", {}); Object.keys(cps).forEach(function (k) { CFG.coupons[k] = cps[k]; });
  CB.img = function (p, n) { return "assets/p/" + p.slug + "-" + n + ".jpg"; };
  CB.off = function (p) { return p.old ? Math.round((1 - p.price / p.old) * 100) : 0; };
  var ic = CB.ic = {
    search: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    bag: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    user: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
    wa: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6c-.1.1-.3.3-.1.6.7 1.1 1.5 1.8 2.6 2.3.3.2.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.4.3.1.2.1.7-.1 1.3z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };
  var WAURL = CB.WAURL = function (m) { return "https://wa.me/" + CFG.whatsapp + (m ? "?text=" + encodeURIComponent(m) : ""); };

  /* cart */
  var cart = CB.cart = {
    get: function () { return sget("cart", []); }, set: function (v) { sset("cart", v); badge(); },
    add: function (it) { var c = cart.get(), key = JSON.stringify([it.id, it.color, it.text, it.style, it.tcolor, it.charm, it.wrap]), ex = c.filter(function (i) { return i.key === key; })[0]; if (ex) ex.qty = Math.min(30, ex.qty + it.qty); else { it.key = key; c.push(it); } cart.set(c); },
    unit: function (i) { var p = CB.byId[i.id], ch = CB.CHARMS.filter(function (x) { return x[0] === i.charm; })[0]; return p.price + (ch ? ch[2] : 0) + (i.wrap ? 99 : 0); },
    subtotal: function () { return cart.get().reduce(function (a, i) { return a + cart.unit(i) * i.qty; }, 0); },
    discount: function () { var k = sget("coupon", ""), cp = k && CFG.coupons[k]; return cp ? Math.round(cart.subtotal() * cp.pct / 100) : 0; },
    shipping: function () { var s = cart.subtotal() - cart.discount(); return !s || s >= CFG.ship.free ? 0 : CFG.ship.charge; },
    total: function () { return cart.subtotal() - cart.discount() + cart.shipping(); },
    count: function () { return cart.get().reduce(function (a, i) { return a + i.qty; }, 0); }
  };
  function badge() { var n = cart.count(); $$(".bagc").forEach(function (e) { e.textContent = n; e.classList.toggle("z", !n); }); }
  CB.toast = function (m) { var t = $("#toast"); if (!t) { t = document.createElement("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); } t.textContent = m; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove("on"); }, 2400); };
  CB.itemDesc = function (i) { var s = []; if (i.text) s.push('"' + i.text + '"'); s.push(i.color); if (i.text) s.push(i.style + " " + i.tcolor + " lettering"); if (i.charm !== "none") s.push(i.charm + " charm"); if (i.wrap) s.push("gift wrap"); return s.join(", "); };
  CB.itemArt = function (i) { var p = CB.byId[i.id]; return CB.art(p.type, i.color, i.text, i.style, i.tcolor, i.charm, { photo: true }); };
  /* orders */
  CB.orders = { all: function () { return sget("orders", []); }, save: function (a) { sset("orders", a); } };
  CB.orderId = function () { var o = sget("oid", null); if (!o) { var d = new Date(); o = "CB-" + String(d.getFullYear()).slice(2) + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2) + "-" + Math.floor(1000 + Math.random() * 9000); sset("oid", o); } return o; };
  CB.orderMsg = function (id, a, items, pay) {
    var d = cart.discount();
    return "Hello " + CFG.name + "! I'd like to place an order.\nOrder ID: " + id + "\n\n" + items.map(function (i, n) { return (n + 1) + ". " + CB.byId[i.id].name + " | " + CB.itemDesc(i) + " | Qty " + i.qty + " | " + money(cart.unit(i) * i.qty); }).join("\n") + "\n\nSubtotal: " + money(cart.subtotal()) + (d ? "\nCoupon " + sget("coupon", "") + ": - " + money(d) : "") + "\nShipping: " + (cart.shipping() ? money(cart.shipping()) : "Free") + "\nTotal: " + money(cart.total()) + "\nPayment: " + pay + "\n\nName: " + a.fn + "\nPhone: " + a.ph + "\nAddress: " + a.a1 + ", " + a.ct + ", " + a.st + " " + a.pin + (a.nt ? "\nNotes: " + a.nt : "") + "\n\nPlease confirm the design and share payment details.";
  };

  /* product card */
  CB.card = function (p) {
    var sold = p.stock <= 0;
    return '<article class="pc"><a class="pimg" href="product-' + p.slug + '.html"><img src="' + CB.img(p, 1) + '" alt="' + esc(p.name) + ', personalised" loading="lazy"><img class="h" src="' + CB.img(p, 2) + '" alt="" loading="lazy">' + (sold ? '<span class="ptag dk">Sold out</span>' : p.old ? '<span class="ptag sale">' + CB.off(p) + "% off</span>" : p.tag ? '<span class="ptag">' + p.tag + "</span>" : "") + '</a>' + (sold ? "" : '<button class="qa" data-qa="' + p.id + '">Quick add</button>') + '<div class="pinfo"><span class="pcat">' + esc(p.use.split(",")[0]) + '</span><h3><a href="product-' + p.slug + '.html">' + esc(p.name) + '</a></h3><div class="pp">' + (p.old ? '<s>' + money(p.old) + "</s> " : "") + "<b>" + money(p.price) + "</b></div></div></article>";
  };

  /* quick add modal */
  CB.quick = function (p) {
    var m = $("#qm"); if (m) m.remove();
    var s = { color: CB.defColor(p), text: "" };
    m = document.createElement("div"); m.id = "qm"; m.className = "modal"; m.innerHTML = '<div class="mbg"></div><div class="mbox" role="dialog" aria-label="Quick add"><button class="mx" aria-label="Close">×</button><div class="mth" id="mth"></div><div><h3>' + esc(p.name) + '</h3><p class="muted">' + money(p.price) + '. Add your name, then pick a colour.</p><div class="grp"><label for="qt">Name or text</label><input id="qt" maxlength="14" placeholder="e.g. Aisha" autocomplete="off"></div><div class="grp"><label>Colour</label><div class="sw" id="qs">' + CB.COLORS.map(function (c) { return '<button class="s" data-c="' + c[0] + '" style="background:' + c[2] + '" aria-label="' + c[1] + '"></button>'; }).join("") + '</div></div><button class="btn dark block" id="qadd">Add to bag</button><a class="link" href="product-' + p.slug + '.html">Full customisation options</a></div></div>';
    document.body.appendChild(m);
    function up() { $("#mth").innerHTML = CB.art(p.type, s.color, s.text, "script", "ivory", "none", { photo: true }); $$("#qs .s").forEach(function (b) { b.classList.toggle("on", b.dataset.c === s.color); }); }
    var close = function () { m.remove(); }; $(".mbg", m).onclick = $(".mx", m).onclick = close;
    $("#qt").oninput = function (e) { s.text = e.target.value; up(); }; $$("#qs .s").forEach(function (b) { b.onclick = function () { s.color = b.dataset.c; up(); }; });
    $("#qadd").onclick = function () { cart.add({ id: p.id, color: s.color, text: s.text, style: "script", tcolor: "ivory", charm: "none", wrap: false, qty: 1 }); close(); CB.toast(p.name + " added to bag"); };
    up(); $("#qt").focus();
  };

  /* search overlay */
  function searchHTML(q) {
    q = q.trim().toLowerCase(); var vis = CB.visible();
    var r = q ? vis.filter(function (p) { return q.split(/\s+/).every(function (w) { return (p.name + " " + p.use + " " + p.type + " " + p.cat).toLowerCase().indexOf(w) > -1; }); }) : vis.filter(function (p) { return p.tag === "Bestseller"; });
    return (q ? "" : '<div class="sgh">Popular right now</div>') + (r.length ? r.slice(0, 6).map(function (p) { return '<a class="sg" href="product-' + p.slug + '.html"><img src="' + CB.img(p, 1) + '" alt=""><span><b>' + esc(p.name) + "</b><small>" + money(p.price) + "</small></span></a>"; }).join("") + (q ? '<a class="sgall" href="shop.html" data-q="' + esc(q) + '">See all results for “' + esc(q) + "”</a>" : "") : '<div class="sgn">No match for “' + esc(q) + '”. Try tote, pouch or wedding.</div>');
  }

  CB.layout = function (active) {
    var h = $("#site-header"), f = $("#site-footer");
    var logo = '<a class="logo" href="index.html" aria-label="Customize Bags, home"><span>Customize</span><b>Bags</b></a>';
    var nav = [["shop.html", "Shop all"], ["shop.html#totes", "Totes"], ["shop.html#sling", "Sling & Bucket"], ["shop.html#pouches", "Pouches"], ["shop.html#festive", "Wedding & Festive"], ["customize.html", "Design yours"], ["about.html", "Our story"]];
    h.className = "site-header";
    var msgs = ["Free shipping above " + money(CFG.ship.free), "Use code FIRST10 for 10% off your first order", "Made to order with your name"];
    h.innerHTML = '<div class="topbar"><div class="wrap"><span id="ann">' + msgs[0] + '</span></div></div><div class="hrow"><div class="wrap hwrap"><div class="hl"><button class="menu-btn" id="mb" aria-label="Menu" aria-expanded="false"><span></span></button><button class="ico" id="sb" aria-label="Search">' + ic.search + '</button></div>' + logo + '<div class="hr"><a class="ico hid" href="track.html" aria-label="Track order">' + ic.user + '</a><a class="ico bagb" href="bag.html" aria-label="Bag">' + ic.bag + '<span class="bagc z"></span></a></div></div><nav class="nav wrap" aria-label="Main">' + nav.map(function (n) { return '<a href="' + n[0] + '" class="' + (active === n[1] ? "on" : "") + '">' + n[1] + "</a>"; }).join("") + '</nav></div><div class="sov" id="sov" hidden><div class="wrap"><div class="sbar">' + ic.search + '<input id="hq" type="search" placeholder="Search totes, pouches, weddings" autocomplete="off" aria-label="Search"><button id="sx" aria-label="Close">×</button></div><div class="sres" id="sres"></div></div></div><div class="drawer" id="dr" hidden><div class="dbg" id="dbg"></div><div class="dp"><div class="dh">' + logo + '<button id="dx" aria-label="Close">×</button></div>' + nav.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + "</a>"; }).join("") + '<a href="track.html">Track order</a><a href="contact.html">Contact</a><a href="faq.html">FAQs</a></div></div>';
    var k = 0; setInterval(function () { k = (k + 1) % msgs.length; var a = $("#ann"); if (a) { a.style.opacity = 0; setTimeout(function () { a.textContent = msgs[k]; a.style.opacity = 1; }, 250); } }, 4000);
    var op = function (v) { $("#dr").hidden = !v; document.body.style.overflow = v ? "hidden" : ""; $("#mb").setAttribute("aria-expanded", v); };
    $("#mb").onclick = function () { op(true); }; $("#dx").onclick = $("#dbg").onclick = function () { op(false); };
    var so = function (v) { $("#sov").hidden = !v; if (v) { $("#sres").innerHTML = searchHTML(""); $("#hq").value = ""; $("#hq").focus(); } };
    $("#sb").onclick = function () { so($("#sov").hidden); }; $("#sx").onclick = function () { so(false); };
    var q = $("#hq"); q.addEventListener("input", function () { $("#sres").innerHTML = searchHTML(q.value); });
    q.addEventListener("keydown", function (e) { if (e.key === "Enter" && q.value.trim()) { sset("q", q.value.trim()); location.href = "shop.html"; } if (e.key === "Escape") so(false); });
    document.addEventListener("click", function (e) { var a = e.target.closest("[data-q]"); if (a) sset("q", a.dataset.q); var qa = e.target.closest("[data-qa]"); if (qa) { e.preventDefault(); CB.quick(CB.byId[+qa.dataset.qa]); } });
    f.className = "site-footer";
    f.innerHTML = '<div class="wrap fcols"><div class="fb"><div class="logo f"><span>Customize</span><b>Bags</b></div><p>' + CFG.tagline + " Bags made with love and creativity, personalised with your name.</p><p><a href=\"" + CFG.insta + '" target="_blank" rel="noopener">Instagram ' + CFG.handle + '</a><br><a href="' + CB.WAURL("") + '" target="_blank" rel="noopener">WhatsApp ' + CFG.phone + '</a></p></div><div><h4>Shop</h4><ul><li><a href="shop.html#totes">Totes</a></li><li><a href="shop.html#sling">Sling &amp; Bucket</a></li><li><a href="shop.html#pouches">Pouches</a></li><li><a href="shop.html#work">Work &amp; School</a></li><li><a href="shop.html#festive">Wedding &amp; Festive</a></li><li><a href="customize.html">Design yours</a></li></ul></div><div><h4>Help</h4><ul><li><a href="track.html">Track your order</a></li><li><a href="faq.html">FAQs</a></li><li><a href="shipping.html">Shipping policy</a></li><li><a href="returns.html">Returns &amp; refunds</a></li><li><a href="contact.html">Contact us</a></li></ul></div><div><h4>Company</h4><ul><li><a href="about.html">About us</a></li><li><a href="privacy.html">Privacy policy</a></li><li><a href="terms.html">Terms &amp; conditions</a></li><li><a href="admin.html">Owner login</a></li></ul></div></div><div class="legal"><div class="wrap"><span>© ' + new Date().getFullYear() + " " + CFG.name + ". All rights reserved.</span><span>UPI · Bank transfer · Pay on WhatsApp</span></div></div>";
    var a = document.createElement("a"); a.className = "fab"; a.target = "_blank"; a.rel = "noopener"; a.href = WAURL("Hi! I'd like to order a customised bag."); a.innerHTML = ic.wa + "<span>Chat with us</span>"; document.body.appendChild(a);
    badge();
  };
})();
