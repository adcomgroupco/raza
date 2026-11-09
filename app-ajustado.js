const TRM_COP = 3500;
const PLAN_TOTAL = 655000;

const MONTHS = [
  { id: "oct", label: "Octubre", short: "OCT", range: "12 a 31 oct · real", stage: "Lanzamiento" },
  { id: "nov", label: "Noviembre", short: "NOV", range: "1 a 30 nov · real al 9/11", stage: "Mantenimiento" },
  { id: "dic", label: "Diciembre", short: "DIC", range: "1 a 31 dic", stage: "Mantenimiento" },
  { id: "ene", label: "Enero", short: "ENE", range: "1 a 31 ene", stage: "Mantenimiento" },
  { id: "feb", label: "Febrero", short: "FEB", range: "1 a 28 feb", stage: "Mantenimiento" }
];

// budgets = inversión ajustada (oct real, nov real + proyección); plan = flow original; real = gasto leído al 9/11.
const CHANNELS = [
  {
    id: "meta-reach", name: "Meta Reach", initials: "MR", objective: "Awareness",
    action: "Conocer, recordar y buscar la marca", verticals: ["Marca", "Deportivas", "Casino", "Lotería", "Virtuales"],
    kpi: "Alcance 18+ y frecuencia", secondary: "Reach único, frecuencia, VTR y búsquedas de marca",
    formats: ["Reels", "Stories", "Video 6 a 15s", "Reach & Frequency"], costType: "CPM", cost: 0.65, unit: "impresiones",
    note: "Controlar saturación y renovar creatividades cada dos semanas.", color: "#eb6834",
    plan: { oct: 54000, nov: 12000, dic: 7000, ene: 4000, feb: 4000 },
    budgets: { oct: 215, nov: 1500, dic: 1200, ene: 2500, feb: 3500 },
    real: { oct: 215, nov: 290 }
  },
  {
    id: "meta-conversion", name: "Meta Conversiones", initials: "MC", objective: "Performance",
    action: "Completar registro y primer depósito", verticals: ["Deportivas", "Casino", "Lotería", "Virtuales"],
    kpi: "Registros + FTD", secondary: "CPR, tasa registro→FTD, valor depositado y ROAS",
    formats: ["Reels", "Stories", "Feed", "Retargeting", "Deep links"], costType: "CPA FTD", cost: 45, unit: "FTD",
    registrationCost: 13.5, registrationRate: 0.30,
    note: "Principal canal de FTD. Sube como máximo 25% semanal y frena si el CPR de 7 días empeora más de 30%. CPR y CPA previos hasta validar con el backend.", color: "#2a78d6",
    plan: { oct: 33000, nov: 28000, dic: 32000, ene: 35000, feb: 37000 },
    budgets: { oct: 924, nov: 6500, dic: 8000, ene: 10000, feb: 12500 },
    real: { oct: 924, nov: 1326 }
  },
  {
    id: "tiktok-always", name: "TikTok Always-on", initials: "TT", objective: "Performance",
    action: "Completar registro y primer depósito", verticals: ["Deportivas", "Casino", "Virtuales", "Lotería"],
    kpi: "Registros + FTD", secondary: "CPR, VTR, CTR y tasa registro→FTD",
    formats: ["In-feed", "Spark Ads", "Creator whitelisting", "Retargeting"], costType: "CPA FTD", cost: 60, unit: "FTD",
    registrationCost: 15, registrationRate: 0.25,
    note: "Segundo canal de FTD. El CPR real se triplicó en la segunda semana: corregir creativos antes de subir presupuesto.", color: "#2a78d6",
    plan: { oct: 25000, nov: 17000, dic: 18000, ene: 19000, feb: 21000 },
    budgets: { oct: 258, nov: 1600, dic: 1600, ene: 2400, feb: 3200 },
    real: { oct: 258, nov: 313 }
  },
  {
    id: "tiktok-topview", name: "TikTok TopView + Prime Time", initials: "TV", objective: "Awareness",
    action: "Generar notoriedad y búsqueda de marca", verticals: ["Marca"],
    kpi: "Alcance y vistas", secondary: "Frecuencia, VTR, búsquedas de marca y visitas asistidas",
    formats: ["TopView", "Prime Time", "Teaser", "Reveal", "Manifiesto"], costType: "CPV", cost: 0.01, unit: "vistas",
    note: "Sin gasto a la fecha. Bolsa por eventos con fechas por definir: se presupuesta por mes y se ajusta al fijarlas.", color: "#eb6834",
    plan: { oct: 105000, nov: 0, dic: 0, ene: 0, feb: 0 },
    budgets: { oct: 0, nov: 15000, dic: 10000, ene: 35000, feb: 45000 },
    real: { oct: 0, nov: 0 }
  },
  {
    id: "google", name: "Google Search", initials: "GS", objective: "Performance",
    action: "Registrar y completar primer depósito", verticals: ["Deportivas", "Casino", "Lotería", "Virtuales"],
    kpi: "Registros + FTD", secondary: "CPR, CTR, CPC, share de búsqueda y tasa registro→FTD",
    formats: ["Search marca", "Genéricos", "Verticales", "Extensiones"], costType: "CPA FTD", cost: 43, unit: "FTD",
    registrationCost: 15.05, registrationRate: 0.35,
    note: "Pendiente de certificación. Se proyecta desde noviembre con rampa y se libera con la aprobación. Si no habilita, el presupuesto vuelve a la reserva.", color: "#2a78d6",
    plan: { oct: 3000, nov: 4000, dic: 5000, ene: 6000, feb: 8000 },
    budgets: { oct: 0, nov: 3000, dic: 5000, ene: 8000, feb: 10000 },
    real: { oct: 0, nov: 0 }
  },
  {
    id: "youtube", name: "YouTube", initials: "YT", objective: "Consideración",
    action: "Entender la propuesta, el respaldo y la forma de uso", verticals: ["Marca", "Deportivas", "Casino"],
    kpi: "Vistas calificadas", secondary: "VTR, alcance único, lift de búsqueda y conversiones asistidas",
    formats: ["Bumper 6s", "In-stream 15 a 30s", "Shorts", "Video Action"], costType: "CPV", cost: 0.017, unit: "vistas",
    note: "Pendiente de certificación. Sin gasto a la fecha; se proyecta desde noviembre con rampa de 3 semanas.", color: "#1baf7a",
    plan: { oct: 44000, nov: 7000, dic: 3000, ene: 2000, feb: 4000 },
    budgets: { oct: 0, nov: 5000, dic: 7000, ene: 20000, feb: 28000 },
    real: { oct: 0, nov: 0 }
  },
  {
    id: "dco-display", name: "Programática Display", initials: "PD", objective: "Consideración",
    action: "Visitar una landing relevante según el contexto", verticals: ["Deportivas", "Lotería", "Casino"],
    kpi: "Impresiones visibles", secondary: "Viewability, CTR, visitas calificadas y conversión asistida",
    formats: ["Display"], costType: "CPM", cost: 10.26, unit: "impresiones",
    note: "Es el formato programático más eficiente a la fecha. Baja gradual en diciembre.", color: "#1baf7a",
    plan: { oct: 13000, nov: 10000, dic: 10000, ene: 11000, feb: 9000 },
    budgets: { oct: 3861, nov: 16000, dic: 9000, ene: 10000, feb: 11000 },
    real: { oct: 3861, nov: 5698 }
  },
  {
    id: "dco-push", name: "Programática Push", initials: "PP", objective: "Consideración",
    action: "Entrar a la landing por momento deportivo o resultado", verticals: ["Deportivas", "Lotería"],
    kpi: "Visitas calificadas", secondary: "CTR, rebote, registro asistido y conversión asistida",
    formats: ["Push (solo con claim)"], costType: "CPC", cost: 0.8, unit: "visitas",
    note: "Mucho volumen a muy bajo costo, pero la calidad del clic no está validada: validar sesiones antes de subir.", color: "#1baf7a",
    plan: { oct: 5000, nov: 3000, dic: 4000, ene: 4000, feb: 4000 },
    budgets: { oct: 1117, nov: 1500, dic: 1000, ene: 1200, feb: 1200 },
    real: { oct: 1117, nov: 353 }
  },
  {
    id: "rich-media", name: "Rich Media", initials: "RM", objective: "Consideración",
    action: "Interactuar y explorar la propuesta", verticals: ["Marca", "Deportivas", "Casino"],
    kpi: "Interacciones", secondary: "Engagement rate, tiempo interactivo y visitas asistidas",
    formats: ["Expandibles", "Countdown", "Interactivos", "Alto impacto"], costType: "CPE", cost: 0.65, unit: "interacciones",
    note: "El CTR real (6,4%) parece inflado; validar sesiones antes de subir.", color: "#1baf7a",
    plan: { oct: 10000, nov: 3000, dic: 3000, ene: 1000, feb: 1000 },
    budgets: { oct: 3900, nov: 8500, dic: 4000, ene: 4500, feb: 5000 },
    real: { oct: 3900, nov: 3247 }
  },
  {
    id: "twitch", name: "Twitch · Streaming Ads", initials: "TW", objective: "Awareness",
    action: "Ver, escuchar e interactuar con contenido 18+", verticals: ["Deportivas", "Virtuales", "Casino"],
    kpi: "Impresiones / video", secondary: "Minutos vistos, chat engagement y clics asistidos",
    formats: ["Sponsored stream", "Creator reads", "Overlays", "Pre-roll", "Clips"], costType: "CPM", cost: 22.1, unit: "impresiones",
    note: "Streaming Ads (Twitch y Kick). Es de los formatos más caros: se acota tras el lanzamiento.", color: "#eb6834",
    plan: { oct: 8000, nov: 3000, dic: 2000, ene: 1000, feb: 1000 },
    budgets: { oct: 7150, nov: 2000, dic: 1500, ene: 2000, feb: 2500 },
    real: { oct: 7150, nov: 568 }
  },
  {
    id: "spotify", name: "Spotify", initials: "SP", objective: "Awareness",
    action: "Reconocer la marca y visitar después", verticals: ["Marca", "Deportivas"],
    kpi: "Impresiones audio / video", secondary: "Audio completion rate, reach, frecuencia y visitas asistidas",
    formats: ["Audio 30s", "Video takeover", "Sponsored session"], costType: "CPM", cost: 23.89, unit: "impresiones / audio",
    note: "Es de los formatos más caros: mantener acotado.", color: "#eb6834",
    plan: { oct: 5000, nov: 3000, dic: 1000, ene: 2000, feb: 1000 },
    budgets: { oct: 2572, nov: 2500, dic: 2000, ene: 2300, feb: 2300 },
    real: { oct: 2572, nov: 945 }
  }
];

