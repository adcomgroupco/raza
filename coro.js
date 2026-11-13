const BASE_INVESTMENT = 5000;
const EXCHANGE_DOP = 63;

// Costo por depósito sobre toda la inversión de la campaña (incluye la fase de expectativa).
const PROJECTED_LAUNCH_CPA = { meta: 51.75, tiktok: 69 };
const PROJECTED_SPLIT = { meta: 0.6, tiktok: 0.4 };
const EXPECTATION_SHARE = 0.2;
const REAL = {
  window: "1 al 12 de noviembre",
  meta: { spend: 2640, deposits: 306 },
  tiktok: { spend: 2078711 / 3500, deposits: 123 }
};

const SATURATION = {
  linear: { label: "Regla de 3", exponent: 1 },
  soft: { label: "Suave", exponent: 0.85 },
  medium: { label: "Media", exponent: 0.75 },
  strong: { label: "Fuerte", exponent: 0.6 }
};

const DEFAULTS = { investment: BASE_INVESTMENT, deposit: 1500, target: 0.10, saturation: "medium", curve: "real" };
const state = { ...DEFAULTS };

const usd = new Intl.NumberFormat("es-DO", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat("es-DO", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const integer = new Intl.NumberFormat("es-DO", { maximumFractionDigits: 0 });
const oneDecimal = new Intl.NumberFormat("es-DO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const dop = value => `RD$${integer.format(value)}`;
const pct = value => `${integer.format(value * 100)}%`;
const $ = selector => document.querySelector(selector);

const projectedCpa = (() => {
  const perDollar = PROJECTED_SPLIT.meta / PROJECTED_LAUNCH_CPA.meta + PROJECTED_SPLIT.tiktok / PROJECTED_LAUNCH_CPA.tiktok;
  return 1 / (perDollar * (1 - EXPECTATION_SHARE));
})();
const realMetaCpa = REAL.meta.spend / REAL.meta.deposits;
const realTiktokCpa = REAL.tiktok.spend / REAL.tiktok.deposits;
const realCpa = (REAL.meta.spend + REAL.tiktok.spend) / (REAL.meta.deposits + REAL.tiktok.deposits);

const depositUsd = () => state.deposit / EXCHANGE_DOP;
const exponent = () => SATURATION[state.saturation].exponent;

// Retornos decrecientes: el costo por depósito de cada escenario vale para US$5.000;
// por encima cada dólar adicional rinde menos y por debajo rinde algo más.
function depositsAt(cpaAtBase, investment) {
  return BASE_INVESTMENT / cpaAtBase * Math.pow(investment / BASE_INVESTMENT, exponent());
}

function scenarios() {
  const investment = state.investment;
  const targetCpa = depositUsd() / (1 + state.target);
  const build = (deposits, cpa) => {
    const value = deposits * depositUsd();
    return { deposits, cpa: cpa ?? investment / deposits, valueUsd: value, valueDop: value * EXCHANGE_DOP, ratio: value / investment };
  };
  return {
    projected: build(depositsAt(projectedCpa, investment)),
    target: build(investment / targetCpa, targetCpa),
    real: build(depositsAt(realCpa, investment))
  };
}

const SCENARIO_COPY = {
  projected: {
    tag: "Escenario 1", title: "Proyección inicial", color: "var(--serie-2)",
    how: "Costos del flow con 15% extra por la fricción de la boletería, repartidos sobre toda la inversión, incluida la fase de expectativa."
  },
  target: {
    tag: "Escenario 2", title: "Objetivo de retorno", color: "var(--serie-1)",
    how: "El costo máximo por depósito para que lo depositado supere la inversión en el porcentaje objetivo."
  },
  real: {
    tag: "Escenario 3", title: "Costo real de hoy", color: "var(--serie-3)",
    how: `Promedio real de Meta y TikTok del ${REAL.window}: pauta siempre activa, sin boletería y medido por las plataformas.`
  }
};

function setPressed(selector, key) {
  document.querySelectorAll(selector).forEach(button => {
    const active = button.dataset[key] === state[key];
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active);
  });
}

function renderInputs() {
  $("#printStamp").textContent = `Inversión ${usd.format(state.investment)} · depósito promedio ${dop(state.deposit)} (${usd2.format(depositUsd())}) · objetivo de retorno +${pct(state.target)} · retornos decrecientes: ${SATURATION[state.saturation].label.toLowerCase()} · tasa RD$${EXCHANGE_DOP} por dólar.`;
  $("#investmentValue").textContent = usd.format(state.investment);
  $("#depositValue").textContent = `${dop(state.deposit)} · ${usd2.format(depositUsd())}`;
  $("#targetValue").textContent = `+${pct(state.target)}`;
  setPressed("[data-saturation]", "saturation");
  setPressed("[data-curve]", "curve");
}

function renderCards(result) {
  const target = 1 + state.target;
  const scale = Math.max(target, ...Object.values(result).map(item => item.ratio)) * 1.05;
  $("#scenarioCards").innerHTML = Object.entries(SCENARIO_COPY).map(([id, copy]) => {
    const item = result[id];
    const reached = item.ratio >= target - 1e-9;
    let verdict;
    if (id === "target") {
      const times = result.projected.cpa / item.cpa;
      verdict = `Pide un costo por depósito ${oneDecimal.format(times)} veces menor que la proyección inicial.`;
    } else {
      verdict = reached ? `Supera el objetivo de +${pct(state.target)}.` : `No alcanza el objetivo de +${pct(state.target)}.`;
    }
    return `<article class="co-card" style="--tone:${copy.color}">
      <header><span>${copy.tag}</span><h3>${copy.title}</h3></header>
      <dl class="co-card-figures">
        <div><dt>${id === "target" ? "Costo máximo por depósito" : "Costo por depósito"}</dt><dd>${usd2.format(item.cpa)}</dd></div>
        <div><dt>Depósitos (FTD)</dt><dd>${integer.format(item.deposits)}</dd></div>
        <div><dt>Valor depositado</dt><dd>${dop(item.valueDop)}<small>${usd.format(item.valueUsd)}</small></dd></div>
      </dl>
      <div class="co-meter" role="img" aria-label="Lo depositado equivale al ${pct(item.ratio)} de la inversión; el objetivo es ${pct(target)}">
        <i style="width:${item.ratio / scale * 100}%"></i><b style="left:${target / scale * 100}%"></b><em style="left:${1 / scale * 100}%"></em>
      </div>
      <p class="co-ratio"><strong>${pct(item.ratio)}</strong> de la inversión vuelve en depósitos</p>
      <p class="co-verdict ${reached ? "is-pos" : "is-neg"}">${verdict}</p>
      <p class="co-how">${copy.how}</p>
    </article>`;
  }).join("");
}

function renderSummary(result) {
  const target = 1 + state.target;
  $("#simSummary").innerHTML = Object.entries(SCENARIO_COPY).map(([id, copy]) => {
    const item = result[id];
    const reached = item.ratio >= target - 1e-9;
    return `<div class="co-sim-tile" style="--tone:${copy.color}">
      <span>${copy.tag} · ${copy.title}</span>
      <strong>${integer.format(item.deposits)} depósitos</strong>
      <small>${usd2.format(item.cpa)} por depósito · <b class="${reached ? "is-pos" : "is-neg"}">${pct(item.ratio)}</b> de la inversión vuelve</small>
    </div>`;
  }).join("");
}

function renderBars(result) {
  const rows = Object.keys(SCENARIO_COPY).map(id => [id, result[id]]);
  const max = Math.max(state.investment * (1 + state.target), ...rows.map(([, item]) => item.valueUsd)) * 1.18;
  const width = 1100, left = 170, right = 24, rowHeight = 56, top = 34;
  const plot = width - left - right;
  const height = top + rows.length * rowHeight + 34;
  const x = value => left + value / max * plot;
  const invX = x(state.investment);
  const targetX = x(state.investment * (1 + state.target));
  const bars = rows.map(([id, item], index) => {
    const y = top + index * rowHeight;
    const end = x(item.valueUsd);
    const label = `${usd.format(item.valueUsd)} · ${pct(item.ratio)}`;
    const inside = end - left > 220 && end > targetX + 220;
    const outsideX = end < targetX + 4 ? Math.max(end, targetX) + 10 : end + 10;
    return `<text x="${left - 12}" y="${y + 23}" class="co-axis-label co-strong" text-anchor="end">${SCENARIO_COPY[id].title}</text>
      <rect x="${left}" y="${y + 6}" width="${Math.max(end - left, 2)}" height="26" rx="4" style="fill:${SCENARIO_COPY[id].color}"/>
      <text x="${inside ? end - 10 : outsideX}" y="${y + 24}" class="co-bar-value ${inside ? "co-on-bar" : ""}" text-anchor="${inside ? "end" : "start"}">${label}</text>`;
  }).join("");
  $("#valueChart").innerHTML = `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
    <line x1="${invX}" y1="${top - 6}" x2="${invX}" y2="${height - 26}" class="co-line-invest"/>
    <text x="${invX}" y="${height - 8}" class="co-axis-label" text-anchor="middle">Inversión ${usd.format(state.investment)}</text>
    <line x1="${targetX}" y1="${top - 6}" x2="${targetX}" y2="${height - 26}" class="co-line-target"/>
    <text x="${targetX}" y="${top - 14}" class="co-axis-label" text-anchor="middle">Objetivo +${pct(state.target)}</text>
    ${bars}
  </svg>`;
  $("#valueChart").setAttribute("aria-label", rows.map(([id, item]) => `${SCENARIO_COPY[id].title}: ${usd.format(item.valueUsd)} depositados, ${pct(item.ratio)} de la inversión`).join(". "));
}

function renderCurve() {
  const cpaAtBase = state.curve === "real" ? realCpa : projectedCpa;
  const color = SCENARIO_COPY[state.curve].color;
  const maxInvestment = 20000;
  const points = Array.from({ length: 81 }, (_, i) => 250 * i);
  const curve = points.map(inv => [inv, inv ? depositsAt(cpaAtBase, inv) : 0]);
  const linear = points.map(inv => [inv, inv / cpaAtBase]);
  const needed = points.map(inv => [inv, inv * (1 + state.target) / depositUsd()]);
  const rawMax = Math.max(...curve.map(p => p[1]), ...linear.map(p => p[1]), ...needed.map(p => p[1]));
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawMax / 4)));
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10].map(f => f * magnitude).find(v => v * 4 >= rawMax);
  const maxY = step * 4;
  const width = 1100, height = 380, left = 64, right = 20, top = 24, bottom = 50;
  const x = inv => left + inv / maxInvestment * (width - left - right);
  const y = val => top + (height - top - bottom) * (1 - val / maxY);
  const path = series => series.map(([a, b], i) => `${i ? "L" : "M"}${x(a).toFixed(1)},${y(b).toFixed(1)}`).join(" ");
  const ticksX = [0, 5000, 10000, 15000, 20000].map(inv => `<text x="${x(inv)}" y="${height - 28}" class="co-axis-label" text-anchor="middle">${usd.format(inv)}</text>`).join("");
  const ticksY = [0, .25, .5, .75, 1].map(r => `<line x1="${left}" y1="${y(maxY * r)}" x2="${width - right}" y2="${y(maxY * r)}" class="co-grid"/><text x="${left - 8}" y="${y(maxY * r) + 4}" class="co-axis-label" text-anchor="end">${integer.format(maxY * r)}</text>`).join("");
  const current = depositsAt(cpaAtBase, state.investment);
  $("#curveChart").innerHTML = `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
    ${ticksY}${ticksX}
    <path d="${path(needed)}" class="co-line-target"/>
    <path d="${path(linear)}" class="co-line-linear" style="stroke:${color}"/>
    <path d="${path(curve)}" class="co-line-curve" style="stroke:${color}"/>
    <line x1="${x(state.investment)}" y1="${y(current)}" x2="${x(state.investment)}" y2="${y(0)}" class="co-grid"/>
    <circle cx="${x(state.investment)}" cy="${y(current)}" r="6" style="fill:${color}" class="co-dot"/>
    <text x="${x(state.investment)}" y="${y(current) - 14}" class="co-bar-value" text-anchor="middle">${integer.format(current)} depósitos</text>
    <text x="${(left + width - right) / 2}" y="${height - 6}" class="co-axis-label" text-anchor="middle">Inversión en la campaña</text>
  </svg>`;
  $("#curveChart").setAttribute("aria-label", `Con ${usd.format(state.investment)} se esperan ${integer.format(current)} depósitos con retornos decrecientes, frente a ${integer.format(state.investment / cpaAtBase)} con regla de 3.`);

  $("#marginalBody").innerHTML = [2500, 5000, 10000, 15000, 20000].map(inv => {
    const deposits = depositsAt(cpaAtBase, inv);
    const average = inv / deposits;
    const ratio = deposits * depositUsd() / inv;
    return `<tr><td>${usd.format(inv)}</td><td class="tnum">${integer.format(inv / cpaAtBase)}</td><td class="tnum"><strong>${integer.format(deposits)}</strong></td>
      <td class="tnum">${usd2.format(average)}</td><td class="tnum">${usd2.format(average / exponent())}</td><td class="tnum ${ratio >= 1 + state.target ? "co-pos" : "co-neg"}">${pct(ratio)}</td></tr>`;
  }).join("");
  $("#curveNote").textContent = state.saturation === "linear"
    ? "Con regla de 3, cada dólar rinde igual sin importar cuánto se invierta. En la práctica no pasa así: la audiencia más dispuesta responde primero y las siguientes cuestan más."
    : `Con saturación ${SATURATION[state.saturation].label.toLowerCase()}, duplicar la inversión multiplica los depósitos por ${oneDecimal.format(Math.pow(2, exponent()))} y no por 2. La curva es un supuesto ilustrativo, no una medición: se calibra con los resultados reales de la campaña.`;
}

