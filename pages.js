(function () {
  var CB = window.CB, $ = CB.$, $$ = CB.$$, esc = CB.esc, money = CB.money, cart = CB.cart, sget = CB.sget, sset = CB.sset, CFG = CB.CFG, toast = CB.toast, art = CB.art, ic = CB.ic;
  var root = function () { return document.getElementById("app"); };
  var pages = CB.pages = {};
  var catName = function (k) { return (CB.CATS.filter(function (c) { return c[0] === k; })[0] || [0, "All bags"])[1]; };
  var rail = function (list) { return '<div class="pgrid">' + list.map(CB.card).join("") + "</div>"; };
  var head = function (eb, h, link) { return '<div class="sec-head"><div><span class="eyebrow">' + eb + "</span><h2>" + h + "</h2></div>" + (link ? '<a class="link" href="' + link[0] + '">' + link[1] + "</a>" : "") + "</div>"; };

  /* ============ HOME ============ */
  pages.home = function () {
    var V = CB.visible(), best = V.filter(function (p) { return p.tag === "Bestseller"; }).slice(0, 4), news = V.filter(function (p) { return p.tag === "New"; }).slice(0, 4);
    var slides = [["hero1.jpg", "Personalised bags", "Your name,<br><em>beautifully</em> carried", "Totes, slings and pouches made to order and lettered with your name.", ["Shop now", "shop.html"], ["Design yours", "customize.html"], "l"], ["hero2.jpg", "Weddings & bridal parties", "Bridesmaid gifts she will <em>actually use</em>", "Matching totes and potlis, each with her own name.", ["Shop weddings", "shop.html#festive"], ["Bulk orders", "contact.html"], "d"], ["hero3.jpg", "Work, school & travel", "Everyday bags with a <em>personal</em> touch", "Backpacks, laptop sleeves and slings made for your routine.", ["Shop work & school", "shop.html#work"], ["See all bags", "shop.html"], "l"]];
    var hero = '<section class="hs" id="hs">' + slides.map(function (s, i) { return '<div class="hs-slide' + (i ? "" : " on") + " " + (s[6] === "d" ? "dk" : "") + '"><img src="assets/' + s[0] + '" alt="" ' + (i ? 'loading="lazy"' : "") + '><div class="wrap hs-in"><div class="hs-tx"><span class="eyebrow">' + s[1] + "</span><h1>" + s[2] + "</h1><p>" + s[3] + '</p><div class="cta"><a class="btn dark" href="' + s[4][1] + '">' + s[4][0] + '</a><a class="btn line" href="' + s[5][1] + '">' + s[5][0] + "</a></div></div></div></div>"; }).join("") + '<div class="hs-ctl"><button class="hs-a" id="hp" aria-label="Previous">‹</button><div class="hs-dots">' + slides.map(function (s, i) { return '<button aria-label="Slide ' + (i + 1) + '"><i></i></button>'; }).join("") + '</div><button class="hs-a" id="hn" aria-label="Next">›</button></div></section>';
    var cats = '<section class="sec"><div class="wrap">' + head("Browse", "Shop by category", ["shop.html", "View all"]) + '<div class="cats">' + [["totes", "Totes"], ["sling", "Sling & Bucket"], ["pouches", "Pouches"], ["work", "Work & School"], ["festive", "Wedding & Festive"], ["gifting", "Gifting"]].map(function (c) { return '<a class="cat" href="shop.html#' + c[0] + '"><img src="assets/cat-' + c[0] + '.jpg" alt="" loading="lazy"><span><b>' + c[1] + "</b><i>Shop now " + ic.arrow + "</i></span></a>"; }).join("") + "</div></div></section>";
    var bestS = '<section class="sec alt"><div class="wrap">' + head("Most loved", "Bestsellers", ["shop.html", "View all"]) + rail(best) + "</div></section>";
    var newS = '<section class="sec"><div class="wrap">' + head("Just in", "New arrivals", ["shop.html", "View all"]) + rail(news) + "</div></section>";
    var promo = '<section class="promo"><img src="assets/promo.jpg" alt="" loading="lazy"><div class="wrap"><div class="ptx"><span class="eyebrow">Welcome offer</span><h2>10% off your <em>first order</em></h2><p>Use code <b>FIRST10</b> at checkout. Free shipping above ' + money(CFG.ship.free) + '.</p><a class="btn dark" href="shop.html">Shop now</a></div></div></section>';
    var feat = '<section class="sec"><div class="wrap">' + head("Curated for you", "Featured collections") + '<div class="feats">' + [["The Bridal Party", "Matching totes and potlis, each with her own name.", "bridesmaid-tote-2", "shop.html#festive"], ["Thank-you gifts", "Teacher totes and pouches that say it properly.", "teacher-tote-1", "shop.html#gifting"], ["Weekend away", "Slings and beach totes for the long weekend.", "beach-tote-1", "shop.html#sling"]].map(function (c, i) { return '<a class="feat' + (i === 0 ? " big" : "") + '" href="' + c[3] + '"><img src="assets/p/' + c[2] + '.jpg" alt="" loading="lazy"><span><h3>' + c[0] + "</h3><p>" + c[1] + "</p><i>Explore " + ic.arrow + "</i></span></a>"; }).join("") + "</div></div></section>";
    var story = '<section class="story"><div class="wrap sgrid"><img src="assets/story.jpg" alt="" loading="lazy"><div><span class="eyebrow">Our story</span><h2>A bag should feel like <em>yours</em></h2><p>Customize Bags began with a simple thought: the things we carry every day should carry a little of us. So every bag is made to order, lettered with your name and finished with a personal touch.</p><p>Made with love and creativity, one bag at a time.</p><a class="btn dark" href="about.html">Read our story</a></div></div></section>';
    var steps = [["01", "Choose a bag", "Totes, slings, pouches, backpacks and potlis."], ["02", "Make it yours", "Pick a colour, add your name, lettering and a charm."], ["03", "Order on WhatsApp", "Your design reaches us as a ready message."], ["04", "Made with love", "We confirm, make it to order and deliver."]];
    var why = '<section class="sec alt"><div class="wrap">' + head("Why Customize Bags", "Made personal, made well") + '<div class="why">' + [["Truly personal", "Your name, your colour, your charm on every bag."], ["Made to order", "Every bag is made after you confirm your design."], ["Easy ordering", "Design live, then send it to us on WhatsApp."], ["Gift ready", "Add gift wrap for a finished, ready-to-give look."]].map(function (w, i) { return "<div><i>0" + (i + 1) + "</i><h3>" + w[0] + "</h3><p>" + w[1] + "</p></div>"; }).join("") + "</div></div></section>";
    var how = '<section class="sec"><div class="wrap">' + head("Simple as that", "How it works") + '<div class="steps4">' + steps.map(function (s) { return '<div class="st"><i>' + s[0] + "</i><h3>" + s[1] + "</h3><p>" + s[2] + "</p></div>"; }).join("") + "</div></div></section>";
    var rv = CFG.reviews.slice(0, 3);
    var rev = '<section class="sec alt"><div class="wrap">' + head("Kind words", "Customer reviews") + (rv.length ? '<div class="revs">' + rv.map(function (r) { return '<figure class="rev"><div class="stars">' + "★★★★★".slice(0, r.s || 5) + "</div><blockquote>" + esc(r.t) + "</blockquote><figcaption>" + esc(r.n) + (r.c ? ", " + esc(r.c) : "") + "</figcaption></figure>"; }).join("") + "</div>" : '<div class="rev-empty"><p>Ordered a bag from us? We would love to hear what you think. Message us your review and photo on WhatsApp, or tag ' + CFG.handle + " on Instagram.</p><a class=\"btn line\" target=\"_blank\" rel=\"noopener\" href=\"" + CB.WAURL("Hi! I'd like to share a review.") + '">Share your review</a></div>') + "</div></section>";
    var ig = '<section class="sec"><div class="wrap">' + head("Follow along", CFG.handle, [CFG.insta, "Follow on Instagram"]) + '<div class="igg">' + [1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return '<a href="' + CFG.insta + '" target="_blank" rel="noopener" aria-label="Instagram post"><img src="assets/ig-' + i + '.jpg" alt="" loading="lazy"></a>'; }).join("") + "</div></div></section>";
    var wa = '<section class="wsec"><div class="wrap"><div><span class="eyebrow">Have a custom idea?</span><h2>Tell us what you have in mind</h2><p>Bulk orders, wedding favours or a special design. Message us on WhatsApp.</p></div><a class="btn gold" target="_blank" rel="noopener" href="' + CB.WAURL("Hi! I have a custom bag idea.") + '">' + ic.wa + " Chat on WhatsApp</a></div></section>";
    root().innerHTML = hero + cats + bestS + newS + promo + feat + story + why + how + rev + ig + wa;
    var el = $("#hs"), sl = $$(".hs-slide", el), dots = $$(".hs-dots button", el), idx = 0, t, paused = false, DUR = 6500;
    el.style.setProperty("--dur", DUR + "ms");
    function show(i) { idx = (i + sl.length) % sl.length; sl.forEach(function (s, k) { s.classList.toggle("on", k === idx); }); dots.forEach(function (d, k) { d.classList.remove("on"); void d.offsetWidth; d.classList.toggle("on", k === idx); }); el.classList.toggle("dk", sl[idx].classList.contains("dk")); }
    function start() { clearInterval(t); if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return; t = setInterval(function () { if (!paused && !document.hidden) show(idx + 1); }, DUR); }
    $("#hp").onclick = function () { show(idx - 1); start(); }; $("#hn").onclick = function () { show(idx + 1); start(); };
    dots.forEach(function (d, k) { d.onclick = function () { show(k); start(); }; });
    el.addEventListener("mouseenter", function () { paused = true; el.classList.add("paused"); }); el.addEventListener("mouseleave", function () { paused = false; el.classList.remove("paused"); });
    var sx = 0; el.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true }); el.addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) { show(idx + (dx < 0 ? 1 : -1)); start(); } }, { passive: true });
    show(0); start();
  };

  /* ============ SHOP ============ */
  pages.shop = function () {
    var st = { cat: "all", q: sget("q", ""), sort: "feat", price: "", sale: false, stock: false }, PAGE = 9, shown = PAGE;
    var PR = { a: [0, 999, "Under ₹1,000"], b: [1000, 1499, "₹1,000 to ₹1,499"], c: [1500, 99999, "₹1,500 and above"] };
    function fromHash() { var h = (location.hash || "#all").slice(1); st.cat = h === "gifting" || h === "all" || CB.CATS.some(function (c) { return c[0] === h; }) ? h : "all"; }
    function list() {
      var q = st.q.trim().toLowerCase(), r = CB.visible().filter(function (p) {
        if (st.cat === "gifting" ? !/gift|wedding|teacher|return|bridesmaid/i.test(p.use + p.name) : st.cat !== "all" && p.cat !== st.cat) return false;
        if (st.price && (p.price < PR[st.price][0] || p.price > PR[st.price][1])) return false; if (st.sale && !p.old) return false; if (st.stock && p.stock <= 0) return false;
        return !q || q.split(/\s+/).every(function (w) { return (p.name + " " + p.use + " " + p.type + " " + p.desc + " " + p.tag).toLowerCase().indexOf(w) > -1; });
      });
      var by = { low: function (a, b) { return a.price - b.price; }, high: function (a, b) { return b.price - a.price; }, pop: function (a, b) { return (b.tag === "Bestseller") - (a.tag === "Bestseller") || a.id - b.id; }, new: function (a, b) { return (b.tag === "New") - (a.tag === "New") || b.id - a.id; } }[st.sort]; if (by) r.sort(by); return r;
    }
    function draw() {
      var r = list();
      $("#shop-title").textContent = st.cat === "gifting" ? "Gifting" : catName(st.cat);
      $("#fcats").innerHTML = [["all", "All bags"]].concat(CB.CATS, [["gifting", "Gifting"]]).map(function (c) { return '<a href="#' + c[0] + '" class="' + (st.cat === c[0] ? "on" : "") + '">' + c[1] + "</a>"; }).join("");
      $("#fprice").innerHTML = Object.keys(PR).map(function (k) { return '<button class="chip ' + (st.price === k ? "on" : "") + '" data-p="' + k + '">' + PR[k][2] + "</button>"; }).join("");
      $("#fsale").checked = st.sale; $("#fstock").checked = st.stock;
      $("#count").textContent = r.length + (r.length === 1 ? " bag" : " bags");
      $("#grid").innerHTML = r.length ? r.slice(0, shown).map(CB.card).join("") : '<div class="empty" style="grid-column:1/-1"><h2>Nothing found</h2><p>Try “tote”, “pouch” or “wedding”, or clear your filters.</p><button class="btn line" id="clr">Clear filters</button></div>';
      $("#more").hidden = r.length <= shown; $("#more").textContent = "Load more (" + (r.length - shown) + " left)";
      $$("#fprice [data-p]").forEach(function (b) { b.onclick = function () { st.price = st.price === b.dataset.p ? "" : b.dataset.p; shown = PAGE; draw(); }; });
      var c = $("#clr"); if (c) c.onclick = function () { st.price = ""; st.sale = false; st.stock = false; st.q = ""; sset("q", ""); $("#q").value = ""; shown = PAGE; draw(); };
    }
    fromHash(); $("#q").value = st.q; draw();
    $("#q").addEventListener("input", function (e) { st.q = e.target.value; sset("q", st.q); shown = PAGE; draw(); });
    $("#sort").addEventListener("change", function (e) { st.sort = e.target.value; shown = PAGE; draw(); });
    $("#fsale").onchange = function (e) { st.sale = e.target.checked; shown = PAGE; draw(); }; $("#fstock").onchange = function (e) { st.stock = e.target.checked; shown = PAGE; draw(); };
    $("#more").onclick = function () { shown += PAGE; draw(); };
    $("#ft").onclick = function () { $("#filters").classList.toggle("open"); };
    window.addEventListener("hashchange", function () { fromHash(); shown = PAGE; draw(); });
  };

  /* ============ DESIGNER (shared) ============ */
  function designer(host, p, opts) {
    opts = opts || {};
    var s = { id: p.id, color: CB.defColor(p), text: "", style: "script", tcolor: "ivory", charm: "none", wrap: false, qty: 1 };
    host.innerHTML = '<div class="grp"><label for="dzt">Your name or text <small id="dzc">0/14</small></label><input id="dzt" maxlength="14" placeholder="e.g. Aisha" autocomplete="off"></div><div class="grp"><label>Bag colour: <b id="cn"></b></label><div class="sw" id="swc">' + CB.COLORS.map(function (c) { return '<button class="s" data-c="' + c[0] + '" style="background:' + c[2] + '" aria-label="' + c[1] + '"></button>'; }).join("") + '</div></div><div class="grp"><label>Lettering</label><div class="chips" id="sty">' + CB.STYLES.map(function (c) { return '<button class="chip" data-s="' + c[0] + '" style="font-family:' + c[2] + '">' + c[1] + "</button>"; }).join("") + '</div></div><div class="grp"><label>Text colour</label><div class="sw sm" id="swt">' + CB.TCOL.map(function (c) { return '<button class="s" data-t="' + c[0] + '" style="background:' + c[2] + '" aria-label="' + c[1] + '"></button>'; }).join("") + '</div></div><div class="grp"><label>Charm</label><div class="chips" id="chm">' + CB.CHARMS.map(function (c) { return '<button class="chip" data-h="' + c[0] + '">' + c[1] + (c[2] ? " +₹" + c[2] : "") + "</button>"; }).join("") + '</div></div><label class="chk"><input type="checkbox" id="wrap"><span>Add gift wrap (+₹99)</span></label>';
    function upd() {
      if (opts.onChange) opts.onChange(s); $("#dzc").textContent = s.text.length + "/14"; $("#cn").textContent = CB.COLORS.filter(function (c) { return c[0] === s.color; })[0][1];
      $$("#swc .s").forEach(function (b) { b.classList.toggle("on", b.dataset.c === s.color); }); $$("#swt .s").forEach(function (b) { b.classList.toggle("on", b.dataset.t === s.tcolor); });
      $$("#sty .chip").forEach(function (b) { b.classList.toggle("on", b.dataset.s === s.style); }); $$("#chm .chip").forEach(function (b) { b.classList.toggle("on", b.dataset.h === s.charm); });
    }
    $("#dzt").addEventListener("input", function (e) { s.text = e.target.value; upd(); });
    $$("#swc .s").forEach(function (b) { b.onclick = function () { s.color = b.dataset.c; upd(); }; }); $$("#swt .s").forEach(function (b) { b.onclick = function () { s.tcolor = b.dataset.t; upd(); }; });
    $$("#sty .chip").forEach(function (b) { b.onclick = function () { s.style = b.dataset.s; upd(); }; }); $$("#chm .chip").forEach(function (b) { b.onclick = function () { s.charm = b.dataset.h; upd(); }; });
    $("#wrap").onchange = function (e) { s.wrap = e.target.checked; upd(); };
    upd(); return s;
  }
  function buyBox(host, p, s, getArt) {
    host.innerHTML = '<div class="buy"><div class="qty"><button id="qm" aria-label="Fewer">−</button><span id="qv">1</span><button id="qp" aria-label="More">+</button></div><div class="tot"><span class="muted">Total</span><b id="tot"></b></div></div><div class="btns"><button class="btn dark" id="dadd">Add to bag</button><button class="btn gold" id="dbuy">Buy now</button></div><a class="btn wa block" id="dwa" target="_blank" rel="noopener">' + ic.wa + " Order this on WhatsApp</a>";
    function upd() { var u = cart.unit(s); $("#tot").textContent = money(u * s.qty); $("#qv").textContent = s.qty; $("#dwa").href = CB.WAURL("Hi! I'd like to order a customised bag.\n\nBag: " + p.name + "\nColour: " + s.color + "\nName: " + (s.text || "(none)") + "\nLettering: " + s.style + ", " + s.tcolor + "\nCharm: " + s.charm + "\nGift wrap: " + (s.wrap ? "Yes" : "No") + "\nQty: " + s.qty + "\nTotal: " + money(u * s.qty)); }
    $("#qm").onclick = function () { s.qty = Math.max(1, s.qty - 1); upd(); }; $("#qp").onclick = function () { s.qty = Math.min(Math.min(30, p.stock || 30), s.qty + 1); upd(); };
    $("#dadd").onclick = function () { cart.add(JSON.parse(JSON.stringify(s))); toast(p.name + " added to bag"); };
    $("#dbuy").onclick = function () { cart.add(JSON.parse(JSON.stringify(s))); location.href = "checkout.html"; };
    upd(); return upd;
  }

  /* ============ PRODUCT ============ */
  pages.product = function (slug) {
    var p = CB.P.filter(function (x) { return x.slug === slug; })[0], rel = CB.visible().filter(function (x) { return x.id !== p.id && (x.cat === p.cat || x.tag); }).slice(0, 4);
    var imgs = [1, 2, 3, 4].map(function (n) { return CB.img(p, n); }), cur = 0, live = false;
    var stock = p.stock <= 0 ? '<span class="stk out">Sold out</span>' : p.stock <= 10 ? '<span class="stk low">Only ' + p.stock + " left</span>" : '<span class="stk">In stock</span>';
    root().innerHTML = '<div class="wrap"><div class="crumbs"><a href="index.html">Home</a> / <a href="shop.html#' + p.cat + '">' + catName(p.cat) + "</a> / " + esc(p.name) + '</div><div class="pdp"><div class="gal"><div class="thumbs" id="thumbs">' + imgs.map(function (s, i) { return '<button class="th' + (i ? "" : " on") + '" data-i="' + i + '" aria-label="Photo ' + (i + 1) + '"><img src="' + s + '" alt="" loading="lazy"></button>'; }).join("") + '<button class="th lv" id="lvb" aria-label="Live preview"><span>Live<br>preview</span></button></div><div class="main" id="mainimg"><img id="mi" src="' + imgs[0] + '" alt="' + esc(p.name) + '"><div id="lvv" hidden></div><span class="zoomh">Click to zoom</span></div></div><div class="info"><span class="eyebrow">' + esc(p.use) + "</span><h1>" + esc(p.name) + '</h1><div class="pline"><div class="price">' + (p.old ? "<s>" + money(p.old) + "</s> " : "") + "<b>" + money(p.price) + "</b>" + (p.old ? '<em class="save">Save ' + CB.off(p) + "%</em>" : "") + "</div>" + stock + "</div><p class=\"lead\">" + esc(p.desc) + ' Name included. Charm and gift wrap are optional.</p><div id="dz"></div><div id="bb"></div><div class="dinfo"><div class="pin"><label for="pin">Delivery to your city</label><div class="pinrow"><input id="pin" inputmode="numeric" maxlength="6" placeholder="6-digit PIN code"><button class="btn line" id="pinb">Check</button></div><small id="pinm"></small></div><ul class="trust"><li>Made to order with your name</li><li>Estimated delivery ' + CFG.ship.eta + "</li><li>Free shipping above " + money(CFG.ship.free) + '</li></ul></div><div class="acc"><details open><summary>Description</summary><div class="in"><p>' + esc(p.desc) + " Every bag is made to order, lettered with your chosen name and finished by hand.</p></div></details><details><summary>Specifications</summary><div class=\"in\"><ul><li>Style: " + esc(p.name) + "</li><li>Personalisation: name up to 14 characters, 3 lettering styles, 5 text colours</li><li>Colours: 9 to choose from</li><li>Optional: charm and gift wrap</li></ul></div></details><details><summary>Delivery &amp; returns</summary><div class=\"in\"><p>Estimated delivery " + CFG.ship.eta + ' after your design is confirmed. See our <a class="link" href="shipping.html">shipping policy</a> and <a class="link" href="returns.html">returns policy</a>.</p></div></details></div></div></div><section class="sec"><div class="revbox"><div><span class="eyebrow">Reviews</span><h2>Customer reviews</h2><p class="muted">No reviews for this bag yet. Be the first to share yours.</p></div><a class="btn line" target="_blank" rel="noopener" href="' + CB.WAURL("Hi! I'd like to review the " + p.name + ".") + '">Write a review</a></div></section><section class="sec" style="padding-top:0">' + head("You may also love", "Related products") + rail(rel) + '</section></div><div class="zoom" id="zoom" hidden><button class="mx" aria-label="Close">×</button><img alt=""></div>';
    function setImg(i) { cur = i; live = false; $("#mi").hidden = false; $("#lvv").hidden = true; $("#mi").src = imgs[i]; $$(".th").forEach(function (b) { b.classList.toggle("on", +b.dataset.i === i && b.id !== "lvb"); }); $("#lvb").classList.remove("on"); }
    function showLive() { live = true; $("#mi").hidden = true; $("#lvv").hidden = false; $$(".th").forEach(function (b) { b.classList.toggle("on", b.id === "lvb"); }); draw(); }
    var sObj, draw = function () { if (!live) return; $("#lvv").innerHTML = art(p.type, sObj.color, sObj.text, sObj.style, sObj.tcolor, sObj.charm, { photo: true }); };
    var upd; sObj = designer($("#dz"), p, { onChange: function (s) { if (!live && (s.text || s.color !== CB.defColor(p) || s.charm !== "none")) showLive(); draw(); if (upd) upd(); } });
    upd = buyBox($("#bb"), p, sObj);
    if (p.stock <= 0) { $("#dadd").disabled = true; $("#dbuy").disabled = true; $("#dadd").textContent = "Sold out"; }
    $$(".th[data-i]").forEach(function (b) { b.onclick = function () { setImg(+b.dataset.i); }; }); $("#lvb").onclick = showLive;
    $("#mi").onclick = function () { var z = $("#zoom"); $("img", z).src = imgs[cur]; z.hidden = false; }; $("#zoom").onclick = function () { $("#zoom").hidden = true; };
    $("#pinb").onclick = function () { var v = $("#pin").value.trim(), m = $("#pinm"); if (!/^\d{6}$/.test(v)) { m.className = "bad"; m.textContent = "Please enter a valid 6-digit PIN code."; } else { m.className = "okm"; m.textContent = "We deliver to " + v + ". Estimated " + CFG.ship.eta + "."; } };
  };

  /* ============ CUSTOMIZE ============ */
  pages.customize = function () {
    root().innerHTML = '<div class="wrap"><div class="page-head2"><span class="eyebrow">The designer</span><h1>Design your bag</h1><p class="muted">Pick a style, then make it yours.</p></div><div class="picker" id="picker"></div><div class="pdp" style="padding-top:20px"><div class="gal"><div class="main sq" id="lvv"></div></div><div class="info"><h2 id="cp" style="font-size:34px;margin-bottom:6px"></h2><p class="muted" id="cpp" style="margin-bottom:20px"></p><div id="dz"></div><div id="bb"></div></div></div></div>';
    var V = CB.visible(); $("#picker").innerHTML = V.map(function (p) { return '<button class="pk" data-i="' + p.id + '"><img src="' + CB.img(p, 1) + '" alt=""><span>' + esc(p.name) + "</span></button>"; }).join("");
    function pick(p) { $$(".pk").forEach(function (b) { b.classList.toggle("on", +b.dataset.i === p.id); }); $("#cp").textContent = p.name; $("#cpp").textContent = "From " + money(p.price) + ". Name included."; var s = designer($("#dz"), p, { onChange: function (s) { $("#lvv").innerHTML = art(p.type, s.color, s.text, s.style, s.tcolor, s.charm, { photo: true }); if (u) u(); } }), u; u = buyBox($("#bb"), p, s); $("#lvv").innerHTML = art(p.type, s.color, s.text, s.style, s.tcolor, s.charm, { photo: true }); }
    $$(".pk").forEach(function (b) { b.onclick = function () { pick(CB.byId[+b.dataset.i]); }; }); pick(V[0]);
  };

  /* ============ BAG / CHECKOUT ============ */
  var stepsH = function (n) { return '<ol class="steps">' + ["Bag", "Details & payment", "Confirmation"].map(function (x, i) { return '<li class="' + (i + 1 === n ? "on" : i + 1 < n ? "done" : "") + '"><i>' + (i + 1) + "</i>" + x + "</li>"; }).join("") + "</ol>"; };
  function sumRows() { var d = cart.discount(); return '<div class="row"><span>Subtotal</span><span>' + money(cart.subtotal()) + "</span></div>" + (d ? '<div class="row"><span>Coupon ' + esc(sget("coupon", "")) + '</span><span class="disc">− ' + money(d) + "</span></div>" : "") + '<div class="row"><span>Shipping</span><span>' + (cart.shipping() ? money(cart.shipping()) : "Free") + '</span></div><div class="row t"><span>Total</span><span>' + money(cart.total()) + "</span></div>"; }
  var couponBox = '<div class="coupon"><label for="cpn">Coupon code</label><div class="pinrow"><input id="cpn" placeholder="Enter code" autocapitalize="characters"><button class="btn line" id="cpa" type="button">Apply</button></div><small id="cpm"></small></div>';
  function bindCoupon(redraw) { var b = $("#cpa"); if (!b) return; b.onclick = function () { var k = $("#cpn").value.trim().toUpperCase(); if (CFG.coupons[k]) { sset("coupon", k); redraw(); } else { var m = $("#cpm"); m.className = "bad"; m.textContent = k ? "That code is not valid." : "Enter a code first."; } }; }
  pages.bag = function () {
    function draw() {
      var c = cart.get();
      if (!c.length) { root().innerHTML = '<div class="wrap"><div class="empty"><h2>Your bag is empty</h2><p>Design something with your name on it.</p><div><a class="btn dark" href="customize.html">Design your bag</a> <a class="btn line" href="shop.html">Shop all</a></div></div></div>'; return; }
      var left = Math.max(0, CFG.ship.free - (cart.subtotal() - cart.discount()));
      root().innerHTML = '<div class="wrap"><div class="page-head2"><h1>Your bag</h1></div>' + stepsH(1) + '<div class="co"><div class="panel">' + (left ? '<p class="ship-note">Add ' + money(left) + " more for free shipping.</p>" : '<p class="ship-note ok">You have free shipping.</p>') + c.map(function (i, k) { var p = CB.byId[i.id]; return '<div class="li"><a class="th" href="product-' + p.slug + '.html">' + CB.itemArt(i) + '</a><div><h3>' + esc(p.name) + '</h3><div class="muted">' + esc(CB.itemDesc(i)) + " · " + money(cart.unit(i)) + '</div><div class="qty"><button data-m="' + k + '" aria-label="Fewer">−</button><span>' + i.qty + '</span><button data-p="' + k + '" aria-label="More">+</button></div></div><div class="pr"><b>' + money(cart.unit(i) * i.qty) + '</b><button class="rm" data-r="' + k + '">Remove</button></div></div>'; }).join("") + '</div><aside class="panel sum"><h3>Summary</h3>' + sumRows() + couponBox + '<a class="btn dark block" href="checkout.html">Checkout</a><a class="btn line block" href="shop.html">Keep shopping</a></aside></div></div>';
      $$("[data-m]").forEach(function (b) { b.onclick = function () { var a = cart.get(), i = +b.dataset.m; a[i].qty--; if (a[i].qty < 1) a.splice(i, 1); cart.set(a); draw(); }; });
      $$("[data-p]").forEach(function (b) { b.onclick = function () { var a = cart.get(); a[+b.dataset.p].qty = Math.min(30, a[+b.dataset.p].qty + 1); cart.set(a); draw(); }; });
      $$("[data-r]").forEach(function (b) { b.onclick = function () { var a = cart.get(); a.splice(+b.dataset.r, 1); cart.set(a); draw(); }; });
      bindCoupon(draw);
    }
    draw();
  };
  pages.checkout = function () {
    var c = cart.get(); if (!c.length) { location.replace("bag.html"); return; }
    var a = sget("addr", {}), pay = sget("pay", "upi"), F = function (id, l, v, x) { return '<div class="field"><label for="' + id + '">' + l + '</label><input id="' + id + '" value="' + esc(v || "") + '" ' + (x || "") + '><small id="e' + id + '"></small></div>'; };
    var PM = [["upi", "UPI", "Pay by UPI. We share the UPI ID on WhatsApp."], ["bank", "Bank transfer", "Pay by NEFT or IMPS. Details shared on WhatsApp."], ["link", "Payment link", "We send a secure payment link on WhatsApp."]];
    function draw() {
      root().innerHTML = '<div class="wrap"><div class="page-head2"><h1>Checkout</h1></div>' + stepsH(2) + '<form class="co" id="f" novalidate><div class="panel"><h3>Contact &amp; delivery</h3><div class="two">' + F("fn", "Full name", a.fn, 'autocomplete="name"') + F("ph", "Phone", a.ph, 'inputmode="tel" autocomplete="tel"') + "</div>" + F("a1", "Address", a.a1, 'autocomplete="street-address"') + '<div class="two">' + F("ct", "City", a.ct) + F("st", "State", a.st) + "</div>" + F("pin", "PIN code", a.pin, 'inputmode="numeric" maxlength="6"') + '<div class="field"><label for="nt">Notes (optional)</label><textarea id="nt" rows="2" placeholder="Anything we should know?">' + esc(a.nt || "") + '</textarea></div><h3 style="margin-top:22px">Shipping</h3><div class="method on"><b>Standard shipping</b><span>' + (cart.shipping() ? money(cart.shipping()) : "Free") + " · Estimated " + CFG.ship.eta + '</span></div><h3 style="margin-top:22px">Payment method</h3>' + PM.map(function (m) { return '<label class="method ' + (pay === m[0] ? "on" : "") + '"><input type="radio" name="pm" value="' + m[0] + '"' + (pay === m[0] ? " checked" : "") + "><span><b>" + m[1] + "</b><small>" + m[2] + "</small></span></label>"; }).join("") + '<p class="muted sm">You pay after we confirm your order on WhatsApp.</p></div><aside class="panel sum"><h3>Order summary</h3>' + c.map(function (i) { return '<div class="mini"><div class="th">' + CB.itemArt(i) + "</div><div>" + esc(CB.byId[i.id].name) + '<br><span class="muted">' + esc(i.text || "No text") + " · Qty " + i.qty + "</span></div><span>" + money(cart.unit(i) * i.qty) + "</span></div>"; }).join("") + sumRows() + couponBox + '<button class="btn dark block" id="go" type="submit">Place order</button><p class="muted sm" style="margin-top:10px">Placing your order opens WhatsApp with the details ready to send.</p></aside></form></div>';
      $$("input[name=pm]").forEach(function (r) { r.onchange = function () { pay = r.value; sset("pay", pay); $$(".method").forEach(function (m) { var i = $("input", m); if (i) m.classList.toggle("on", i.checked); }); }; });
      bindCoupon(function () { var cur = {}; ["fn", "ph", "a1", "ct", "st", "pin", "nt"].forEach(function (k) { cur[k] = $("#" + k).value; }); a = cur; draw(); });
      $("#f").onsubmit = function (e) {
        e.preventDefault(); var v = {}, ok = true;
        ["fn", "ph", "a1", "ct", "st", "pin"].forEach(function (k) { v[k] = $("#" + k).value.trim(); var bad = !v[k] || (k === "ph" && !/^[+\d\s-]{10,15}$/.test(v[k])) || (k === "pin" && !/^\d{6}$/.test(v[k])); $("#e" + k).textContent = bad ? "Please check this field." : ""; if (bad) ok = false; });
        if (!ok) { var b = $(".field small:not(:empty)"); if (b) b.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
        v.nt = $("#nt").value.trim(); sset("addr", v);
        var id = CB.orderId(), items = cart.get(), pl = PM.filter(function (m) { return m[0] === pay; })[0][1], msg = CB.orderMsg(id, v, items, pl);
        var all = CB.orders.all(); all.unshift({ id: id, date: new Date().toISOString(), items: items, total: cart.total(), pay: pl, addr: v, status: "Placed", coupon: sget("coupon", ""), msg: msg }); CB.orders.save(all);
        sset("last", id); cart.set([]); sset("coupon", ""); sset("oid", null);
        try { window.open(CB.WAURL(msg), "_blank"); } catch (x) {}
        location.href = "confirmation.html";
      };
    }
    draw();
  };
  pages.confirmation = function () {
    var id = sget("last", null), o = CB.orders.all().filter(function (x) { return x.id === id; })[0];
    if (!o) { root().innerHTML = '<div class="wrap"><div class="empty"><h2>No recent order</h2><p>Your confirmation will appear here after you place an order.</p><a class="btn dark" href="shop.html">Shop all</a></div></div>'; return; }
    root().innerHTML = '<div class="wrap"><div class="page-head2"><h1>Thank you, ' + esc(o.addr.fn.split(" ")[0]) + '</h1></div>' + stepsH(3) + '<div class="co"><div class="panel"><div class="okmark">✓</div><h3>Your order is placed</h3><p>Order ID: <b>' + esc(o.id) + "</b></p><p class=\"muted\">We opened WhatsApp with your order ready to send. <b>Please press Send</b> so we receive it. We will then confirm your design, share payment details and start making your bag.</p><a class=\"btn wa block\" target=\"_blank\" rel=\"noopener\" href=\"" + CB.WAURL(o.msg) + '">' + ic.wa + ' Send order on WhatsApp</a><a class="btn line block" href="track.html">Track this order</a><a class="btn line block" href="shop.html">Continue shopping</a></div><aside class="panel sum"><h3>Order summary</h3>' + o.items.map(function (i) { return '<div class="mini"><div class="th">' + CB.itemArt(i) + "</div><div>" + esc(CB.byId[i.id].name) + '<br><span class="muted">' + esc(CB.itemDesc(i)) + "</span></div><span>" + money(cart.unit(i) * i.qty) + "</span></div>"; }).join("") + '<div class="row t"><span>Total</span><span>' + money(o.total) + '</span></div><p class="muted sm">Deliver to: ' + esc(o.addr.a1) + ", " + esc(o.addr.ct) + " " + esc(o.addr.pin) + "<br>Payment: " + esc(o.pay) + "</p></aside></div></div>";
  };
  pages.track = function () {
    root().innerHTML = '<div class="wrap narrow"><div class="page-head2"><span class="eyebrow">After you order</span><h1>Track your order</h1><p class="muted">Enter your order ID to see its status.</p></div><div class="panel" style="margin-bottom:70px"><div class="field"><label for="tid">Order ID</label><input id="tid" placeholder="CB-261026-1234" autocapitalize="characters" value="' + esc(sget("last", "") || "") + '"></div><button class="btn dark block" id="tgo">Track</button><div id="tres"></div></div></div>';
    var STEPS = ["Placed", "Confirmed", "In production", "Shipped", "Delivered"];
    $("#tgo").onclick = function () {
      var v = $("#tid").value.trim().toUpperCase(), o = CB.orders.all().filter(function (x) { return x.id === v; })[0], r = $("#tres");
      if (!v) { r.innerHTML = '<p class="bad">Please enter your order ID.</p>'; return; }
      var wa = '<a class="btn wa block" target="_blank" rel="noopener" href="' + CB.WAURL("Hi! Please share the status of my order " + v + ".") + '">' + ic.wa + " Ask us on WhatsApp</a>";
      if (!o) { r.innerHTML = '<p class="muted" style="margin-top:16px">We could not find this order on this device. Ask us for the latest status.</p>' + wa; return; }
      var at = Math.max(0, STEPS.indexOf(o.status)); r.innerHTML = '<ol class="tl">' + STEPS.map(function (s, i) { return '<li class="' + (i <= at ? "done" : "") + '"><i></i><b>' + s + "</b></li>"; }).join("") + "</ol>" + wa;
    };
  };

  /* ============ ADMIN (demo, saved in this browser) ============ */
  pages.admin = function () {
    var tab = "dash";
    function draw() {
      var os = CB.orders.all(), rev = os.reduce(function (a, o) { return a + o.total; }, 0), cnt = {};
      os.forEach(function (o) { o.items.forEach(function (i) { cnt[i.id] = (cnt[i.id] || 0) + i.qty; }); });
      var top = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; }).slice(0, 5);
      var body = "";
      if (tab === "dash") body = '<div class="kpis"><div><span>Orders</span><b>' + os.length + '</b></div><div><span>Revenue</span><b>' + money(rev) + '</b></div><div><span>Avg order</span><b>' + money(os.length ? rev / os.length : 0) + '</b></div><div><span>Low stock</span><b>' + CB.P.filter(function (p) { return p.stock <= 5 && !p.hide; }).length + '</b></div></div><div class="panel"><h3>Top products</h3>' + (top.length ? top.map(function (id) { return '<div class="row"><span>' + esc(CB.byId[id].name) + "</span><span>" + cnt[id] + " sold</span></div>"; }).join("") : '<p class="muted">No orders yet.</p>') + "</div>";
      if (tab === "prod") body = '<div class="panel tbl"><table><thead><tr><th>Product</th><th>Price</th><th>Old price</th><th>Stock</th><th>Visible</th></tr></thead><tbody>' + CB.P.map(function (p) { return '<tr><td>' + esc(p.name) + '</td><td><input data-k="price" data-i="' + p.id + '" type="number" value="' + p.price + '"></td><td><input data-k="old" data-i="' + p.id + '" type="number" value="' + (p.old || 0) + '"></td><td><input data-k="stock" data-i="' + p.id + '" type="number" value="' + p.stock + '"></td><td><input data-k="show" data-i="' + p.id + '" type="checkbox"' + (p.hide ? "" : " checked") + "></td></tr>"; }).join("") + '</tbody></table></div><p class="muted sm">Changes save in this browser.</p>';
      if (tab === "ord") body = '<div class="panel tbl"><table><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>' + (os.length ? os.map(function (o, k) { return "<tr><td>" + esc(o.id) + "<br><small>" + new Date(o.date).toLocaleDateString("en-IN") + "</small></td><td>" + esc(o.addr.fn) + "<br><small>" + esc(o.addr.ph) + "</small></td><td>" + money(o.total) + '</td><td><select data-o="' + k + '">' + ["Placed", "Confirmed", "In production", "Shipped", "Delivered"].map(function (s) { return "<option" + (s === o.status ? " selected" : "") + ">" + s + "</option>"; }).join("") + "</select></td></tr>"; }).join("") : '<tr><td colspan="4" class="muted">No orders on this device yet.</td></tr>') + "</tbody></table></div>";
      if (tab === "cust") { var seen = {}; os.forEach(function (o) { seen[o.addr.ph] = seen[o.addr.ph] || { n: o.addr.fn, ph: o.addr.ph, c: o.addr.ct, k: 0, t: 0 }; seen[o.addr.ph].k++; seen[o.addr.ph].t += o.total; }); var cs = Object.keys(seen).map(function (k) { return seen[k]; }); body = '<div class="panel tbl"><table><thead><tr><th>Customer</th><th>Phone</th><th>City</th><th>Orders</th><th>Spent</th></tr></thead><tbody>' + (cs.length ? cs.map(function (c) { return "<tr><td>" + esc(c.n) + "</td><td>" + esc(c.ph) + "</td><td>" + esc(c.c) + "</td><td>" + c.k + "</td><td>" + money(c.t) + "</td></tr>"; }).join("") : '<tr><td colspan="5" class="muted">No customers yet.</td></tr>') + "</tbody></table></div>"; }
      if (tab === "cpn") body = '<div class="panel"><h3>Coupons</h3>' + Object.keys(CFG.coupons).map(function (k) { return '<div class="row"><span><b>' + esc(k) + "</b> " + CFG.coupons[k].pct + '% off</span><button class="rm" data-dc="' + esc(k) + '">Remove</button></div>'; }).join("") + '<div class="pinrow" style="margin-top:16px"><input id="nc" placeholder="CODE" autocapitalize="characters"><input id="np" type="number" placeholder="% off" style="max-width:110px"><button class="btn dark" id="ac">Add</button></div></div>';
      if (tab === "set") body = '<div class="panel"><h3>Store settings</h3><div class="row"><span>WhatsApp</span><span>' + esc(CFG.phone) + '</span></div><div class="row"><span>Free shipping above</span><span>' + money(CFG.ship.free) + '</span></div><div class="row"><span>Shipping charge</span><span>' + money(CFG.ship.charge) + '</span></div><p class="muted sm">Edit these in core.js (CFG). Payments are arranged on WhatsApp.</p></div>';
      root().innerHTML = '<div class="wrap"><div class="page-head2"><span class="eyebrow">Owner area</span><h1>Dashboard</h1><p class="muted">Demo dashboard. Data is saved in this browser only. Orders also arrive on WhatsApp.</p></div><div class="atabs">' + [["dash", "Overview"], ["prod", "Products & stock"], ["ord", "Orders"], ["cust", "Customers"], ["cpn", "Coupons"], ["set", "Settings"]].map(function (t) { return '<button class="' + (tab === t[0] ? "on" : "") + '" data-t="' + t[0] + '">' + t[1] + "</button>"; }).join("") + '</div><div style="padding-bottom:80px">' + body + "</div></div>";
      $$(".atabs button").forEach(function (b) { b.onclick = function () { tab = b.dataset.t; draw(); }; });
      $$("[data-k]").forEach(function (el) { el.onchange = function () { var id = +el.dataset.i, o = sget("ov", {}); o[id] = o[id] || {}; var p = CB.byId[id], k = el.dataset.k; if (k === "show") { o[id].hide = !el.checked; p.hide = !el.checked; } else { var n = Math.max(0, +el.value || 0); o[id][k] = n; p[k] = n; } sset("ov", o); toast("Saved"); }; });
      $$("[data-o]").forEach(function (el) { el.onchange = function () { var a = CB.orders.all(); a[+el.dataset.o].status = el.value; CB.orders.save(a); toast("Status updated"); }; });
      $$("[data-dc]").forEach(function (b) { b.onclick = function () { var cp = sget("coupons", {}); delete cp[b.dataset.dc]; delete CFG.coupons[b.dataset.dc]; sset("coupons", cp); draw(); }; });
      var ac = $("#ac"); if (ac) ac.onclick = function () { var k = $("#nc").value.trim().toUpperCase(), n = +$("#np").value; if (!k || !(n > 0 && n <= 90)) { toast("Enter a code and a % between 1 and 90"); return; } var cp = sget("coupons", {}); cp[k] = { pct: n, label: n + "% off" }; CFG.coupons[k] = cp[k]; sset("coupons", cp); draw(); };
    }
    draw();
  };
})();
