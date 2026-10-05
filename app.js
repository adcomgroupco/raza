const MONTHS = [
  { id: "oct", label: "Octubre", short: "OCT", range: "desde 12 oct", stage: "Lanzamiento", focus: "Salida en vivo el 12 de octubre, Día de la Raza: máximo alcance y primeras rutas de conversión." },
  { id: "nov", label: "Noviembre", short: "NOV", range: "1 a 30 nov", stage: "Mantenimiento", focus: "Transición de consideración hacia performance." },
  { id: "dic", label: "Diciembre", short: "DIC", range: "1 a 31 dic", stage: "Mantenimiento", focus: "Conversión alrededor de eventos y momentos de alta intención." },
  { id: "ene", label: "Enero", short: "ENE", range: "1 a 31 ene", stage: "Mantenimiento", focus: "Escalar adquisición y retargeting con los aprendizajes acumulados." },
  { id: "feb", label: "Febrero", short: "FEB", range: "1 a 28 feb", stage: "Mantenimiento", focus: "Máxima presión de performance dentro del mantenimiento." }
];

const CHANNELS = [
  {
    id: "meta-reach", name: "Meta Reach", initials: "MR", role: "Support", objective: "Awareness",
    action: "Conocer, recordar y buscar la marca", verticals: ["Marca", "Deportivas", "Casino", "Lotería", "Virtuales"],
    kpi: "Alcance 18+ y frecuencia", secondary: "Reach único, frecuencia, VTR y búsquedas de marca",
    formats: ["Reels", "Stories", "Video 6 a 15s", "Reach & Frequency"], costType: "CPM", cost: 6.5, unit: "impresiones",
    note: "Controlar saturación y renovar creatividades cada dos semanas.", color: "#eb6834",
    budgets: { oct: 54000, nov: 12000, dic: 7000, ene: 4000, feb: 4000 }
  },
  {
    id: "meta-conversion", name: "Meta Conversiones", initials: "MC", role: "Core", objective: "Performance",
    action: "Completar registro y primer depósito", verticals: ["Deportivas", "Casino", "Lotería", "Virtuales"],
    kpi: "Registros + FTD", secondary: "CPR, tasa registro→FTD, valor depositado y ROAS",
    formats: ["Reels", "Stories", "Feed", "Retargeting", "Deep links"], costType: "CPA FTD", cost: 45, unit: "FTD",
    registrationCost: 13.5, registrationRate: 0.30,
    note: "Principal canal de FTD. Arranca el 12 de octubre, cuando ya se puede registrar y depositar.", color: "#2a78d6",
    budgets: { oct: 33000, nov: 28000, dic: 32000, ene: 35000, feb: 37000 }
  },
  {
    id: "tiktok-always", name: "TikTok Always-on", initials: "TT", role: "Core / Growth", objective: "Performance",
    action: "Completar registro y primer depósito", verticals: ["Deportivas", "Casino", "Virtuales", "Lotería"],
    kpi: "Registros + FTD", secondary: "CPR, VTR, CTR y tasa registro→FTD",
    formats: ["In-feed", "Spark Ads", "Creator whitelisting", "Retargeting"], costType: "CPA FTD", cost: 60, unit: "FTD",
    registrationCost: 15, registrationRate: 0.25,
    note: "Segundo canal de FTD: lenguaje local, tutorial y prueba social. Enciende con el lanzamiento.", color: "#2a78d6",
    budgets: { oct: 25000, nov: 17000, dic: 18000, ene: 19000, feb: 21000 }
  },
  {
    id: "tiktok-topview", name: "TikTok TopView + Prime Time", initials: "TV", role: "Growth", objective: "Awareness",
    action: "Generar notoriedad y búsqueda de marca", verticals: ["Marca"],
    kpi: "Alcance y vistas", secondary: "Frecuencia, VTR, búsquedas de marca y visitas asistidas",
    formats: ["TopView", "Prime Time", "Teaser", "Reveal", "Manifiesto"], costType: "CPV", cost: 0.01, unit: "vistas",
    note: "Teaser previo al lanzamiento y reveal el 12 de octubre, Día de la Raza. Sin expectativa directa de FTD.", color: "#eb6834",
    budgets: { oct: 105000, nov: 0, dic: 0, ene: 0, feb: 0 }
  },
  {
    id: "google", name: "Google Search", initials: "GS", role: "Core contingente", objective: "Performance",
    action: "Registrar y completar primer depósito", verticals: ["Deportivas", "Casino", "Lotería", "Virtuales"],
    kpi: "Registros + FTD", secondary: "CPR, CTR, CPC, share de búsqueda y tasa registro→FTD",
    formats: ["Search marca", "Genéricos", "Verticales", "Extensiones"], costType: "CPA FTD", cost: 43, unit: "FTD",
    registrationCost: 15.05, registrationRate: 0.35,
    note: "Pendiente de aprobación. Si no habilita, redistribuir 60% Meta, 25% TikTok y 15% DCO.", color: "#2a78d6",
    budgets: { oct: 3000, nov: 4000, dic: 5000, ene: 6000, feb: 8000 }
  },
  {
    id: "youtube", name: "YouTube", initials: "YT", role: "Support", objective: "Consideración",
    action: "Entender la propuesta, el respaldo y la forma de uso", verticals: ["Marca", "Deportivas", "Casino"],
    kpi: "Vistas calificadas", secondary: "VTR, alcance único, lift de búsqueda y conversiones asistidas",
    formats: ["Bumper 6s", "In-stream 15 a 30s", "Shorts", "Video Action"], costType: "CPV", cost: 0.017, unit: "vistas",
    note: "Alta presión en lanzamiento; después, secuencias educativas y retargeting.", color: "#1baf7a",
    budgets: { oct: 44000, nov: 7000, dic: 3000, ene: 2000, feb: 4000 }
  },
  {
    id: "dco-display", name: "Programática Display", initials: "PD", role: "Support", objective: "Consideración",
    action: "Visitar una landing relevante según el contexto", verticals: ["Deportivas", "Lotería", "Casino"],
    kpi: "Impresiones visibles", secondary: "Viewability, CTR, visitas calificadas y conversión asistida",
    formats: ["Display"], costType: "CPM", cost: 13, unit: "impresiones",
    note: "Formato estándar de salida. Se puede evolucionar a DCO si se decide activar personalización dinámica.", color: "#1baf7a",
    budgets: { oct: 13000, nov: 10000, dic: 10000, ene: 11000, feb: 9000 }
  },
  {
    id: "dco-push", name: "Programática Push", initials: "PP", role: "Support", objective: "Consideración",
    action: "Entrar a la landing por momento deportivo o resultado", verticals: ["Deportivas", "Lotería"],
    kpi: "Visitas calificadas", secondary: "CTR, rebote, registro asistido y conversión asistida",
    formats: ["Push (solo con claim)"], costType: "CPC", cost: 0.8, unit: "visitas",
    note: "Formato estándar de salida, activo desde el 12 de octubre. Se puede evolucionar a DCO si se decide activar personalización dinámica.", color: "#1baf7a",
    budgets: { oct: 5000, nov: 3000, dic: 4000, ene: 4000, feb: 4000 }
  },
  {
    id: "rich-media", name: "Rich Media", initials: "RM", role: "Support", objective: "Consideración",
    action: "Interactuar y explorar la propuesta", verticals: ["Marca", "Deportivas", "Casino"],
    kpi: "Interacciones", secondary: "Engagement rate, tiempo interactivo y visitas asistidas",
    formats: ["Expandibles", "Countdown", "Interactivos", "Alto impacto"], costType: "CPE", cost: 0.65, unit: "interacciones",
    note: "Countdown en expectativa y alto impacto en lanzamiento; después solo las piezas eficientes.", color: "#1baf7a",
    budgets: { oct: 10000, nov: 3000, dic: 3000, ene: 1000, feb: 1000 }
  },
  {
    id: "twitch", name: "Twitch", initials: "TW", role: "Support / Community", objective: "Awareness",
    action: "Ver, escuchar e interactuar con contenido 18+", verticals: ["Deportivas", "Virtuales", "Casino"],
    kpi: "Impresiones / video", secondary: "Minutos vistos, chat engagement y clics asistidos",
    formats: ["Sponsored stream", "Creator reads", "Overlays", "Pre-roll", "Clips"], costType: "CPM", cost: 13, unit: "impresiones",
    note: "Uso selectivo alrededor de grandes momentos deportivos y gaming.", color: "#eb6834",
    budgets: { oct: 8000, nov: 3000, dic: 2000, ene: 1000, feb: 1000 }
  },
  {
    id: "spotify", name: "Spotify", initials: "SP", role: "Support", objective: "Awareness",
    action: "Reconocer la marca y visitar después", verticals: ["Marca", "Deportivas"],
    kpi: "Impresiones audio / video", secondary: "Audio completion rate, reach, frecuencia y visitas asistidas",
    formats: ["Audio 30s", "Video takeover", "Sponsored session"], costType: "CPM", cost: 12, unit: "impresiones / audio",
    note: "Refuerzo sonoro con inversión acotada después del lanzamiento.", color: "#eb6834",
    budgets: { oct: 5000, nov: 3000, dic: 1000, ene: 2000, feb: 1000 }
  }
];

