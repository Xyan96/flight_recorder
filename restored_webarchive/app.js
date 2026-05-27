const STORAGE_KEY = "flight-log-pwa-v1";
const THEME_KEY = "flight-log-theme";
const CUSTOM_LICENSE_KEY = "flight-log-custom-license-v1";
const CUSTOM_LICENSE_SYNC_KEY = "flight-log-custom-license-last-sync";
const RECORD_ARCHIVE_KEY = "flight-log-record-archive-v1";
const PENDING_RECORD_ARCHIVE_KEY = "flight-log-pending-records-v1";
const LICENSE_SYNC_URL = "license-archive.json";
const RECORDS_URL = "flight-records";
const COMM_ROWS = 8;
const CHECK_ROWS = 3;
const PHRASES = [
  { label: "RCD", value: "RCD" },
  { label: "MT", value: "MT" },
  { label: "RP", value: "RP" },
  { label: "DR", value: "DR" },
  { label: "↑", value: "↑", title: "上升" },
  { label: "↓", value: "↓", title: "下降" },
  { label: "↰", value: "↰", title: "左转" },
  { label: "↱", value: "↱", title: "右转" },
  { label: "RWY", value: "RWY" },
  { label: "P/S", value: "P/S" },
  { label: "L/U", value: "L/U" },
  { label: "T/O", value: "T/O" },
  { label: "L/D", value: "L/D" },
  { label: "QNH", value: "QNH" },
];
const NUMERIC_AFTER_PHRASES = new Set(["↑", "↓", "↰", "↱", "RWY", "QNH"]);
const LICENSE_ARCHIVE_RAW = `
唐棣玺3743
陈志明14489
刘红磊6621
余晓10379
杜洋12939
张毅83 1618
许顺云8087
周曦9990
曾世杰1238
周露24454
许万银6128
余锋1235
连瑞10088
刘进82 14363
余勋6660
丁磊1757
严君1712
陈志明14489
王雷10081
程思宇1622
刘亚东4721
何健6427
李建虎17927
邓斌10044
吴强6663
舒立军1649
罗洁夫18952
叶茂10120
贾国梁10424
倪康10031
刘巍11125
邓苏10058
杨凌君10846
罗震波10094
孙建明10105
刘含章21519
何相21495
康磊7231
陈恒超1640
李施町10390
许家骝12853
宋韫麒4732
武文杰3902
张波 10414
范强14974
王晓峰C10103
戴永霖10335
肖泽勇15263
王天军10106
梁新8460
师勇3937
徐宏4727
喻适10057
唐勇9079
贺安良10033
钱滨南10091
郭佳文14632
赵麟6643
林涛3861
王永乐1646
曹挺14964
白忱14724
何宗舟13329
陈曦3776
施恩学6619
欧阳颖10127
刘石柱3662
孙建明10105
余峰1235
杨阳15028
刘红磊6621
付坤14954
韩峰21666
段志维10083
娄宇鹏22949
姚德海17923
覃昕 13001
敬元伟3935
倪康10031
陈时德1222
张章13337
何健6427
郑炯3864
许志28507
蒋彦灝10938
金俊10062
朱星宇26194
郝伟3169
范强14974
张力6420
李扬21459
曾涛10053
张陈锦14139
梁平25535
万钦30141
李勇6659
糜佳南16177
吴昊15026
马训波10732
刘宜侃14928
向导8305 10481
石华6638
张翃宇6618
孙永辉10161
谢国辉3870
段悦18236
李思明24665
张林敏17428
蒋文骏24915
乔嘉伟15717
曲小兵14287
李严24256
施云22097
罗杨杨24666
弋戈14366
周文博22380
王书毅21644
赵君宇25662
颜海21560
李光14361
李鹏21409
田敏17436
罗伟1247
郑毅航6417
鲁岳12999
马海里26967
刘念16140
向导85 14987
袁丁3789
薛常清17736
龙贤琨15944
刘韬1621
郭佳21646
周应魁10245
刘田翔24925
张亮17791
黄宇13233
刘栋22106
王昭琦6395
高建17731
王浩川16108
王炜峰21488
何玺21344
林伟17735
赵青18095
张园22404
关国梁14151
范勤9926
王波15120
莫凡18707
凌勇10122
刘奇17787
熊圯理33710
叶海14938
郑爽21380
何云峰24175
宋丹24193
黄小军23702
唐凯3794
喻振波10059
汤家忠3704
范宁3931
邓明1752
朱维军23117
杨建文1210
蒋汉俊6615
刘璐20941
杜勇16492
杨捷68 3898
王超10988
严颖异27042
杨司南21475
解维一17810
余海波17412
何磊79 3754
青云13302
李学涛27683
周健吉14952
谢波14832
高文10236
杨皓淋31285
熊凯6613
谭添26540
王阳12989
胡明24257
肖永胜26140
张之琨29683
孙睿21620
张坚1242
陈奥翔24745
郭昕25536
高国勤33362
肖祥29715
芶平20003
胡光耀12457
方志勇21318
易祖贤00104540
朱恒25547
聂年强17058
马海里26967
郭昕25536
郝亮1620
王国庆2760
徐定遥21328
闫涛17819
高峰86 19924
陈柯10079
岳静锐9088
康磊7231
王天军10106
孟俊文10132
欧蓉生3865
张之原10092
吴晓政10077
张国庆11282
万浩17921
许家骝12853
卢鹏洲13003
范伟涛13262
张承之21629
张一斌12944
张磊13646
张晓东2749
李剑20911
高磊6104
陈默17915
蓝宁13038
段炼3171
刘巍11125
詹卿13219
刘家贵1244
李正梁10054
梁斌2762
赫骥8146
孔祥宇14095
焦云3909
王晓峰73 10051
陈震3423
`;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function utcStamp() {
  const now = new Date();
  return `${String(now.getUTCHours()).padStart(2, "0")}${String(now.getUTCMinutes()).padStart(2, "0")}Z`;
}

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function numberValue(value) {
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  return String(Math.round(value * 10) / 10);
}