const PROGRAMMATIC_IDS = ["dco-display", "dco-push", "rich-media", "twitch", "spotify"];
const META_IDS = ["meta-reach", "meta-conversion"];
const TIKTOK_IDS = ["tiktok-always", "tiktok-topview"];

const WEEKLY = [
  { week: "12 a 18 oct", meta: 25.04, cprMeta: 0.15, tiktokCop: 0, cprTiktokCop: null, programmatic: 956.38 },
  { week: "19 a 25 oct", meta: 339.08, cprMeta: 0.17, tiktokCop: 0, cprTiktokCop: null, programmatic: 7406.49 },
  { week: "26 oct a 1 nov", meta: 900.92, cprMeta: 0.23, tiktokCop: 1103040, cprTiktokCop: 656, programmatic: 11015.2 },
  { week: "2 a 8 nov", meta: 1214.95, cprMeta: 0.58, tiktokCop: 896960, cprTiktokCop: 2046, programmatic: 8495.99 },
  { week: "9 nov (un día)", meta: 256.99, cprMeta: 0.75, tiktokCop: 0, cprTiktokCop: null, programmatic: 1537.3 }
];

const CALENDAR = {
  oct: { calendar: "Lanzamiento el 12 de octubre. Béisbol invernal, MLB, NFL y Champions League en el flow maestro.", focus: "Real: programática desde el 16/10; Meta y TikTok arrancan con presupuestos bajos." },
  nov: { calendar: "Béisbol invernal, NFL, NBA y Champions League en el flow maestro. Black Friday por confirmar.", focus: "Real hasta el 9/11. Meta sube en escalera y entran TopView, YouTube y Google." },
  dic: { calendar: "Menor calendario deportivo; el flow maestro aún lista béisbol invernal, NFL, NBA y Champions. Navidad y cierre de año por confirmar.", focus: "Mantener, no sobreinvertir. Más peso a Lotería, Casino y Virtuales." },
  ene: { calendar: "Serie final de béisbol invernal, NFL y NBA según el flow maestro.", focus: "Escalar con el calendario y usar TopView por eventos." },
  feb: { calendar: "Serie del Caribe según el flow maestro.", focus: "Máxima presión del plan y cierre con lectura de CPA y decisión sobre la reserva." }
};

