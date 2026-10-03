/* ASUS 大筆電選機室 — 共用指令碼（原生 JS，無框架） */
(function () {
  var root = document.documentElement;

  function store(k, v) {
    try {
      if (v === undefined) return window.localStorage.getItem(k);
      window.localStorage.setItem(k, v);
    } catch (e) { return null; }
    return null;
  }

  /* ---------- FR-01 日夜雙模式 ---------- */
  function effectiveMode() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function syncToggle() {
    var m = effectiveMode();
    var btns = document.querySelectorAll(".mode button");
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute("aria-pressed", btns[i].getAttribute("data-mode") === m ? "true" : "false");
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".mode button") : null;
    if (!b) return;
    var m = b.getAttribute("data-mode");
    root.setAttribute("data-theme", m);
    store("tufmode", m);
    syncToggle();
  });
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.addEventListener) mq.addEventListener("change", syncToggle);
  }
  syncToggle();

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function byId(id) { return document.getElementById(id); }

  /* ---------- FR-03 / FR-04 選機精靈 ---------- */
  var form = byId("finder-form");
  if (form) {
    var out = byId("result-body"), matchEl = byId("match");
    var first = true;
    var render = function () {
      var a = {
        purpose: form.querySelector("input[name=purpose]:checked").value,
        care: form.querySelector("input[name=care]:checked").value,
        size: form.querySelector("input[name=size]:checked").value
      };
      var r = recommend(a), m = r.ranked[0].m, why = reasons(m, a);
      matchEl.textContent = r.match;
      var html =
        '<p class="r-name">' + esc(m.name) + (m.lead ? ' <span class="chip lead">代理主力</span>' : "") + "</p>" +
        '<p class="r-code">' + esc(m.code) + "</p>" +
        '<dl class="kv">' +
        "<div><dt>GPU / VRAM</dt><dd>" + esc(m.gpu) + "</dd></div>" +
        "<div><dt>CPU</dt><dd>" + esc(m.cpu) + "</dd></div>" +
        "<div><dt>螢幕</dt><dd>" + esc(m.disp) + "</dd></div>" +
        "<div><dt>記憶體 / 重量</dt><dd>" + esc(m.ram) + " ・ " + m.wt.toFixed(2) + " kg</dd></div>" +
        "</dl>" +
        '<ol class="why">' + why.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ol>" +
        '<div class="alts"><h3>另外兩台也值得看</h3><ul>' +
        r.ranked.slice(1, 3).map(function (x) {
          return '<li><a href="models.html#' + x.m.id + '">' + esc(x.m.name) + "</a><span>" + x.m.vram + "GB ・ " + x.m.wt.toFixed(2) + " kg</span></li>";
        }).join("") + "</ul></div>" +
        '<div class="r-foot"><a class="btn btn-primary" href="contact.html">帶著這個結果洽詢</a>' +
        '<a class="btn btn-ghost" href="models.html#' + m.id + '">看完整規格</a></div>';
      out.innerHTML = html;
      if (!first) { out.classList.remove("fade"); void out.offsetWidth; out.classList.add("fade"); }
      first = false;
      var labels = { ai: "本地 AI 開發與推論", game: "遊戲與電競為主", both: "白天開發、晚上打" };
      var sizeL = { "16": "16 吋為上限", "18": "要 18 吋大畫面", any: "尺寸都可以" };
      store("tuflast", JSON.stringify({ name: m.name, match: r.match, q: [labels[a.purpose], CARE_LABEL[a.care], sizeL[a.size]] }));
    };
    form.addEventListener("change", render);
    render();
  }

  /* ---------- FR-05 機種卡片 ---------- */
  var cards = byId("cards");
  if (cards) {
    cards.innerHTML = MODELS.map(function (m) {
      var pct = Math.round(m.vram / 24 * 1000) / 10;
      return '<article class="panel card' + (m.lead ? " lead" : "") + '" id="' + m.id + '">' +
        '<div class="card-top"><div><h3>' + esc(m.name) + '</h3><p class="code">' + esc(m.code) + "</p></div>" +
        '<span class="chip' + (m.lead ? " lead" : "") + '">' + esc(m.tag) + "</span></div>" +
        '<div><div class="vbar-l"><span>VRAM</span><b>' + m.vram + ' GB</b></div>' +
        '<div class="vbar" role="img" aria-label="VRAM ' + m.vram + 'GB，滿格 24GB 的 ' + Math.round(pct) + '%"><i style="width:' + pct + '%"></i></div></div>' +
        '<dl class="specs">' +
        "<div><dt>CPU</dt><dd>" + esc(m.cpu) + "</dd></div>" +
        "<div><dt>GPU</dt><dd>" + esc(m.gpu) + "</dd></div>" +
        "<div><dt>螢幕</dt><dd>" + esc(m.disp) + "</dd></div>" +
        "<div><dt>記憶體</dt><dd>" + esc(m.ram) + "</dd></div>" +
        "<div><dt>重量</dt><dd>" + m.wt.toFixed(2) + " kg</dd></div>" +
        "</dl>" +
        '<p class="note">' + esc(m.note) + "</p></article>";
    }).join("");
  }

  /* ---------- FR-06 規格對照表 ---------- */
  var tbody = byId("spec-rows");
  if (tbody) {
    tbody.innerHTML = MODELS.map(function (m) {
      return '<tr' + (m.lead ? ' class="lead"' : "") + "><td>" + esc(m.name) + "<small>" + esc(m.code) + "</small></td>" +
        "<td>" + esc(m.cpu) + "</td><td>" + esc(m.gpu) + "</td><td>" + esc(m.disp) + "</td><td>" + esc(m.ram) + "</td><td>" + m.wt.toFixed(2) + " kg</td></tr>";
    }).join("");
  }

  /* ---------- VRAM 對照表（guide） ---------- */
  var vt = byId("vram-rows");
  if (vt) {
    vt.innerHTML = VRAM_SCALE.map(function (v) {
      return "<tr><td>" + v.vram + " GB</td><td>" + esc(v.fit) + "</td><td>" + esc(v.models) + "</td></tr>";
    }).join("");
  }

  /* ---------- FR-09 聯絡：帶入最近一次選機結果 ---------- */
  var mail = byId("mail-link");
  if (mail) {
    var last = null;
    try { last = JSON.parse(store("tuflast") || "null"); } catch (e) { last = null; }
    var body = "盧經理您好，\n\n我想詢問 ASUS 16–18 吋大型筆電。\n";
    var box = byId("last-result");
    if (last && last.name) {
      body += "\n選機精靈推薦：" + last.name + "（MATCH " + last.match + "）\n我的回答：" + last.q.join(" / ") + "\n";
      if (box) {
        box.hidden = false;
        byId("last-name").textContent = last.name;
        byId("last-q").textContent = last.q.join(" ・ ") + " ・ MATCH " + last.match;
      }
    }
    body += "\n方便聯絡的時間：\n";
    mail.href = "mailto:leafy6674@gmail.com?subject=" + encodeURIComponent("ASUS 16-18 吋大型筆電詢價") + "&body=" + encodeURIComponent(body);
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".copy") : null;
    if (!b) return;
    e.preventDefault();
    var text = b.getAttribute("data-copy");
    var done = function () { var t = b.textContent; b.textContent = "已複製"; setTimeout(function () { b.textContent = t; }, 1400); };
    try {
      navigator.clipboard.writeText(text).then(done, function () {});
    } catch (err) { /* 複製不可用時，數字本身可直接選取 */ }
  });
})();
