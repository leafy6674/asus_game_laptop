/* ASUS 大筆電選機室 — 機種主檔（PRD §6 欄位定義；規格依 PRD 附錄 A） */
var MODELS = [
  {
    id: "a16", name: "TUF Gaming A16", code: "FA608PP-QT014WS ・ Jaeger Gray", tag: "入門甜蜜點", lead: false,
    size: 16, vram: 8, wt: 2.20, ramMax: 16,
    cpu: "AMD Ryzen 9 8940HX",
    gpu: "RTX 5070 8GB GDDR7 / 115W",
    disp: "16″ 2.5K 165Hz OLED 或 300Hz IPS",
    ram: "16GB DDR5-5600",
    s: { ai: 58, game: 74, port: 78, value: 92 }, screenB: 8,
    why: {
      ai: "入門本地 AI 的起點：8GB VRAM 跑 7B 量化模型、做 Stable Diffusion 1.5 微調都夠用。",
      game: "RTX 5070 跑 2.5K 主流電競綽綽有餘，16 吋機身好帶，適合預算控制得宜的玩家。",
      both: "白天跑小模型、晚上打主流遊戲，兩邊都不追頂規時，這台最省心。"
    },
    vnote: "8GB VRAM，約可載入 7B 量化模型（Q4 粗估）",
    valnote: "五款中規格效益比最高，同等級距的配置密度最好",
    note: "OLED 與 300Hz IPS 兩種面板可選，買前先確認批次配置。"
  },
  {
    id: "a18", name: "TUF Gaming A18", code: "FA808 系列", tag: "代理主力", lead: true,
    size: 18, vram: 12, wt: 2.80, ramMax: 32,
    cpu: "AMD Ryzen 9 8940HX",
    gpu: "RTX 5070 Ti 12GB / 140W",
    disp: "18″ 2.5K 300Hz IPS ACR / DCI-P3 100%",
    ram: "32GB DDR5-5200",
    s: { ai: 70, game: 86, port: 62, value: 88 }, screenB: 14,
    why: {
      ai: "12GB VRAM 能跑 13B 量化模型或 7B fp16 完整載入，是本地 AI 從玩票走向實用的分水嶺。",
      game: "RTX 5070 Ti 搭 140W TGP，配 18 吋 300Hz 面板，是這個價位帶最完整的大螢幕電競組合。",
      both: "18 吋大畫面寫程式、跑 13B 模型，晚上直接切 300Hz 打遊戲，兩邊都不必妥協。"
    },
    vnote: "12GB VRAM，約可載入 13B 量化模型，或 7B fp16 完整載入（Q4 粗估）",
    valnote: "用 TUF 的定位拿到 18 吋 300Hz 與 12GB VRAM，效益比僅次於 A16",
    note: "代理主力機種。18 吋 300Hz ACR 面板，DCI-P3 100% 色域。"
  },
  {
    id: "g18", name: "ROG Strix G18", code: "G815", tag: "高階電競", lead: false,
    size: 18, vram: 16, wt: 3.50, ramMax: 64,
    cpu: "Intel Core Ultra 9 290HX Plus",
    gpu: "最高 RTX 5080 16GB",
    disp: "18″ 2.5K 240Hz Mini LED / 1600 nits",
    ram: "64GB DDR5-6400",
    s: { ai: 82, game: 94, port: 40, value: 68 }, screenB: 24,
    why: {
      ai: "16GB VRAM 可跑 14B 量化模型、做 SDXL 微調，記憶體上限 64GB 留給資料前處理。",
      game: "RTX 5080 加上 1600 nits Mini LED，HDR 遊戲的亮部與暗部都撐得住。",
      both: "Mini LED 白天看圖表清楚，晚上打 HDR 遊戲震撼，16GB VRAM 讓兩邊都有餘裕。"
    },
    vnote: "16GB VRAM，約可載入 14B 量化模型，可做 SDXL 微調（Q4 粗估）",
    valnote: "比 SCAR 18 少一階顯卡，卻保有 Mini LED 與 64GB 上限，屬於務實的高階選擇",
    note: "顯示卡標示為「最高」配置，實際出貨請以批次為準。"
  },
  {
    id: "scar18", name: "ROG Strix SCAR 18", code: "G835", tag: "旗艦電競", lead: false,
    size: 18, vram: 24, wt: 3.73, ramMax: 128,
    cpu: "Intel Core Ultra 9 290HX Plus（24 核）",
    gpu: "最高 RTX 5090 24GB / 175W",
    disp: "18″ 4K 240Hz Mini LED / 2000+ 分區 / 1600 nits",
    ram: "128GB DDR5-6400",
    s: { ai: 96, game: 100, port: 32, value: 45 }, screenB: 28,
    why: {
      ai: "24GB VRAM 加 128GB 記憶體上限，32B 量化模型常駐、70B 分層載入、LoRA 微調都有餘裕。",
      game: "RTX 5090 跑滿 175W，搭 4K 240Hz Mini LED，五款中唯一沒有短板的電競旗艦。",
      both: "白天當行動 AI 工作站，晚上是頂規電競機，前提是你接受將近 3.7 kg 的重量。"
    },
    vnote: "24GB VRAM，約可載入 32B 量化模型，70B 可分層載入（Q4 粗估）",
    valnote: "規格全面頂滿，效益比不是它的強項，適合要一次到位的人",
    note: "4K 240Hz Mini LED、2000+ 分區控光，記憶體可擴至 128GB。"
  },
  {
    id: "zg16", name: "ROG Zephyrus G16", code: "2026", tag: "輕薄 AI 工作站", lead: false,
    size: 16, vram: 24, wt: 1.85, ramMax: 64,
    cpu: "Intel Core Ultra 9 386H（含 NPU）",
    gpu: "最高 RTX 5090 24GB",
    disp: "16″ 2.5K Nebula OLED 240Hz / 1100 nits / 0.2ms",
    ram: "64GB LPDDR5X-8533（焊死）",
    s: { ai: 90, game: 82, port: 98, value: 52 }, screenB: 22,
    why: {
      ai: "1.85 kg 機身塞進 24GB VRAM，32B 量化模型隨身帶著走，是最輕的本地 AI 工作站。",
      game: "OLED 0.2ms 反應時間畫面乾淨，但輕薄機身的 TGP 低於 SCAR 18，長時間滿載幀數會略遜。",
      both: "白天帶去辦公室跑模型、晚上回家接螢幕打遊戲，輕薄與 24GB VRAM 兼得。"
    },
    vnote: "24GB VRAM，約可載入 32B 量化模型（Q4 粗估）；記憶體為焊死 LPDDR5X，購買時就要決定容量",
    valnote: "輕薄與頂規顯卡並存，價差主要買的是 1.85 kg 的可攜性",
    note: "記憶體焊死不可升級。2026 年款正式型號代碼待原廠確認。"
  }
];

