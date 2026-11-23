"use strict";

const cameras = {head: "头部", left_wrist: "左腕", right_wrist: "右腕"};
const versions = {clean: "原始视频", comp: "压缩视频"};
const fields = new Map();
const element = (id) => document.getElementById(id);

// The sample statistics are measured by the scoring service on synthetic videos.
const exampleResult = {
  mean: 0.9878993943718766,
  views: {
    head: {frames: 8, mean: 1, median: 1, p95: 1},
    left_wrist: {frames: 8, mean: 0.9757476002886605, median: 0.9763035115193043, p95: 0.9768463806537501},
    right_wrist: {frames: 8, mean: 0.9879505828269691, median: 0.988147657878617, p95: 0.9884114875091401},
  },
};

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function showMessage(id, message = "") {
  const node = element(id);
  node.textContent = message;
  node.hidden = !message;
}

function setStatus(text, kind = "") {
  const node = element("job-status");
  node.textContent = text;
  node.dataset.kind = kind;
}

function refreshControls() {
  const count = [...fields.values()].filter(field => field.file).length;
  element("file-count").textContent = count + " / 6 个文件";
  element("submit-job").disabled = count !== fields.size;
}

function clearResult() {
  element("request-preview").hidden = true;
  element("results").hidden = true;
  element("sample-detail").hidden = true;
  element("sample-frames").open = false;
  element("result-empty").hidden = false;
  setStatus("待计算");
}

function setFile(field, file) {
  if (file && (!/\.(mp4|mov)$/i.test(file.name) || file.size === 0)) {
    showMessage("file-error", field.label + "需要非空的 MP4 或 MOV 文件。");
    field.input.value = "";
    return;
  }
  clearResult();
  showMessage("file-error");
  field.file = file;
  field.slot.classList.toggle("selected", Boolean(file));
  field.name.textContent = file ? file.name : "选择文件";
  field.name.title = file ? file.name : "";
  field.icon.textContent = file ? "✓" : "+";
  field.meta.hidden = !file;
  field.size.textContent = file ? (file.size / 1048576).toLocaleString("zh-CN", {maximumFractionDigits: 2}) + " MiB" : "";
  field.input.setAttribute("aria-label", field.label + (file ? "，已选 " + file.name + "，点击更换" : "，选择文件"));
  if (!file) field.input.value = "";
  refreshControls();
}

function addFileField(row, camera, version) {
  const key = camera + "_" + version;
  const label = cameras[camera] + versions[version];
  const slot = make("div", "file-slot");
  const control = make("label", "file-control");
  const icon = make("span", "file-icon", "+");
  icon.setAttribute("aria-hidden", "true");
  const name = make("span", "file-name", "选择文件");
  const input = make("input");
  input.type = "file";
  input.name = key;
  input.id = key;
  input.accept = ".mp4,.mov,video/mp4,video/quicktime";
  input.setAttribute("aria-label", label + "，选择文件");
  control.htmlFor = key;
  control.append(icon, name, input);
  const meta = make("div", "slot-meta");
  meta.hidden = true;
  const size = make("span");
  const remove = make("button", "remove-file", "移除");
  remove.type = "button";
  remove.setAttribute("aria-label", "移除" + label);
  meta.append(size, remove);
  slot.append(control, meta);
  row.append(slot);

  const field = {slot, input, icon, name, meta, size, remove, label, file: null};
  fields.set(key, field);
  input.addEventListener("change", () => {
    if (input.files.length) setFile(field, input.files[0]);
  });
  remove.addEventListener("click", () => {
    setFile(field, null);
    input.focus();
  });
  slot.addEventListener("dragover", (event) => {
    event.preventDefault();
    slot.classList.add("dragging");
  });
  slot.addEventListener("dragleave", () => slot.classList.remove("dragging"));
  slot.addEventListener("drop", (event) => {
    event.preventDefault();
    slot.classList.remove("dragging");
    if (event.dataTransfer.files.length !== 1) {
      showMessage("file-error", "每个位置请放入一段视频。");
      return;
    }
    setFile(field, event.dataTransfer.files[0]);
  });
}

function buildMatrix() {
  const matrix = element("video-matrix");
  const labels = make("div", "column-head");
  labels.setAttribute("aria-hidden", "true");
  labels.append(make("span", "", "视角"), ...Object.values(versions).map((label) => make("span", "", label)));
  matrix.append(labels);
  for (const [camera, name] of Object.entries(cameras)) {
    const row = make("div", "view-row");
    row.append(make("span", "view-label", name));
    for (const version of Object.keys(versions)) addFileField(row, camera, version);
    matrix.append(row);
  }
  refreshControls();
}

function metricCategory(metric) {
  if (metric.category) return metric.category;
  // Older servers return only the original group.
  if (metric.group === "全图画质") return "traditional";
  if (metric.group === "闭环任务") return "key";
  return "proxy";
}