function digitsOnly(value, maxLength) {
  return String(value).replace(/\D/g, "").slice(0, maxLength);
}

function formatVhf(rest) {
  return completeVhfInput(rest);
}

function formatVhfInput(value) {
  const cleaned = String(value).replace(/[^\d.]/g, "");
  const [before = "", after = ""] = cleaned.split(".");
  const beforeDigits = before.replace(/\D/g, "");
  const head = beforeDigits.slice(0, 3);
  const tail = after.replace(/\D/g, "").slice(0, 3);
  if (cleaned.includes(".")) return tail ? `${head}.${tail}` : `${head}.`;
  if (beforeDigits.length <= 3) return head;
  return `${head}.${beforeDigits.slice(3, 6)}`;
}

function completeVhfInput(value) {
  const text = String(value).trim();
  if (!text) return "";
  const oldFormat = text.match(/^(\d{2})\.(\d{0,3})$/);
  if (oldFormat) return `1${oldFormat[1]}.${oldFormat[2].padEnd(3, "0")}`;
  const currentFormat = text.match(/^(\d{3})\.(\d{0,3})$/);
  if (currentFormat) return `${currentFormat[1]}.${currentFormat[2].padEnd(3, "0")}`;
  const raw = text.replace(/\D/g, "").slice(0, 6);
  if (!raw) return "";
  if (raw.length === 5 && raw[0] !== "1") return `1${raw.slice(0, 2)}.${raw.slice(2).padEnd(3, "0")}`;
  const head = raw.slice(0, 3).padEnd(3, "0");
  const tail = raw.slice(3).padEnd(3, "0");
  return `${head}.${tail}`;
}

function insertAtCursor(textarea, text) {
  const prefix = textarea.value && !textarea.value.endsWith(" ") ? " " : "";
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? textarea.value.length;
  const next = `${textarea.value.slice(0, start)}${prefix}${text}${textarea.value.slice(end)}`;
  textarea.value = next;
  const caret = start + prefix.length + text.length;
  textarea.focus();
  textarea.setSelectionRange(caret, caret);
}

function activatePhraseButton(button) {
  const row = button.closest(".comm-row");
  const note = $(".comm-note", row);
  const phrase = button.dataset.phrase;
  stampRow(note);
  insertAtCursor(note, phrase);
  if (NUMERIC_AFTER_PHRASES.has(phrase)) {
    preferNumericKeyboard(note, true);
  } else {
    preferUppercaseKeyboard(note, true);
  }
  save();
}

function refreshKeyboardHint(textarea) {
  if (document.activeElement !== textarea) {
    textarea.focus();
    return;
  }
  textarea.blur();
  requestAnimationFrame(() => textarea.focus());
}