const SCENARIOS = {
  base: { label: "Base", multiplier: 1, description: "benchmark actual" },
  optimistic: { label: "Optimista", multiplier: 1.2, description: "+20% resultados" },
  pessimistic: { label: "Pesimista", multiplier: 0.8, description: "−20% resultados" },
  attribution: { label: "Plataformas", multiplier: 1, description: "CPR atribuido US$4", attribution: true }
};
const state = { month: "all", stage: "all", objective: "all", vertical: "all", scenario: "base", search: "" };
const OBJECTIVE_VISUALS = [
  { name: "Awareness", color: "#eb6834", purpose: "Instalar y amplificar" },
  { name: "Consideración", color: "#1baf7a", purpose: "Explicar y llevar tráfico" },
  { name: "Performance", color: "#2a78d6", purpose: "Generar FTD" }
];
const FUNNEL_ASSUMPTIONS = { frequency: 3.5, reachToVisit: 0.018, visitToRegistration: 0.20 };
const ATTRIBUTION_REGISTRATION_COST = 4;
const money = new Intl.NumberFormat("es-DO", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const integer = new Intl.NumberFormat("es-DO", { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("es-DO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const decimalOne = new Intl.NumberFormat("es-DO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]));
const totalFor = (channel, monthIds) => monthIds.reduce((sum, month) => sum + (channel.budgets[month] || 0), 0);
const planFor = (channel, monthIds) => monthIds.reduce((sum, month) => sum + (channel.plan[month] || 0), 0);
const realFor = (channel, monthIds) => monthIds.reduce((sum, month) => sum + (channel.real[month] || 0), 0);
const ALL_MONTH_IDS = MONTHS.map(m => m.id);
const totalAssigned = CHANNELS.reduce((sum, channel) => sum + totalFor(channel, ALL_MONTH_IDS), 0);
const reserve = PLAN_TOTAL - totalAssigned;

function visibleMonths() {
  return MONTHS.filter(month => (state.month === "all" || state.month === month.id) && (state.stage === "all" || state.stage === month.stage));
}

function filteredChannels(monthIds = visibleMonths().map(m => m.id)) {
  const query = state.search.trim().toLocaleLowerCase("es");
  return CHANNELS.filter(channel => {
    const objectiveMatch = state.objective === "all" || channel.objective === state.objective;
    const verticalMatch = state.vertical === "all" || channel.verticals.includes(state.vertical);
    const searchMatch = !query || `${channel.name} ${channel.kpi} ${channel.formats.join(" ")}`.toLocaleLowerCase("es").includes(query);
    return objectiveMatch && verticalMatch && searchMatch && totalFor(channel, monthIds) > 0;
  });
}

function isFullView() {
  return state.month === "all" && state.stage === "all" && state.objective === "all" && state.vertical === "all" && !state.search.trim();
}

function expectedResult(channel, investment) {
  if (!investment || !channel.cost) return 0;
  if (SCENARIOS[state.scenario].attribution && channel.objective === "Performance" && channel.registrationRate) {
    return investment / ATTRIBUTION_REGISTRATION_COST * channel.registrationRate;
  }
  const baseResult = channel.costType === "CPM" ? investment / channel.cost * 1000 : investment / channel.cost;
  return baseResult * SCENARIOS[state.scenario].multiplier;
}

function expectedRegistrations(channel, investment) {
  if (channel.objective !== "Performance" || !investment || !channel.registrationCost) return 0;
  if (SCENARIOS[state.scenario].attribution) return investment / ATTRIBUTION_REGISTRATION_COST;
  return investment / channel.registrationCost * SCENARIOS[state.scenario].multiplier;
}

function benchmarkLabel(channel) {
  const scenario = SCENARIOS[state.scenario];
  if (scenario.attribution && channel.objective === "Performance") {
    return `CPR atribuido · ${formatBenchmarkCost(ATTRIBUTION_REGISTRATION_COST)} · tasa reg.→FTD ${integer.format(channel.registrationRate * 100)}% (${scenario.label})`;
  }
  return `${channel.costType} · ${formatBenchmarkCost(channel.cost / scenario.multiplier)} (${scenario.label})`;
}

function resultLabel(channel, investment) {
  if (channel.objective === "Performance") {
    return `${integer.format(expectedRegistrations(channel, investment))} reg. → ${integer.format(expectedResult(channel, investment))} FTD`;
  }
  const result = expectedResult(channel, investment);
  return `${integer.format(result)} ${channel.unit}`;
}

function formatCompactMoney(value) {
  if (value >= 1000000) return `US$${decimal.format(value / 1000000)}M`;
  if (value > 0 && value < 10000) return `US$${decimalOne.format(value / 1000)}K`;
  return `US$${integer.format(value / 1000)}K`;
}

function formatBenchmarkCost(value) {
  return `US$${value < 1 ? value.toFixed(3) : decimal.format(value)}`;
}

function monthListLabel(months) {
  if (months.length === 1) return `${months[0].label} · ${months[0].range}`;
  return months.map(month => month.label).join(", ");
}

function initControls() {
  const monthFilter = $("#monthFilter");
  MONTHS.forEach(month => monthFilter.insertAdjacentHTML("beforeend", `<option value="${month.id}">${month.label} · ${month.range}</option>`));
  ["month", "stage", "objective", "vertical", "scenario"].forEach(key => {
    $(`#${key}Filter`).addEventListener("change", event => { state[key] = event.target.value; render(); });
  });
  document.querySelectorAll(".scenario-option").forEach(button => button.addEventListener("click", () => {
    state.scenario = button.dataset.scenario;
    $("#scenarioFilter").value = state.scenario;
    render();
  }));
  $("#searchFilter").addEventListener("input", event => { state.search = event.target.value; render(); });
  $("#resetFilters").addEventListener("click", resetFilters);
}

function resetFilters() {
  Object.assign(state, { month: "all", stage: "all", objective: "all", vertical: "all", scenario: "base", search: "" });
  $("#filters").reset();
  render();
}

function renderRealKpis() {
  const sumFor = ids => CHANNELS.filter(c => ids.includes(c.id)).reduce((sum, c) => sum + realFor(c, ALL_MONTH_IDS), 0);
  const programmatic = sumFor(PROGRAMMATIC_IDS);
  const meta = sumFor(META_IDS);
  const tiktok = sumFor(TIKTOK_IDS);
  const total = programmatic + meta + tiktok;
  const thousands = value => `US$${decimalOne.format(value / 1000)}K`;
  const items = [
    ["Gastado a la fecha", thousands(total), "12 oct a 9 nov"],
    ["Programática", `${integer.format(programmatic / total * 100)}% del gasto`, thousands(programmatic)],
    ["Meta", thousands(meta), `${decimal.format(meta / total * 100)}% del gasto`],
    ["TikTok", thousands(tiktok), `${decimal.format(tiktok / total * 100)}% del gasto`]
  ];
  $("#realKpis").innerHTML = items.map(([label, value, foot]) => `<div><dt>${label}</dt><dd>${value}</dd><dt>${foot}</dt></div>`).join("");
}

function renderRealVsPlan() {
  const rows = CHANNELS.map(channel => {
    const planOct = channel.plan.oct;
    const realOct = channel.real.oct;
    const ratio = planOct ? realOct / planOct : 0;
    const execution = !planOct ? "—" : !realOct
      ? `<span class="aj-muted">Sin gasto</span>`
      : `<span class="aj-meter" aria-hidden="true"><i style="width:${Math.min(ratio * 100, 100)}%;background:${channel.color}"></i></span>${integer.format(ratio * 100)}%`;
    return `<tr>
      <td><span class="table-channel"><i class="table-dot" style="background:${channel.color}"></i>${escapeHtml(channel.name)}</span></td>
      <td class="tnum">${money.format(planOct)}</td><td class="tnum">${money.format(realOct)}</td><td class="tnum">${execution}</td>
      <td class="tnum">${money.format(channel.plan.nov)}</td><td class="tnum">${money.format(channel.real.nov)}</td><td class="tnum"><strong>${money.format(channel.budgets.nov)}</strong></td>
    </tr>`;
  }).join("");
  const sum = pick => CHANNELS.reduce((total, channel) => total + pick(channel), 0);
  const planOct = sum(c => c.plan.oct);
  const realOct = sum(c => c.real.oct);
  $("#realPlanBody").innerHTML = rows + `<tr class="aj-total">
    <td><strong>Total</strong></td><td class="tnum"><strong>${money.format(planOct)}</strong></td><td class="tnum"><strong>${money.format(realOct)}</strong></td>
    <td class="tnum"><strong>${integer.format(realOct / planOct * 100)}%</strong></td><td class="tnum"><strong>${money.format(sum(c => c.plan.nov))}</strong></td>
    <td class="tnum"><strong>${money.format(sum(c => c.real.nov))}</strong></td><td class="tnum"><strong>${money.format(sum(c => c.budgets.nov))}</strong></td>
  </tr>`;
}

function renderWeekly() {
  const RISE_LIMIT = 1.3;
  $("#weeklyBody").innerHTML = WEEKLY.map((row, index) => {
    const previous = WEEKLY[index - 1];
    const previousTiktok = WEEKLY.slice(0, index).reverse().find(item => item.cprTiktokCop);
    const metaRises = previous && row.cprMeta > previous.cprMeta * RISE_LIMIT;
    const tiktokRises = previousTiktok && row.cprTiktokCop > previousTiktok.cprTiktokCop * RISE_LIMIT;
    const tiktok = row.tiktokCop ? money.format(row.tiktokCop / TRM_COP) : "—";
    const tiktokCpr = row.cprTiktokCop ? `US$${decimal.format(row.cprTiktokCop / TRM_COP)}` : "—";
    return `<tr>
      <td>${row.week}</td>
      <td class="tnum">${money.format(row.meta)}</td><td class="tnum ${metaRises ? "aj-warn" : ""}">US$${decimal.format(row.cprMeta)}</td>
      <td class="tnum">${tiktok}</td><td class="tnum ${tiktokRises ? "aj-warn" : ""}">${tiktokCpr}</td>
      <td class="tnum">${money.format(row.programmatic)}</td>
    </tr>`;
  }).join("");
}

function renderCalendar() {
  $("#calendarGrid").innerHTML = MONTHS.map(month => {
    const total = CHANNELS.reduce((sum, channel) => sum + (channel.budgets[month.id] || 0), 0);
    const plan = CHANNELS.reduce((sum, channel) => sum + (channel.plan[month.id] || 0), 0);
    const info = CALENDAR[month.id];
    return `<article class="cal-card">
      <header><strong>${month.label}</strong><span>${month.stage} · ${month.range}</span></header>
      <p class="cal-amount">${formatCompactMoney(total)}<small>plan original ${formatCompactMoney(plan)}</small></p>
      <h4>Calendario</h4><p>${escapeHtml(info.calendar)}</p>
      <h4>Foco</h4><p>${escapeHtml(info.focus)}</p>
    </article>`;
  }).join("");
}

function renderMetrics() {
  const months = visibleMonths();
  const ids = months.map(m => m.id);
  const channels = filteredChannels(ids);
  const investment = channels.reduce((sum, channel) => sum + totalFor(channel, ids), 0);
  const registrations = channels.filter(c => c.objective === "Performance").reduce((sum, channel) => sum + expectedRegistrations(channel, totalFor(channel, ids)), 0);
  const ftd = channels.filter(c => c.objective === "Performance").reduce((sum, channel) => sum + expectedResult(channel, totalFor(channel, ids)), 0);
  const performance = channels.filter(c => c.objective === "Performance").reduce((sum, channel) => sum + totalFor(channel, ids), 0);
  const share = investment / PLAN_TOTAL * 100;
  const isAttribution = SCENARIOS[state.scenario].attribution;
  const cards = [
    { label: "Inversión seleccionada", value: formatCompactMoney(investment), foot: `${decimal.format(share)}% del plan de US$655K`, accent: true },
    { label: isAttribution ? "Registros atribuidos" : "Registros esperados", value: integer.format(registrations), foot: registrations ? `${isAttribution ? "CPR atribuido" : "CPR blended"} ${money.format(performance / registrations)}` : "Solo campañas de conversión" },
    { label: isAttribution ? "FTD atribuidos" : "FTD esperados", value: integer.format(ftd), foot: isAttribution ? "Misma tasa registro→FTD por canal" : "Con CPR y CPA supuestos, sin validar" },
    { label: "Performance directo", value: formatCompactMoney(performance), foot: investment ? `${decimal.format(performance / investment * 100)}% de la selección` : "0% de la selección" },
    { label: "Canales activos", value: integer.format(channels.length), foot: months.length === 1 ? `${months[0].stage} · ${months[0].range}` : `${months.length} períodos visibles` },
    { label: "Reserva sin asignar", value: formatCompactMoney(reserve), foot: `${decimal.format(reserve / PLAN_TOTAL * 100)}% del plan · no depende de los filtros` }
  ];
  $("#metricGrid").innerHTML = cards.map(card => `<article class="metric-card ${card.accent ? "accent" : ""}"><span class="metric-label">${card.label}</span><div class="metric-value">${card.value}</div><p class="metric-foot">${card.foot}</p></article>`).join("");
  const monthText = months.length === MONTHS.length ? "Oct 2026 a Feb 2027" : monthListLabel(months) || "Sin meses";
  $("#selectionLabel").textContent = `${monthText}, ${channels.length} canales · ${state.objective === "all" ? "todos los objetivos" : state.objective}`;
  const scenario = SCENARIOS[state.scenario];
  $("#scenarioLabel").textContent = `Escenario ${scenario.label.toLocaleLowerCase("es")} · ${scenario.description} · inversión sin cambios`;
  document.querySelectorAll(".scenario-option").forEach(button => {
    const active = button.dataset.scenario === state.scenario;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active);
  });
  $("#attributionNote").hidden = !scenario.attribution;
}