function metricItem(metric) {
  const item = make("details", "metric-item");
  const summary = make("summary");
  const status = make("span", metric.available ? "availability ready" : "availability",
    metric.available ? "可计算" : "接口已预留");
  summary.append(make("span", "metric-name", metric.name), status);

  const detail = make("div", "metric-detail");
  const facts = make("dl", "metric-facts");
  const entries = [
    ["判读方向", metric.direction],
    ["用途", metric.purpose],
    ["所需资料", metric.requires?.join("、")],
    ["接口标识", metric.id],
  ];
  for (const [label, value] of entries) {
    if (value) facts.append(make("dt", "", label), make("dd", "", value));
  }
  detail.append(make("p", "", metric.description), facts);
  item.append(summary, detail);
  return item;
}

function renderCatalog(metrics) {
  for (const group of document.querySelectorAll("#metric-list [data-category]")) {
    const members = metrics.filter(metric => metricCategory(metric) === group.dataset.category);
    group.querySelector(".metric-list").replaceChildren(...members.map(metricItem));
    group.querySelector(".category-count").textContent = members.length + " 项";
  }
  const ready = metrics.filter((metric) => metric.available).length;
  element("catalog-count").textContent = ready + " 项可计算 · " + (metrics.length - ready) + " 项预留";
  element("metric-list").hidden = false;
  showMessage("catalog-message");
  // The live catalogue may finish loading after the browser's initial fragment jump.
  const anchor = element(location.hash.slice(1));
  if (anchor?.matches(".metric-category, .category-heading h3")) anchor.scrollIntoView();
}

function renderResults(result) {
  if (!Number.isFinite(result?.mean) || !result.views) throw new Error("结果格式异常，缺少三视角统计。");
  const rows = document.createDocumentFragment();
  for (const [camera, label] of Object.entries(cameras)) {
    const view = result.views[camera];
    if (!view || !Number.isInteger(view.frames) || view.frames <= 0 ||
        ![view.mean, view.median, view.p95].every(Number.isFinite)) {
      throw new Error(label + "的计算结果不完整。");
    }
    const row = make("tr");
    const header = make("th", "", label);
    header.scope = "row";
    row.append(header, make("td", "", view.frames.toLocaleString("zh-CN")));
    for (const stat of [view.mean, view.median, view.p95]) row.append(make("td", "", stat.toFixed(4)));
    rows.append(row);
  }
  element("score-rows").replaceChildren(rows);
  element("mean-score").textContent = result.mean.toFixed(4);
  element("result-empty").hidden = true;
  element("request-preview").hidden = true;
  element("sample-detail").hidden = false;
  element("results").hidden = false;
  setStatus("合成样例", "done");
}

function showSample() {
  renderResults(exampleResult);
}

function showSampleView(camera) {
  for (const button of document.querySelectorAll("[data-view]")) {
    button.setAttribute("aria-pressed", String(button.dataset.view === camera));
  }
  for (const version of Object.keys(versions)) {
    const image = element(version + "-preview");
    image.src = "./samples/" + camera + "_" + version + ".png";
    image.alt = cameras[camera] + versions[version] + "合成样例首帧";
  }
}

function showRequest(event) {
  event.preventDefault();
  if ([...fields.values()].some(field => !field.file)) return;
  const rows = document.createDocumentFragment();
  for (const [key, field] of fields) {
    const row = make("tr");
    const header = make("th", "", key);
    header.scope = "row";
    row.append(header, make("td", "", field.file.name));
    rows.append(row);
  }
  clearResult();
  showMessage("file-error");
  element("request-rows").replaceChildren(rows);
  element("result-empty").hidden = true;
  element("request-preview").hidden = false;
  setStatus("提交预览", "active");
}

function openAnchor() {
  if (location.hash === "#demo") showSample();
  if (location.hash === "#api") element("api").open = true;
}

element("evaluation-form").addEventListener("submit", showRequest);
for (const button of document.querySelectorAll(".sample-action")) {
  button.addEventListener("click", () => {
    showSample();
    element("sample-frames").querySelector("summary").focus({preventScroll: true});
  });
}
element("close-sample").addEventListener("click", () => {
  clearResult();
  element("open-sample").focus({preventScroll: true});
});
for (const button of document.querySelectorAll("[data-view]")) {
  button.addEventListener("click", () => showSampleView(button.dataset.view));
}
element("sample-frames").addEventListener("toggle", () => {
  if (element("sample-frames").open && !element("clean-preview").getAttribute("src")) {
    showSampleView("head");
  }
});
document.querySelector('a[href="#api"]').addEventListener("click", () => { element("api").open = true; });
window.addEventListener("hashchange", openAnchor);
buildMatrix();
renderCatalog(metricCatalog);
openAnchor();