function preferUppercaseKeyboard(textarea, refresh = false) {
  textarea.inputMode = "text";
  textarea.setAttribute("inputmode", "text");
  textarea.removeAttribute("pattern");
  textarea.autocapitalize = "characters";
  textarea.setAttribute("autocapitalize", "characters");
  textarea.autocorrect = "off";
  textarea.spellcheck = false;
  if (refresh) refreshKeyboardHint(textarea);
}

function preferNumericKeyboard(textarea, refresh = false) {
  textarea.inputMode = "numeric";
  textarea.setAttribute("inputmode", "numeric");
  textarea.setAttribute("pattern", "[0-9]*");
  textarea.autocapitalize = "off";
  textarea.setAttribute("autocapitalize", "off");
  textarea.autocorrect = "off";
  textarea.spellcheck = false;
  if (refresh) refreshKeyboardHint(textarea);
}

function uppercaseLatinInput(textarea) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const next = textarea.value.replace(/[a-z]/g, (letter) => letter.toUpperCase());
  if (next === textarea.value) return;
  textarea.value = next;
  textarea.setSelectionRange(start, end);
}

function normalizeName(name) {
  return String(name).replace(/\s+/g, "");
}

function normalizeFn(code) {
  const compact = String(code).replace(/\s+/g, "").toUpperCase();
  const prefixed = compact.match(/^([A-Z]+)(\d+)$/);
  if (prefixed) return `${prefixed[1]}${prefixed[2].padStart(7 - prefixed[1].length, "0")}`;
  if (!/\d/.test(compact)) return "";
  return compact.replace(/\D/g, "").padStart(7, "0");
}

function parseLicenseLine(line) {
  const trimmed = line.trim();
  const spaced = trimmed.match(/^(.+?)\s+([A-Za-z]?\d+)$/);
  if (spaced) return [normalizeName(spaced[1]), normalizeFn(spaced[2])];

  const compact = trimmed.match(/^(.+?)([A-Za-z]?\d+)$/);
  return compact ? [normalizeName(compact[1]), normalizeFn(compact[2])] : null;
}

function buildLicenseArchive(raw) {
  return Object.fromEntries(
    raw
      .trim()
      .split(/\n+/)
      .map(parseLicenseLine)
      .filter(Boolean)
  );
}

const LICENSE_ARCHIVE = buildLicenseArchive(LICENSE_ARCHIVE_RAW);
let customLicenseArchive = loadCustomLicenseArchive();
let lastSavedFlightKey = "";
let pendingSyncInFlight = false;
const COMMON_IDS = [
  "aircraftNo",
  "flightNo",
  "sectorFrom",
  "sectorTo",
  "captain",
  "captainFn",
  "dateUtc",
  "preOil",
  "oxygen",
  "releaseFuel",
  "actualFuel",
];
let appState = { common: {}, pages: [{}], currentPage: 0 };

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $("#themeToggle").textContent = theme === "dark" ? "☀" : "☾";
  localStorage.setItem(THEME_KEY, theme);
}

function licenseForCaptain(name) {
  const normalized = normalizeName(name);
  return customLicenseArchive[normalized] || LICENSE_ARCHIVE[normalized] || "";
}

function updateCaptainFn() {
  const matched = licenseForCaptain($("#captain").value);
  if (matched) $("#captainFn").value = matched;
}

function loadCustomLicenseArchive() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_LICENSE_KEY) || "{}");
  } catch {
    return {};
  }
}