function renderChart() {
  const months = visibleMonths();
  const monthIds = months.map(m => m.id);
  const channels = filteredChannels(monthIds);
  const totals = months.map(month => channels.reduce((sum, channel) => sum + channel.budgets[month.id], 0));
  const planTotals = months.map(month => channels.reduce((sum, channel) => sum + channel.plan[month.id], 0));
  const max = Math.max(...totals, 1);
  $("#chartTitle").textContent = `Distribución por medio · ${months.length === MONTHS.length ? "Plan ajustado" : monthListLabel(months) || "Sin período"}`;
  const legendObjectives = OBJECTIVE_VISUALS.filter(objective =>
    channels.some(channel => channel.objective === objective.name));
  $("#chartLegend").innerHTML = legendObjectives.map(objective =>
    `<span class="legend-item"><i class="legend-swatch" style="background:${objective.color}"></i>${escapeHtml(objective.name)}</span>`).join("");
  $("#monthlyChart").innerHTML = months.map((month, index) => {
    const segments = OBJECTIVE_VISUALS.map(objective => {
      const value = channels
        .filter(channel => channel.objective === objective.name)
        .reduce((sum, channel) => sum + channel.budgets[month.id], 0);
      if (!value) return "";
      return `<span class="bar-segment" style="height:${Math.max(value / max * 330, 2)}px;background:${objective.color}" title="${escapeHtml(objective.name)} · ${money.format(value)}"></span>`;
    }).join("");
    return `<button class="bar-group" type="button" data-month="${month.id}" aria-label="Filtrar ${month.label}, ${month.range}, etapa ${month.stage}, ${money.format(totals[index])}, plan original ${money.format(planTotals[index])}">
      <span class="bar-total">${formatCompactMoney(totals[index])}</span>
      <span class="bar-stack">${segments}</span>
      <span class="bar-label"><strong>${month.short}</strong><span>${month.stage}</span><span class="bar-range">${month.range}</span><span class="bar-range">plan ${formatCompactMoney(planTotals[index])}</span></span>
    </button>`;
  }).join("");
  $("#monthlyChart").querySelectorAll(".bar-group").forEach(button => button.addEventListener("click", () => {
    state.month = state.month === button.dataset.month ? "all" : button.dataset.month;
    state.stage = "all";
    $("#monthFilter").value = state.month;
    $("#stageFilter").value = "all";
    render();
  }));
}