var VRAM_SCALE = [
  { vram: 8,  fit: "7B 量化模型；Stable Diffusion 1.5 微調", models: "TUF Gaming A16" },
  { vram: 12, fit: "13B 量化模型，或 7B fp16 完整載入", models: "TUF Gaming A18" },
  { vram: 16, fit: "14B 量化模型；SDXL 微調；中型視覺模型", models: "ROG Strix G18" },
  { vram: 24, fit: "32B 量化模型；70B 分層載入；LoRA 微調餘裕充足", models: "ROG Strix SCAR 18、ROG Zephyrus G16" }
];

/* PRD §5.2 評分公式 */
function scoreModel(m, a) {
  var base = a.purpose === "ai" ? m.s.ai : a.purpose === "game" ? m.s.game : (m.s.ai + m.s.game) / 2;
  if (a.care === "vram") base += (m.vram - 8) * 1.7;
  if (a.care === "screen") base += m.screenB;
  if (a.care === "weight") base += (m.s.port - 55) * 0.42;
  if (a.care === "value") base += (m.s.value - 60) * 0.42;
  if (a.size !== "any") base += (m.size === Number(a.size) ? 16 : -24);
  return base;
}

/* PRD §5.3 Match 換算 */
function recommend(a) {
  var ranked = MODELS.map(function (m) { return { m: m, sc: scoreModel(m, a) }; })
    .sort(function (x, y) { return y.sc - x.sc; });
  var spread = ranked[0].sc - ranked[ranked.length - 1].sc || 1;
  var gap = ranked[0].sc - ranked[1].sc;
  var match = Math.round(88 + Math.min(11, gap / spread * 34));
  return { ranked: ranked, match: match };
}

/* PRD §5.4 推薦理由組裝 */
var CARE_LABEL = { vram: "VRAM 與記憶體上限", screen: "螢幕素質與更新率", weight: "重量與可攜性", value: "規格效益比" };
function reasons(m, a) {
  var r1 = m.why[a.purpose];
  var body;
  if (a.care === "vram") body = m.vnote + "；系統記憶體上限 " + m.ramMax + "GB。";
  else if (a.care === "screen") body = m.disp + "。";
  else if (a.care === "weight") {
    var w = m.wt <= 2.3 ? "每天背著通勤也不吃力" : m.wt <= 2.9 ? "可以帶出門，但會感覺到重量" : "定位是桌上型替代機，移動時要有心理準備";
    body = "整機約 " + m.wt.toFixed(2) + " kg，" + w + "。";
  } else body = m.valnote + "。";
  var r2 = "你最在意" + CARE_LABEL[a.care] + "：" + body;
  var r3;
  if (a.size === "any") r3 = "你沒有限制尺寸，這是純看規格排出的結果；它是 " + m.size + " 吋。";
  else if (m.size === Number(a.size)) r3 = m.size === 16
    ? "16 吋符合你的桌面限制，放進背包、擺上小桌都沒問題。"
    : "18 吋符合你要的大畫面，分割視窗寫程式、看遊戲細節都更舒服。";
  else r3 = "它是 " + m.size + " 吋，和你偏好的 " + a.size + " 吋不同。其他條件拉開的差距夠大，所以仍排第一，建議先量一下桌面再決定。";
  return [r1, r2, r3];
}