async function loadRemoteLicenseArchive() {
  try {
    const response = await fetch(`${LICENSE_SYNC_URL}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const remote = await response.json();
    if (!remote || typeof remote !== "object" || Array.isArray(remote)) return;
    customLicenseArchive = { ...remote, ...customLicenseArchive };
    localStorage.setItem(CUSTOM_LICENSE_KEY, JSON.stringify(customLicenseArchive));
  } catch {
    // File:// or offline use keeps working with the local archive.
  }
}

function persistCustomLicense(name, code) {
  const normalizedName = normalizeName(name);
  const normalizedCode = normalizeFn(code);
  if (!normalizedName || !normalizedCode || LICENSE_ARCHIVE[normalizedName]) return;
  if (/^0+$/.test(normalizedCode)) return;
  if (customLicenseArchive[normalizedName] === normalizedCode) return;
  customLicenseArchive = { ...customLicenseArchive, [normalizedName]: normalizedCode };
  localStorage.setItem(CUSTOM_LICENSE_KEY, JSON.stringify(customLicenseArchive));
  syncCustomLicenseArchive();
}

async function syncCustomLicenseArchive() {
  if (!navigator.onLine || !Object.keys(customLicenseArchive).length) return;
  try {
    await loadRemoteLicenseArchive();
    await fetch(LICENSE_SYNC_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customLicenseArchive, null, 2),
      keepalive: true,
    });
    localStorage.setItem(CUSTOM_LICENSE_SYNC_KEY, new Date().toISOString());
  } catch {
    // No server endpoint is required for local use; keep the latest copy locally.
  }
}

function createRows() {
  const commTemplate = $("#commTemplate");
  const checkTemplate = $("#checkTemplate");
  const commRows = $("#commRows");
  const checkRows = $("#checkRows");
  commRows.replaceChildren();
  checkRows.replaceChildren();

  for (let i = 0; i < COMM_ROWS; i += 1) {
    const row = commTemplate.content.cloneNode(true);
    const commRow = row.querySelector(".comm-row");
    commRow.dataset.index = i;
    const bar = row.querySelector(".phrase-bar");
    PHRASES.forEach((phrase) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "phrase-button";
      button.dataset.phrase = phrase.value;
      button.textContent = phrase.label;
      if (phrase.title) button.title = phrase.title;
      bar.append(button);
    });
    commRows.append(row);
  }

  for (let i = 0; i < CHECK_ROWS; i += 1) {
    const row = checkTemplate.content.cloneNode(true);
    row.querySelector(".check-card").dataset.index = i;
    checkRows.append(row);
  }
}

function stampRow(target) {
  const row = target.closest(".comm-row");
  if (!row) return;
  const time = $(".utc-time", row);
  if (time && !time.value) time.value = utcStamp();
}

function stampCheck(card) {
  const time = $(".check-time", card);
  if (time && !time.dataset.baseTime) setCheckTime(time, utcStamp().toLowerCase());
}

function minutesAfterUtcStamp(stamp, minutes) {
  const match = String(stamp).match(/^(\d{2})(\d{2})z$/i);
  if (!match) return "";
  const total = (Number(match[1]) * 60 + Number(match[2]) + minutes) % 1440;
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  return `${String(hour).padStart(2, "0")}${String(minute).padStart(2, "0")}z`;
}

function setCheckTime(output, stamp) {
  const base = String(stamp).match(/\d{4}z/i)?.[0]?.toLowerCase() || "";
  output.dataset.baseTime = base;
  output.classList.toggle("has-time", Boolean(base));
  output.innerHTML = base ? `${base} <span class="next-check">(${minutesAfterUtcStamp(base, 30)})</span>` : "";
}

function checkTimeValue(output) {
  return output.matches(".check-time") ? output.dataset.baseTime || "" : output.value;
}

function isCheckComplete(card) {
  return [".oil-l", ".oil-r", ".used-fuel", ".onboard-fuel", ".wind-dir", ".wind-speed"].every(
    (selector) => $(selector, card).value.trim()
  );
}

function updateCheckTime(card) {
  if (isCheckComplete(card)) stampCheck(card);
}

function recalculate() {
  const takeoff = numberValue($("#actualFuel").value);
  $$(".check-card").forEach((card) => {
    const used = numberValue($(".used-fuel", card).value);
    const onboard = numberValue($(".onboard-fuel", card).value);
    const total = used + onboard;
    $(".total-fuel", card).value = formatNumber(total);
    $(".takeoff-copy", card).value = formatNumber(takeoff);
    $(".fuel-diff", card).value = formatNumber(takeoff - total);
  });
}

function storableFields() {
  return $$("input, textarea, output[data-save]");
}

function commonFields() {
  return COMMON_IDS.map((id) => $(`#${id}`)).filter(Boolean);
}

function pageFields() {
  return storableFields().filter((el) => !el.id || !COMMON_IDS.includes(el.id));
}

function collectFields(elements) {
  return Object.fromEntries(elements.map((el) => [el.id || pathFor(el), checkTimeValue(el)]));
}

function applyFields(elements, fields) {
  elements.forEach((el) => {
    let value = fields?.[el.id || pathFor(el)] ?? "";
    if ((el.matches(".wind-dir") || el.matches(".wind-speed")) && !value) {
      const legacy = fields?.[`wind-${el.closest(".check-card")?.dataset.index ?? "x"}`] || "";
      const [dir = "", speed = ""] = String(legacy).split("/");
      value = el.matches(".wind-dir") ? dir : speed;
    }
    if (el.matches(".check-time")) {
      setCheckTime(el, value);
      return;
    }
    el.value = value;
  });
}

function syncStateFromDom() {
  appState.common = collectFields(commonFields());
  appState.pages[appState.currentPage] = collectFields(pageFields());
}

function pathFor(el) {
  const card = el.closest(".comm-row, .check-card");
  const cardIndex = card?.dataset.index ?? "x";
  const name = [...el.classList].find(Boolean) || el.tagName.toLowerCase();
  return `${name}-${cardIndex}`;
}

function save() {
  syncStateFromDom();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function flightNoDisplay(common = appState.common) {
  return common.flightNo ? `CA${common.flightNo}` : "CA";
}

function currentFlightKey(common = appState.common) {
  const date = String(common?.dateUtc || "").trim();
  const flightNo = flightNoDisplay(common).toUpperCase();
  if (!date || flightNo === "CA") return "";
  return `${date}|${flightNo}`;
}

function recordFlightKey(recordOrMeta) {
  const meta = recordOrMeta?.meta || recordOrMeta || {};
  const date = String(meta.dateUtc || "").trim();
  const flightNo = String(meta.flightNo || "").trim().toUpperCase();
  if (!date || !flightNo || flightNo === "CA") return "";
  return `${date}|${flightNo}`;
}

function markCurrentFlightSaved(recordMeta = null) {
  lastSavedFlightKey = recordFlightKey(recordMeta) || currentFlightKey();
  appState.savedFlightKey = lastSavedFlightKey;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  updatePageControls();
}

function canClearCurrentFlight() {
  const key = currentFlightKey();
  return Boolean(key && (appState.savedFlightKey === key || lastSavedFlightKey === key));
}

function flightSectorDisplay(common = appState.common) {
  const from = common.sectorFrom || "";
  const to = common.sectorTo || "";
  return [from, to].filter(Boolean).join("-");
}

function flightRecordPayload() {
  save();
  const common = appState.common || {};
  return {
    meta: {
      dateUtc: common.dateUtc || todayUtc(),
      flightNo: flightNoDisplay(common),
      sector: flightSectorDisplay(common),
      aircraftNo: common.aircraftNo ? `B-${common.aircraftNo}` : "",
      captain: common.captain || "",
    },
    state: appState,
  };
}

function localRecordArchive() {
  try {
    return JSON.parse(localStorage.getItem(RECORD_ARCHIVE_KEY) || "[]");
  } catch {
    return [];
  }
}

function pendingRecordArchive() {
  try {
    return JSON.parse(localStorage.getItem(PENDING_RECORD_ARCHIVE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writePendingRecordArchive(records) {
  localStorage.setItem(PENDING_RECORD_ARCHIVE_KEY, JSON.stringify(records));
}

function sortRecordsNewestFirst(records) {
  return [...records].sort((a, b) => String(b.meta?.savedAt || b.savedAt || "").localeCompare(String(a.meta?.savedAt || a.savedAt || "")));
}

function localRecordsForSearch(date, flightNo) {
  return localRecordArchive()
    .map((record) => ({ ...record.meta, id: record.id, localOnly: true }))
    .filter((record) => (!date || record.dateUtc === date) && (!flightNo || record.flightNo === `CA${flightNo}`));
}

async function listFlightRecords() {
  try {
    const response = await fetch(RECORDS_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("list failed");
    const data = await response.json();
    renderArchiveResults([...(data.records || []), ...localRecordsForSearch("", "")], false);
  } catch {
    renderArchiveResults(localRecordsForSearch("", ""), true);
  }
}

function writeLocalRecordArchive(records) {
  localStorage.setItem(RECORD_ARCHIVE_KEY, JSON.stringify(sortRecordsNewestFirst(records)));
}

function exportLocalRecords() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    records: localRecordArchive(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `flight-log-local-records-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

async function importLocalRecords(file) {
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    const incoming = Array.isArray(payload) ? payload : payload.records;
    if (!Array.isArray(incoming)) throw new Error("invalid file");
    const merged = new Map(localRecordArchive().map((record) => [record.id || `${recordFlightKey(record)}|${record.meta?.savedAt || ""}`, record]));
    incoming.forEach((record) => {
      if (!record?.state || !record?.meta) return;
      const id = record.id || `${record.meta.dateUtc}-${record.meta.flightNo}-${record.meta.savedAt || Date.now()}.json`;
      merged.set(id, { ...record, id, meta: { ...record.meta, pending: Boolean(record.meta.pending) } });
    });
    writeLocalRecordArchive([...merged.values()]);
    listFlightRecords();
    window.alert("本机记录已导入。请载入需要的记录后点击保存上传。");
  } catch {
    window.alert("导入失败：文件格式不正确。");
  } finally {
    $("#importLocalRecords").value = "";
  }
}

function saveLocalRecord(record, pending = false) {
  const key = recordFlightKey(record);
  const archive = localRecordArchive().filter((item) => !key || recordFlightKey(item) !== key);
  const savedAt = new Date().toISOString();
  const item = {
    ...record,
    meta: { ...record.meta, savedAt, pending },
    id: `${record.meta.dateUtc}-${record.meta.flightNo}-${savedAt}.json`,
  };
  archive.unshift(item);
  writeLocalRecordArchive(archive);
  if (pending) {
    const pendingArchive = pendingRecordArchive().filter((record) => !key || recordFlightKey(record) !== key);
    pendingArchive.unshift(item);
    writePendingRecordArchive(sortRecordsNewestFirst(pendingArchive));
  }
  return item.meta;
}

async function saveFlightRecord() {
  const record = flightRecordPayload();
  try {
    const response = await fetch(RECORDS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!response.ok) throw new Error("save failed");
    const data = await response.json();
    markCurrentFlightSaved(data.record);
    window.alert(`已保存：${data.record.dateUtc} ${data.record.flightNo}`);
    return data;
  } catch {
    const meta = saveLocalRecord(record, true);
    markCurrentFlightSaved(meta);
    window.alert(`离线保存成功，联网后会自动上传：${meta.dateUtc} ${meta.flightNo}`);
    return { ok: false, record: meta, pending: true };
  }
}

async function saveFlightRecordSilently() {
  const record = flightRecordPayload();
  try {
    const response = await fetch(RECORDS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!response.ok) throw new Error("save failed");
    const data = await response.json();
    markCurrentFlightSaved(data.record);
    return data;
  } catch {
    const meta = saveLocalRecord(record, true);
    markCurrentFlightSaved(meta);
    return { ok: false, record: meta, pending: true };
  }
}

async function syncPendingFlightRecords() {
  const pending = pendingRecordArchive();
  if (!pending.length || pendingSyncInFlight) return;
  pendingSyncInFlight = true;
  const remaining = [];
  const syncedIds = new Set();
  try {
    for (const record of pending) {
      try {
        const response = await fetch(RECORDS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ meta: record.meta, state: record.state }),
        });
        if (!response.ok) throw new Error("pending save failed");
        syncedIds.add(record.id);
      } catch {
        remaining.push(record);
      }
    }
    writePendingRecordArchive(remaining);
    if (syncedIds.size) {
      const archive = localRecordArchive().map((record) =>
        syncedIds.has(record.id) ? { ...record, meta: { ...record.meta, pending: false } } : record
      );
      writeLocalRecordArchive(archive);
    }
    if (remaining.length !== pending.length) searchFlightRecords();
  } finally {
    pendingSyncInFlight = false;
  }
}

function retryPendingSync() {
  syncCustomLicenseArchive();
  syncPendingFlightRecords();
}

async function searchFlightRecords() {
  const date = $("#archiveDate").value.trim();
  const flightNo = $("#archiveFlightNo").value.trim();
  try {
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (flightNo) params.set("flightNo", `CA${flightNo}`);
    const response = await fetch(`${RECORDS_URL}?${params.toString()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("search failed");
    const data = await response.json();
    const localRecords = localRecordsForSearch(date, flightNo);
    renderArchiveResults([...(data.records || []), ...localRecords], false);
  } catch {
    const records = localRecordsForSearch(date, flightNo);
    renderArchiveResults(records, true);
  }
}

function renderArchiveResults(records, localOnly) {
  const root = $("#archiveResults");
  root.replaceChildren();
  const deduped = [];
  const seen = new Set();
  for (const record of sortRecordsNewestFirst(records)) {
    const key = recordFlightKey(record) || record.id;
    if (seen.has(key) && record.localOnly) continue;
    if (seen.has(key)) {
      const index = deduped.findIndex((item) => (recordFlightKey(item) || item.id) === key);
      if (index >= 0 && deduped[index].localOnly) deduped[index] = record;
      continue;
    }
    seen.add(key);
    deduped.push(record);
  }
  if (!deduped.length) {
    root.textContent = "没有找到记录";
    return;
  }
  deduped.forEach((record) => {
    const item = document.createElement("article");
    item.className = "archive-item";
    const text = document.createElement("div");
    const title = document.createElement("div");
    title.className = "archive-title";
    title.textContent = `${record.dateUtc || ""} ${record.flightNo || ""} ${record.sector || ""}`.trim();
    const meta = document.createElement("div");
    meta.className = "archive-meta";
    meta.textContent = `${record.localOnly ? "本机" : "服务器"} ${record.aircraftNo || ""} ${record.captain || ""} ${record.savedAt || ""}`.trim();
    text.append(title, meta);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "载入";
    button.dataset.recordId = record.id;
    button.dataset.localRecord = localOnly || record.localOnly ? "1" : "";
    item.append(text, button);
    root.append(item);
  });
}

async function loadFlightRecord(id, localOnly) {
  let record;
  if (localOnly) {
    record = localRecordArchive().find((item) => item.id === id);
  } else {
    const response = await fetch(`${RECORDS_URL}/${encodeURIComponent(id)}`, { cache: "no-store" });
    if (!response.ok) throw new Error("load failed");
    record = await response.json();
  }
  if (!record?.state) return;
  appState = record.state;
  markCurrentFlightSaved(record.meta);
  renderState();
  save();
  $("#archivePanel").hidden = true;
}

function openArchivePanel() {
  $("#archivePanel").hidden = false;
  $("#archiveDate").value = "";
  $("#archiveFlightNo").value = "";
  listFlightRecords();
}

function restore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    appState.common.dateUtc = todayUtc();
    renderState();
    return;
  }

  try {
    const data = JSON.parse(raw);
    if (Array.isArray(data.pages)) {
      appState = {
        common: data.common || {},
        pages: data.pages.length ? data.pages : [{}],
        currentPage: Math.min(data.currentPage || 0, Math.max((data.pages.length || 1) - 1, 0)),
      };
    } else {
      const fields = data.fields || {};
      appState = {
        common: Object.fromEntries(COMMON_IDS.map((id) => [id, fields[id] || ""])),
        pages: [
          Object.fromEntries(
            storableFields()
              .filter((el) => !el.id || !COMMON_IDS.includes(el.id))
              .map((el) => [el.id || pathFor(el), fields[el.id || pathFor(el)] || ""])
          ),
        ],
        currentPage: 0,
      };
    }
    if (!appState.common.dateUtc) appState.common.dateUtc = todayUtc();
    renderState();
  } catch {
    appState = { common: { dateUtc: todayUtc() }, pages: [{}], currentPage: 0 };
    renderState();
  }
}

function renderState() {
  applyFields(commonFields(), appState.common);
  applyFields(pageFields(), appState.pages[appState.currentPage] || {});
  $$(".vhf-rest").forEach((input) => {
    input.value = completeVhfInput(input.value);
    $(".vhf-display", input.closest(".vhf-field")).value = formatVhf(input.value);
  });
  updateCaptainFn();
  recalculate();
  $$(".check-card").forEach(updateCheckTime);
  updatePageControls();
}

function updatePageControls() {
  $("#pageIndicator").value = `第 ${appState.currentPage + 1} 页 / 共 ${appState.pages.length} 页`;
  $("#prevPage").disabled = appState.currentPage === 0;
  $("#clearAll").disabled = !canClearCurrentFlight();
}

function goToPage(index) {
  save();
  appState.currentPage = index;
  renderState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function nextPage() {
  save();
  if (appState.currentPage === appState.pages.length - 1) appState.pages.push({});
  appState.currentPage += 1;
  renderState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function resetCurrentFlight() {
  lastSavedFlightKey = "";
  appState = { common: {}, pages: [{}], currentPage: 0 };
  renderState();
  save();
}

function clearAllFields() {
  if (!canClearCurrentFlight()) return;
  const ok = window.confirm("确认清除当前界面全部填写内容吗？已保存的历史记录不会删除。");
  if (!ok) return;
  resetCurrentFlight();
}

function bindEvents() {
  let lastSingleTouchAt = 0;
  let lastPhraseTouchAt = 0;

  $("#themeToggle").addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  $("#prevPage").addEventListener("click", () => {
    if (appState.currentPage > 0) goToPage(appState.currentPage - 1);
  });

  $("#nextPage").addEventListener("click", nextPage);

  $("#saveRecord").addEventListener("click", saveFlightRecord);
  $("#clearAll").addEventListener("click", clearAllFields);
  $("#openArchive").addEventListener("click", openArchivePanel);
  $("#closeArchive").addEventListener("click", () => {
    $("#archivePanel").hidden = true;
  });
  $("#searchArchive").addEventListener("click", searchFlightRecords);
  $("#exportLocalRecords").addEventListener("click", exportLocalRecords);
  $("#importLocalRecords").addEventListener("change", (event) => importLocalRecords(event.target.files?.[0]));
  $("#archiveFlightNo").addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
  });

  document.addEventListener("focusin", (event) => {
    if (event.target.matches(".comm-note, .vhf-rest")) {
      stampRow(event.target);
      if (event.target.matches(".comm-note")) {
        preferUppercaseKeyboard(event.target);
      }
      save();
    }
  });

  document.addEventListener(
    "touchend",
    (event) => {
      const button = event.target.closest(".phrase-button");
      if (!button) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      lastPhraseTouchAt = Date.now();
      activatePhraseButton(button);
    },
    { passive: false }
  );

  document.addEventListener(
    "dblclick",
    (event) => {
      event.preventDefault();
    },
    { passive: false }
  );

  document.addEventListener(
    "touchend",
    (event) => {
      if (event.changedTouches.length !== 1 || event.touches.length > 0) return;
      if (event.target.closest("button, input, textarea, select, label, .phrase-bar")) return;
      const now = Date.now();
      if (now - lastSingleTouchAt < 320) event.preventDefault();
      lastSingleTouchAt = now;
    },
    { passive: false }
  );

  document.addEventListener("compositionend", (event) => {
    if (event.target.matches(".comm-note")) {
      uppercaseLatinInput(event.target);
    }
    if (event.target.matches("#sectorFrom, #sectorTo")) {
      event.target.dataset.composing = "";
      event.target.value = event.target.value.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 4);
    }
    save();
  });

  document.addEventListener("compositionstart", (event) => {
    if (!event.target.matches("#sectorFrom, #sectorTo")) return;
    event.target.dataset.composing = "1";
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches(".vhf-rest")) {
      event.target.value = formatVhfInput(event.target.value);
      $(".vhf-display", event.target.closest(".vhf-field")).value = formatVhf(event.target.value);
    }

    if (event.target.matches(".wind-dir, .wind-speed")) {
      event.target.value = digitsOnly(event.target.value, 4);
    }

    if (event.target.matches("#aircraftNo, #flightNo")) {
      event.target.value = event.target.value.replace(/\D/g, "").slice(0, event.target.maxLength || 4);
    }

    if (event.target.matches("#sectorFrom, #sectorTo")) {
      if (event.target.dataset.composing === "1") return;
      event.target.value = event.target.value.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 4);
    }

    if (event.target.matches(".comm-note")) {
      preferUppercaseKeyboard(event.target);
      uppercaseLatinInput(event.target);
    }

    if (event.target.matches("#captain")) updateCaptainFn();
    if (event.target.matches("#actualFuel, .fuel-input")) recalculate();
    if (event.target.closest(".check-card")) updateCheckTime(event.target.closest(".check-card"));
    save();
    updatePageControls();
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches(".vhf-rest")) {
      event.target.value = completeVhfInput(event.target.value);
      $(".vhf-display", event.target.closest(".vhf-field")).value = formatVhf(event.target.value);
      save();
      return;
    }

    if (!event.target.closest(".check-card")) return;
    updateCheckTime(event.target.closest(".check-card"));
    save();
  });

  document.addEventListener("focusout", (event) => {
    if (!event.target.matches("#captainFn")) return;
    persistCustomLicense($("#captain").value, event.target.value);
    save();
  });

  document.addEventListener("click", (event) => {
    if (event.target.matches(".phrase-button")) {
      if (Date.now() - lastPhraseTouchAt > 500) activatePhraseButton(event.target);
      return;
    }

    if (event.target.matches("[data-record-id]")) {
      loadFlightRecord(event.target.dataset.recordId, event.target.dataset.localRecord === "1").catch(() => {
        window.alert("载入失败");
      });
      return;
    }

    if (!event.target.matches(".clear-check")) return;
    const card = event.target.closest(".check-card");
    $$("input", card).forEach((input) => {
      input.value = "";
    });
    $(".check-time", card).value = "";
    setCheckTime($(".check-time", card), "");
    recalculate();
    save();
  });

  window.addEventListener("online", () => {
    retryPendingSync();
  });
  window.addEventListener("focus", retryPendingSync);
  window.addEventListener("pageshow", retryPendingSync);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) retryPendingSync();
  });
  window.setInterval(retryPendingSync, 30000);
}

async function boot() {
  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  createRows();
  await loadRemoteLicenseArchive();
  restore();
  bindEvents();
  retryPendingSync();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

boot();