const JOURNEY = [
  { name: "Expectativa", objective: "Awareness", text: "Antes del lanzamiento: countdown y misterio para que la marca se sienta como acontecimiento.", media: "TopView · video · teasers" },
  { name: "Lanzamiento", stage: "Lanzamiento", text: "Desde el 12 de octubre, Día de la Raza: presentar quién es Raza.do, qué ofrece y por qué tiene respaldo local.", media: "Video · alcance · landings" },
  { name: "Consideración", objective: "Consideración", text: "Reducir dudas sobre registro, depósito, retiro, bonos y categorías.", media: "Tutoriales · Meta · YouTube" },
  { name: "Conversión", objective: "Performance", text: "Llevar a registro, primer depósito y primera jugada con rutas claras.", media: "Meta · TikTok · Search" },
  { name: "Recurrencia", objective: "Performance", stage: "Mantenimiento", text: "Convertir partido, sorteo, quincena y resultado en hábito.", media: "Retargeting · CRM · audiencias" },
  { name: "Comunidad", objective: "Awareness", text: "Hacer que Raza.do sea conversación mediante contenido vivo.", media: "Twitch · creadores · picks" }
];

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

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]));
const totalFor = (channel, monthIds) => monthIds.reduce((sum, month) => sum + (channel.budgets[month] || 0), 0);
const totalPlan = CHANNELS.reduce((sum, channel) => sum + totalFor(channel, MONTHS.map(m => m.id)), 0);

