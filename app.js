"use strict";

const example = {
  head: { name: "头部", mean: 1, median: 1, p95: 1 },
  left_wrist: { name: "左夹爪", mean: 0.9757476002886605, median: 0.9763035115193043, p95: 0.9768463806537501 },
  right_wrist: { name: "右夹爪", mean: 0.9879505828269691, median: 0.988147657878617, p95: 0.9884114875091401 },
};

const viewButtons = Array.from(document.querySelectorAll("[data-view]"));

function showView(key) {
  const view = example[key];
  for (const button of viewButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.view === key));
  }
  for (const [kind, label] of [["clean", "原片"], ["comp", "压缩片"]]) {
    const image = document.getElementById(kind + "-preview");
    image.src = "./samples/" + key + "_" + kind + ".png";
    image.alt = view.name + "视角的" + label + "首帧，合成测试图";
  }
  document.getElementById("mean-label").textContent = view.name + " · 逐帧均值";
  for (const stat of ["mean", "median", "p95"]) {
    document.getElementById(stat).textContent = view[stat].toFixed(6);
  }
}

for (const button of viewButtons) {
  button.addEventListener("click", () => showView(button.dataset.view));
}
const means = Object.values(example).map(view => view.mean);
document.getElementById("macro").textContent = (means.reduce((a, b) => a + b, 0) / means.length).toFixed(6);

function makeElement(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function buildMetric(metric) {
  const details = makeElement("details");
  const summary = makeElement("summary");
  summary.append(makeElement("span", metric.name, "metric-name"),
    makeElement("span", metric.available ? "已实现" : "接口预留", metric.available ? "state ready" : "state"));
  const body = makeElement("div", undefined, "metric-body");
  const definitions = makeElement("dl");
  const id = makeElement("dd");
  id.append(makeElement("code", metric.id));
  definitions.append(makeElement("dt", "需要准备"), makeElement("dd", metric.requires.join("、")),
    makeElement("dt", "接口标识"), id);
  body.append(makeElement("p", metric.description), definitions);
  details.append(summary, body);
  return details;
}

const catalogSummary = document.getElementById("catalog-status");
catalogSummary.textContent = metricCatalog.length + " 项指标 · " +
  metricCatalog.filter(metric => metric.available).length + " 项已实现";
const groupContainer = document.getElementById("groups");
for (const group of new Set(metricCatalog.map(metric => metric.group))) {
  const groupMetrics = metricCatalog.filter(metric => metric.group === group);
  const section = makeElement("div", undefined, "metric-group");
  const heading = makeElement("div", undefined, "group-title");
  heading.append(makeElement("h3", group), makeElement("span", groupMetrics.length + " 项"));
  section.append(heading, ...groupMetrics.map(buildMetric));
  groupContainer.append(section);
}