function renderReal() {
  $("#realMeta").textContent = `${usd2.format(realMetaCpa)} por depósito · ${integer.format(REAL.meta.deposits)} depósitos`;
  $("#realTiktok").textContent = `${usd2.format(realTiktokCpa)} por depósito · ${integer.format(REAL.tiktok.deposits)} depósitos`;
  $("#realBlend").textContent = `${usd2.format(realCpa)} por depósito`;
  $("#heroReal").textContent = usd2.format(realCpa);
}

function render() {
  const result = scenarios();
  renderInputs();
  renderCards(result);
  renderSummary(result);
  renderBars(result);
  renderCurve();
}

function bind() {
  $("#investment").addEventListener("input", event => { state.investment = Number(event.target.value); render(); });
  $("#deposit").addEventListener("input", event => { state.deposit = Number(event.target.value); render(); });
  $("#target").addEventListener("input", event => { state.target = Number(event.target.value) / 100; render(); });
  document.querySelectorAll("[data-saturation]").forEach(button => button.addEventListener("click", () => { state.saturation = button.dataset.saturation; render(); }));
  document.querySelectorAll("[data-curve]").forEach(button => button.addEventListener("click", () => { state.curve = button.dataset.curve; render(); }));
  document.querySelectorAll(".co-download").forEach(button => button.addEventListener("click", () => {
    const title = document.title;
    document.title = "Raza.do - El coro pal Festival - escenarios";
    window.print();
    document.title = title;
  }));
  $("#reset").addEventListener("click", () => {
    Object.assign(state, DEFAULTS);
    $("#investment").value = DEFAULTS.investment;
    $("#deposit").value = DEFAULTS.deposit;
    $("#target").value = DEFAULTS.target * 100;
    render();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderReal();
  bind();
  render();
});