function visibleMonths() {
  return MONTHS.filter(month => (state.month === "all" || state.month === month.id) && (state.stage === "all" || state.stage === month.stage));
}

function filteredChannels(monthIds = visibleMonths().map(m => m.id)) {
  const query = state.search.trim().toLocaleLowerCase("es");
  return CHANNELS.filter(channel => {
    const objectiveMatch = state.objective === "all" || channel.objective === state.objective;
    const verticalMatch = state.vertical === "all" || channel.verticals.includes(state.vertical);
    const searchMatch = !query || `${channel.name} ${channel.role} ${channel.kpi} ${channel.formats.join(" ")}`.toLocaleLowerCase("es").includes(query);
    return objectiveMatch && verticalMatch && searchMatch && totalFor(channel, monthIds) > 0;
  });
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

function renderJourney() {
  $("#journey").innerHTML = JOURNEY.map((item, index) => `
    <button class="journey-card" type="button" data-objective="${item.objective || "all"}" data-stage="${item.stage || "all"}">
      <span class="journey-number"><span>0${index + 1}</span><svg class="ico" aria-hidden="true"><use href="#i-abrir"></use></svg></span>
      <span class="journey-content">
        <strong class="journey-title">${item.name}</strong>
        <span class="journey-description">${item.text}</span>
        <span class="journey-media">${item.media}</span>
      </span>
    </button>`).join("");
  $("#journey").addEventListener("click", event => {
    const card = event.target.closest(".journey-card");
    if (!card) return;
    state.objective = card.dataset.objective;
    state.stage = card.dataset.stage;
    state.month = "all";
    $("#objectiveFilter").value = state.objective;
    $("#stageFilter").value = state.stage;
    $("#monthFilter").value = "all";
    document.querySelectorAll(".journey-card").forEach(el => el.classList.toggle("is-active", el === card));
    render();
    $("#flow").scrollIntoView({ behavior: "smooth" });
  });
}

function renderMetrics() {
  const months = visibleMonths();
  const ids = months.map(m => m.id);
  const channels = filteredChannels(ids);
  const investment = channels.reduce((sum, channel) => sum + totalFor(channel, ids), 0);
  const registrations = channels.filter(c => c.objective === "Performance").reduce((sum, channel) => sum + expectedRegistrations(channel, totalFor(channel, ids)), 0);
  const ftd = channels.filter(c => c.objective === "Performance").reduce((sum, channel) => sum + expectedResult(channel, totalFor(channel, ids)), 0);
  const performance = channels.filter(c => c.objective === "Performance").reduce((sum, channel) => sum + totalFor(channel, ids), 0);
  const share = investment / totalPlan * 100;
  const isAttribution = SCENARIOS[state.scenario].attribution;
  const cards = [
    { label: "Inversión seleccionada", value: formatCompactMoney(investment), foot: `${decimal.format(share)}% del plan total`, accent: true },
    { label: isAttribution ? "Registros atribuidos" : "Registros esperados", value: integer.format(registrations), foot: registrations ? `${isAttribution ? "CPR atribuido" : "CPR blended"} ${money.format(performance / registrations)}` : "Solo campañas de conversión" },
    { label: isAttribution ? "FTD atribuidos" : "FTD esperados", value: integer.format(ftd), foot: isAttribution ? "Misma tasa registro→FTD por canal" : "Solo canales optimizables directamente" },
    { label: "Performance directo", value: formatCompactMoney(performance), foot: investment ? `${decimal.format(performance / investment * 100)}% de la selección` : "0% de la selección" },
    { label: "Canales activos", value: integer.format(channels.length), foot: months.length === 1 ? `${months[0].stage} · ${months[0].range}` : `${months.length} períodos visibles` }
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
  const max = Math.max(...totals, 1);
  $("#chartTitle").textContent = `Distribución por medio · ${months.length === MONTHS.length ? "Plan completo" : monthListLabel(months) || "Sin período"}`;
  const legendObjectives = OBJECTIVE_VISUALS.filter(objective =>
    channels.some(channel => channel.objective === objective.name));
  $("#chartLegend").innerHTML = legendObjectives.map(objective =>
    `<span class="legend-item"><i class="legend-swatch" style="background:${objective.color}"></i>${escapeHtml(objective.name)}</span>`).join("");
  $("#monthlyChart").innerHTML = months.map((month, index) => {
    // Tres segmentos por mes, uno por objetivo, no once por canal: con once
    // el lector no distingue las bandas y la barra vuelve a ser un arcoíris.
    // El detalle por canal vive en el ranking, las fichas y la tabla.
    const segments = OBJECTIVE_VISUALS.map(objective => {
      const value = channels
        .filter(channel => channel.objective === objective.name)
        .reduce((sum, channel) => sum + channel.budgets[month.id], 0);
      if (!value) return "";
      return `<span class="bar-segment" style="height:${Math.max(value / max * 330, 2)}px;background:${objective.color}" title="${escapeHtml(objective.name)} · ${money.format(value)}"></span>`;
    }).join("");
    return `<button class="bar-group" type="button" data-month="${month.id}" aria-label="Filtrar ${month.label}, ${month.range}, etapa ${month.stage}, ${money.format(totals[index])}">
      <span class="bar-total">${formatCompactMoney(totals[index])}</span>
      <span class="bar-stack">${segments}</span>
      <span class="bar-label"><strong>${month.short}</strong><span>${month.stage}</span><span class="bar-range">${month.range}</span></span>
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

  const funnelPeriod = months.length === MONTHS.length ? "Plan completo" : monthListLabel(months) || "Sin período";
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

  const trend = months.map(month => {
    const monthInvestment = performanceChannels.reduce((sum, channel) => sum + (channel.budgets[month.id] || 0), 0);
    return {
      month,
      investment: monthInvestment,
      registrations: performanceChannels.reduce((sum, channel) => sum + expectedRegistrations(channel, channel.budgets[month.id] || 0), 0),
      ftd: performanceChannels.reduce((sum, channel) => sum + expectedResult(channel, channel.budgets[month.id] || 0), 0)
    };
  });
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
    return `<details class="channel-card">
      <summary>
        <span class="channel-card-top"><span class="channel-icon" style="background:${channel.color}">${channel.initials}</span><span class="channel-role">${escapeHtml(channel.role)}</span></span>
        <h3>${escapeHtml(channel.name)}</h3><p class="channel-objective">${escapeHtml(channel.action)}</p>
        <span class="channel-numbers"><div><span>Inversión</span><strong>${money.format(investment)}</strong></div><div><span>${escapeHtml(channel.kpi)}</span><strong>${escapeHtml(resultLabel(channel, investment))}</strong></div></span>
        <span class="channel-expand">Ver estructura y formatos<svg class="ico ico-mas" aria-hidden="true"><use href="#i-mas"></use></svg><svg class="ico ico-menos" aria-hidden="true"><use href="#i-menos"></use></svg></span>
      </summary>
      <div class="channel-details">
        <h4>Formatos</h4><div class="format-list">${channel.formats.map(format => `<span class="format-chip">${escapeHtml(format)}</span>`).join("")}</div>
        <h4>Inversión mensual</h4><div class="mini-months">${mini}</div>
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
  const optimization = totalInvestment * 0.15;
  const channelRows = channels.map(channel => {
    const investment = totalFor(channel, ids);
    return `<tr>
      <td><span class="table-channel"><i class="table-dot" style="background:${channel.color}"></i>${escapeHtml(channel.name)}</span></td>
      <td>${escapeHtml(channel.role)}</td><td>${escapeHtml(channel.objective)}</td><td><strong>${money.format(investment)}</strong></td>
      <td>${escapeHtml(channel.kpi)}</td><td>${escapeHtml(resultLabel(channel, investment))}</td><td>${channel.formats.slice(0, 3).map(escapeHtml).join(" · ")}</td>
    </tr>`;
  }).join("");
  const summaryRows = `
    <tr class="flow-summary-row">
      <td colspan="3"><strong>Total inversión</strong></td>
      <td><strong>${money.format(totalInvestment)}</strong></td>
      <td colspan="3">Suma del período y filtros seleccionados</td>
    </tr>
    <tr class="flow-summary-row flow-summary-optimization">
      <td colspan="3"><strong>Total + Optimización (15%)</strong></td>
      <td><strong>${money.format(totalInvestment + optimization)}</strong></td>
      <td colspan="3">Base ${money.format(totalInvestment)} + ${money.format(optimization)} de optimización</td>
    </tr>`;
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
  renderJourney();
  render();
});