function renderDistribution() {
  const ids = visibleMonths().map(month => month.id);
  const channels = filteredChannels(ids);
  const objectiveTotals = OBJECTIVE_VISUALS.map(objective => ({
    ...objective,
    investment: channels
      .filter(channel => channel.objective === objective.name)
      .reduce((sum, channel) => sum + totalFor(channel, ids), 0)
  }));
  const investment = objectiveTotals.reduce((sum, objective) => sum + objective.investment, 0);
  let cursor = 0;
  const segments = objectiveTotals.filter(objective => objective.investment > 0).map(objective => {
    const start = cursor;
    cursor += objective.investment / Math.max(investment, 1) * 100;
    return `${objective.color} ${start}% ${cursor}%`;
  });
  const donut = $("#objectiveDonut");
  donut.style.background = segments.length ? `conic-gradient(${segments.join(",")})` : "var(--sunken)";
  donut.innerHTML = `<span><strong>${formatCompactMoney(investment)}</strong><small>selección activa</small></span>`;
  donut.setAttribute("aria-label", investment
    ? objectiveTotals.filter(objective => objective.investment > 0).map(objective => `${objective.name}: ${decimal.format(objective.investment / investment * 100)}%`).join(". ")
    : "Sin inversión para la selección activa");

  $("#objectiveLegend").innerHTML = objectiveTotals.map(objective => {
    const share = investment ? objective.investment / investment * 100 : 0;
    const active = state.objective === objective.name;
    return `<button class="objective-legend-item ${active ? "is-active" : ""}" type="button" data-objective="${escapeHtml(objective.name)}" aria-pressed="${active}">
      <i style="background:${objective.color}"></i>
      <span><strong>${escapeHtml(objective.name)}</strong><small>${escapeHtml(objective.purpose)}</small></span>
      <span class="objective-value"><strong>${formatCompactMoney(objective.investment)}</strong><small>${decimal.format(share)}%</small></span>
    </button>`;
  }).join("");
  $("#objectiveLegend").querySelectorAll(".objective-legend-item").forEach(button => button.addEventListener("click", () => {
    state.objective = state.objective === button.dataset.objective ? "all" : button.dataset.objective;
    $("#objectiveFilter").value = state.objective;
    render();
  }));

  const ranked = channels
    .map(channel => ({ channel, investment: totalFor(channel, ids) }))
    .sort((a, b) => b.investment - a.investment);
  const visibleRank = ranked.slice(0, 6);
  const maxInvestment = Math.max(...visibleRank.map(item => item.investment), 1);
  const visibleInvestment = visibleRank.reduce((sum, item) => sum + item.investment, 0);
  $("#rankingSummary").textContent = ranked.length
    ? `Top ${visibleRank.length} · ${decimal.format(visibleInvestment / Math.max(investment, 1) * 100)}% del mix`
    : "Sin resultados";
  $("#channelRanking").innerHTML = visibleRank.map((item, index) => `
    <button class="ranking-row" type="button" data-channel="${escapeHtml(item.channel.name)}" aria-label="Filtrar ${escapeHtml(item.channel.name)}, ${money.format(item.investment)}">
      <span class="ranking-copy"><span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(item.channel.name)}</span><strong>${formatCompactMoney(item.investment)}</strong></span>
      <span class="ranking-track"><i style="width:${item.investment / maxInvestment * 100}%;background:${item.channel.color}"></i></span>
    </button>`).join("");
  $("#channelRanking").querySelectorAll(".ranking-row").forEach(button => button.addEventListener("click", () => {
    state.search = state.search === button.dataset.channel ? "" : button.dataset.channel;
    $("#searchFilter").value = state.search;
    render();
  }));
}

function formatTrendValue(value) {
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(".", ",")}K`;
  return integer.format(value);
}

function formatCompactCount(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace(".", ",")}M`;
  if (value >= 10000) return `${Math.round(value / 1000)}K`;
  return integer.format(value);
}

function renderPerformanceResults() {
  const months = visibleMonths();
  const ids = months.map(month => month.id);
  const performanceChannels = filteredChannels(ids).filter(channel => channel.objective === "Performance");
  const investment = performanceChannels.reduce((sum, channel) => sum + totalFor(channel, ids), 0);
  const registrations = performanceChannels.reduce((sum, channel) => sum + expectedRegistrations(channel, totalFor(channel, ids)), 0);
  const ftd = performanceChannels.reduce((sum, channel) => sum + expectedResult(channel, totalFor(channel, ids)), 0);
  const conversionRate = registrations ? ftd / registrations * 100 : 0;
  const isAttribution = SCENARIOS[state.scenario].attribution;
  const cpr = registrations ? investment / registrations : 0;
  const cpa = ftd ? investment / ftd : 0;
  const measuredImpressions = filteredChannels(ids)
    .filter(channel => channel.costType === "CPM")
    .reduce((sum, channel) => sum + expectedResult(channel, totalFor(channel, ids)), 0);
  const directVisits = filteredChannels(ids)
    .filter(channel => channel.unit === "visitas")
    .reduce((sum, channel) => sum + expectedResult(channel, totalFor(channel, ids)), 0);
  const visits = Math.max(registrations / FUNNEL_ASSUMPTIONS.visitToRegistration, directVisits);
  const reach = Math.max(measuredImpressions / FUNNEL_ASSUMPTIONS.frequency, visits / FUNNEL_ASSUMPTIONS.reachToVisit);
  const impressions = Math.max(measuredImpressions, reach * FUNNEL_ASSUMPTIONS.frequency);
  const reachToVisit = reach ? visits / reach * 100 : 0;

  const funnelPeriod = months.length === MONTHS.length ? "Plan ajustado" : monthListLabel(months) || "Sin período";
  $("#funnelSelection").textContent = `${funnelPeriod} · ${SCENARIOS[state.scenario].label}`;
  $("#conversionFunnel").innerHTML = `
    <div class="funnel-level funnel-impressions"><span>Impresiones modeladas</span><strong>${formatCompactCount(impressions)}</strong><small>Base de exposición de la selección</small></div>
    <div class="funnel-level funnel-reach"><span>Alcance estimado</span><strong>${formatCompactCount(reach)}</strong><small>Frecuencia blended ${decimal.format(FUNNEL_ASSUMPTIONS.frequency)}</small></div>
    <div class="funnel-level funnel-visits"><span>Visitas calificadas</span><strong>${formatCompactCount(visits)}</strong><small>${decimal.format(reachToVisit)}% alcance→visita</small></div>
    <div class="funnel-level funnel-registers"><span>Registros ${isAttribution ? "atribuidos" : "esperados"}</span><strong>${integer.format(registrations)}</strong><small>${decimal.format(visits ? registrations / visits * 100 : 0)}% visita→registro · CPR ${money.format(cpr)}</small></div>
    <div class="funnel-level funnel-ftd"><span>FTD ${isAttribution ? "atribuidos" : "esperados"}</span><strong>${integer.format(ftd)}</strong><small>${decimal.format(conversionRate)}% registro→FTD · CPA ${money.format(cpa)}</small></div>`;
  $("#conversionFunnel").setAttribute("aria-label", `${integer.format(impressions)} impresiones, ${integer.format(reach)} personas alcanzadas, ${integer.format(visits)} visitas, ${integer.format(registrations)} registros y ${integer.format(ftd)} FTD ${isAttribution ? "atribuidos" : "esperados"}.`);
  $("#funnelAssumption").textContent = isAttribution
    ? "Ventana de atribución: período después de una vista o clic en que la plataforma puede acreditar la conversión. Los totales pueden solaparse entre plataformas y no representan usuarios únicos. Supuesto: CPR atribuido US$4 y misma tasa registro→FTD por canal."
    : "Modelo direccional: frecuencia blended 3,5; hasta 1,8% alcance→visita; 20% visita→registro. Meta 30%, TikTok 25% y Google 35% registro→FTD.";

  const trend = months.map(month => ({
    month,
    registrations: performanceChannels.reduce((sum, channel) => sum + expectedRegistrations(channel, channel.budgets[month.id] || 0), 0),
    ftd: performanceChannels.reduce((sum, channel) => sum + expectedResult(channel, channel.budgets[month.id] || 0), 0)
  }));
  const chart = $("#resultsTrend");
  if (!trend.length || !performanceChannels.length) {
    const message = "No hay resultados de conversión para la selección activa.";
    chart.innerHTML = `<p class="trend-empty">${message}</p>`;
    chart.setAttribute("aria-label", message);
    $("#trendSummary").textContent = "Ajusta los filtros para volver a las campañas de conversión.";
    return;
  }

  const width = 760;
  const height = 340;
  const left = 58;
  const right = 18;
  const top = 34;
  const bottom = 54;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const rawMax = Math.max(...trend.flatMap(item => [item.registrations, item.ftd]), 1);
  const step = rawMax > 4000 ? 1000 : rawMax > 1600 ? 500 : rawMax > 700 ? 250 : 100;
  const maxValue = Math.ceil(rawMax / step) * step;
  const xFor = index => trend.length === 1 ? left + plotWidth / 2 : left + index * plotWidth / (trend.length - 1);
  const yFor = value => top + plotHeight - value / maxValue * plotHeight;
  const grid = [0, .25, .5, .75, 1].map(ratio => {
    const y = top + plotHeight - ratio * plotHeight;
    return `<line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}" class="trend-grid-line"/><text x="${left - 10}" y="${y + 4}" class="trend-axis-label" text-anchor="end">${formatTrendValue(maxValue * ratio)}</text>`;
  }).join("");
  const registrationPoints = trend.map((item, index) => `${xFor(index)},${yFor(item.registrations)}`).join(" ");
  const ftdPoints = trend.map((item, index) => `${xFor(index)},${yFor(item.ftd)}`).join(" ");
  const monthLabels = trend.map((item, index) => `<text x="${xFor(index)}" y="${height - 18}" class="trend-month" text-anchor="middle">${item.month.short}</text>`).join("");
  const registrationDots = trend.map((item, index) => `<g><circle cx="${xFor(index)}" cy="${yFor(item.registrations)}" r="5" class="trend-dot trend-dot-register"/><text x="${xFor(index)}" y="${Math.max(yFor(item.registrations) - 11, 15)}" class="trend-value trend-value-register" text-anchor="middle">${formatTrendValue(item.registrations)}</text><title>${item.month.label}: ${integer.format(item.registrations)} registros</title></g>`).join("");
  const ftdDots = trend.map((item, index) => `<g><circle cx="${xFor(index)}" cy="${yFor(item.ftd)}" r="5" class="trend-dot trend-dot-ftd"/><text x="${xFor(index)}" y="${Math.min(yFor(item.ftd) + 20, height - bottom - 2)}" class="trend-value trend-value-ftd" text-anchor="middle">${formatTrendValue(item.ftd)}</text><title>${item.month.label}: ${integer.format(item.ftd)} FTD</title></g>`).join("");
  chart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
    ${grid}
    <polyline points="${registrationPoints}" class="trend-line trend-line-register"/>
    <polyline points="${ftdPoints}" class="trend-line trend-line-ftd"/>
    ${registrationDots}${ftdDots}${monthLabels}
  </svg>`;
  chart.setAttribute("aria-label", trend.map(item => `${item.month.label}: ${integer.format(item.registrations)} registros y ${integer.format(item.ftd)} FTD`).join(". "));
  const first = trend[0];
  const last = trend[trend.length - 1];
  $("#trendSummary").textContent = trend.length > 1
    ? `${first.month.short}: ${integer.format(first.registrations)} registros / ${integer.format(first.ftd)} FTD → ${last.month.short}: ${integer.format(last.registrations)} registros / ${integer.format(last.ftd)} FTD.`
    : `${first.month.label}: ${integer.format(first.registrations)} registros y ${integer.format(first.ftd)} FTD esperados.`;
}

function renderChannels() {
  const months = visibleMonths();
  const ids = months.map(m => m.id);
  const channels = filteredChannels(ids).sort((a, b) => totalFor(b, ids) - totalFor(a, ids));
  $("#emptyState").hidden = channels.length > 0;
  $("#channelGrid").innerHTML = channels.map(channel => {
    const investment = totalFor(channel, ids);
    const maxMonth = Math.max(...MONTHS.map(month => channel.budgets[month.id]), 1);
    const mini = MONTHS.map(month => `<span class="mini-month"><i style="height:${Math.max(channel.budgets[month.id] / maxMonth * 62, 2)}px;background:${channel.color};opacity:${ids.includes(month.id) ? 1 : .2}"></i>${month.short}</span>`).join("");
    const realLine = `Oct: real ${money.format(channel.real.oct)} (plan ${money.format(channel.plan.oct)}) · 1 a 9 nov: real ${money.format(channel.real.nov)} (plan de noviembre ${money.format(channel.plan.nov)}).`;
    return `<details class="channel-card">
      <summary>
        <span class="channel-card-top"><span class="channel-icon" style="background:${channel.color}">${channel.initials}</span></span>
        <h3>${escapeHtml(channel.name)}</h3><p class="channel-objective">${escapeHtml(channel.action)}</p>
        <span class="channel-numbers"><div><span>Inversión ajustada</span><strong>${money.format(investment)}</strong></div><div><span>${escapeHtml(channel.kpi)}</span><strong>${escapeHtml(resultLabel(channel, investment))}</strong></div></span>
        <span class="channel-expand">Ver estructura y formatos<svg class="ico ico-mas" aria-hidden="true"><use href="#i-mas"></use></svg><svg class="ico ico-menos" aria-hidden="true"><use href="#i-menos"></use></svg></span>
      </summary>
      <div class="channel-details">
        <h4>Formatos</h4><div class="format-list">${channel.formats.map(format => `<span class="format-chip">${escapeHtml(format)}</span>`).join("")}</div>
        <h4>Inversión mensual ajustada</h4><div class="mini-months">${mini}</div>
        <h4>Real y plan original</h4><p>${escapeHtml(realLine)}</p>
        <h4>KPI secundario</h4><p>${escapeHtml(channel.secondary)}</p>
        <h4>Benchmark del escenario</h4><p>${escapeHtml(benchmarkLabel(channel))}</p>
        <h4>Nota</h4><p>${escapeHtml(channel.note)}</p>
      </div>
    </details>`;
  }).join("");
}

function renderTable() {
  const ids = visibleMonths().map(m => m.id);
  const channels = filteredChannels(ids).sort((a, b) => totalFor(b, ids) - totalFor(a, ids));
  const totalInvestment = channels.reduce((sum, channel) => sum + totalFor(channel, ids), 0);
  const totalPlan = channels.reduce((sum, channel) => sum + planFor(channel, ids), 0);
  const totalReal = channels.reduce((sum, channel) => sum + realFor(channel, ids), 0);
  const channelRows = channels.map(channel => {
    const investment = totalFor(channel, ids);
    const real = realFor(channel, ids);
    return `<tr>
      <td><span class="table-channel"><i class="table-dot" style="background:${channel.color}"></i>${escapeHtml(channel.name)}</span></td>
      <td>${escapeHtml(channel.objective)}</td><td><strong>${money.format(investment)}</strong></td>
      <td>${money.format(planFor(channel, ids))}</td><td>${real ? money.format(real) : "—"}</td>
      <td>${escapeHtml(channel.kpi)}</td><td>${escapeHtml(resultLabel(channel, investment))}</td><td>${channel.formats.slice(0, 3).map(escapeHtml).join(" · ")}</td>
    </tr>`;
  }).join("");
  const reserveRows = isFullView() ? `
    <tr class="flow-summary-row flow-summary-optimization">
      <td colspan="2"><strong>Reserva sin asignar</strong></td>
      <td><strong>${money.format(reserve)}</strong></td>
      <td colspan="5">${decimal.format(reserve / PLAN_TOTAL * 100)}% del plan; se libera por reglas de CPR y calidad de registro</td>
    </tr>
    <tr class="flow-summary-row">
      <td colspan="2"><strong>Plan total</strong></td>
      <td><strong>${money.format(PLAN_TOTAL)}</strong></td>
      <td colspan="5">Asignado ${money.format(totalInvestment)} + reserva ${money.format(reserve)}</td>
    </tr>` : "";
  const summaryRows = `
    <tr class="flow-summary-row">
      <td colspan="2"><strong>Total inversión asignada</strong></td>
      <td><strong>${money.format(totalInvestment)}</strong></td>
      <td><strong>${money.format(totalPlan)}</strong></td>
      <td><strong>${money.format(totalReal)}</strong></td>
      <td colspan="3">Suma del período y filtros seleccionados</td>
    </tr>${reserveRows}`;
  $("#flowTableBody").innerHTML = channelRows + summaryRows;
}

function render() {
  renderMetrics();
  renderDistribution();
  renderPerformanceResults();
  renderChart();
  renderChannels();
  renderTable();
}

document.addEventListener("DOMContentLoaded", () => {
  initControls();
  renderRealKpis();
  renderRealVsPlan();
  renderWeekly();
  renderCalendar();
  render();
});
