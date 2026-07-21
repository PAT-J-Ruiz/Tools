/* ============================================================
   Patria — RPA & Support Landscape  ·  app.js
   Renders 7 slide modules + Data Editor, no frameworks, no CDN.
   ============================================================ */
(function () {
  'use strict';

  var DEFAULT = window.__DATA__ || {};

  // ---- editable slide text (defaults live here so old localStorage still works) ----
  // Each entry: { slide (group label), key, label (field label), value (default) }.
  var TEXT_FIELDS = [
    // Module 0 — Landscape flow
    { slide: 'Landscape flow', key: 'flow.eyebrow', label: 'Eyebrow', value: 'RPA & SUPPORT LANDSCAPE' },
    { slide: 'Landscape flow', key: 'flow.title', label: 'Title', value: 'RPA & Support Landscape' },
    { slide: 'Landscape flow', key: 'flow.subtitle', label: 'Subtitle', value: 'How business processes are delivered through automations, integrations and internal support' },
    { slide: 'Landscape flow', key: 'flow.areasHead', label: 'Areas column head', value: 'Business Areas' },
    { slide: 'Landscape flow', key: 'flow.areasSub', label: 'Areas column sub', value: 'Where the work originates' },
    { slide: 'Landscape flow', key: 'flow.processHead', label: 'Process column head', value: 'Process' },
    { slide: 'Landscape flow', key: 'flow.processSub', label: 'Process column sub', value: 'Automation & Integration' },
    { slide: 'Landscape flow', key: 'flow.supportHead', label: 'Support column head', value: 'Support' },
    { slide: 'Landscape flow', key: 'flow.supportSub', label: 'Support column sub', value: 'Execution & Ownership' },
    { slide: 'Landscape flow', key: 'flow.area1t', label: 'Area 1 title', value: 'Funds Operations' },
    { slide: 'Landscape flow', key: 'flow.area1d', label: 'Area 1 desc', value: 'NAV, valuation and daily close' },
    { slide: 'Landscape flow', key: 'flow.area2t', label: 'Area 2 title', value: 'Accounting' },
    { slide: 'Landscape flow', key: 'flow.area2d', label: 'Area 2 desc', value: 'Fund & corporate accounting' },
    { slide: 'Landscape flow', key: 'flow.area3t', label: 'Area 3 title', value: 'Reporting' },
    { slide: 'Landscape flow', key: 'flow.area3d', label: 'Area 3 desc', value: 'Management & regulatory reporting' },
    { slide: 'Landscape flow', key: 'flow.area4t', label: 'Area 4 title', value: 'Compliance' },
    { slide: 'Landscape flow', key: 'flow.area4d', label: 'Area 4 desc', value: 'Limits, controls and audit' },
    { slide: 'Landscape flow', key: 'flow.area5t', label: 'Area 5 title', value: 'Wealth Management' },
    { slide: 'Landscape flow', key: 'flow.area5d', label: 'Area 5 desc', value: 'Brokerage, GPI and client-facing operations' },
    { slide: 'Landscape flow', key: 'flow.rpaT', label: 'RPAs title', value: 'RPAs' },
    { slide: 'Landscape flow', key: 'flow.rpaD', label: 'RPAs desc', value: 'Automated processes executed by bots & schedulers' },
    { slide: 'Landscape flow', key: 'flow.integT', label: 'Integrations title', value: 'Integrations' },
    { slide: 'Landscape flow', key: 'flow.integD', label: 'Integrations desc', value: 'System-to-system integrations and APIs' },
    { slide: 'Landscape flow', key: 'flow.supT', label: 'Internal support title', value: 'Internal Support' },
    { slide: 'Landscape flow', key: 'flow.supD', label: 'Internal support desc', value: 'In-house teams responsible for operations and continuous support across every platform.' },
    { slide: 'Landscape flow', key: 'flow.foot', label: 'Footer', value: 'Prepared for the Head of Technology · Landscape overview' },

    // Module 1 — Executive dashboard
    { slide: 'Executive Dashboard', key: 'dash.eyebrow', label: 'Eyebrow', value: 'PROCESS & PLATFORM LANDSCAPE' },
    { slide: 'Executive Dashboard', key: 'dash.title', label: 'Title', value: 'Process & Platform Landscape' },
    { slide: 'Executive Dashboard', key: 'dash.subtitle', label: 'Subtitle', value: 'Executive dashboard: platform volume, support gaps and the immediate decision' },
    { slide: 'Executive Dashboard', key: 'dash.kpi1lbl', label: 'KPI 1 label', value: 'Inventory processes' },
    { slide: 'Executive Dashboard', key: 'dash.kpi1desc', label: 'KPI 1 desc', value: 'Automation & integration scope' },
    { slide: 'Executive Dashboard', key: 'dash.kpi2lbl', label: 'KPI 2 label', value: 'Critical processes' },
    { slide: 'Executive Dashboard', key: 'dash.kpi2desc', label: 'KPI 2 desc', value: 'Flagged high-impact in the source' },
    { slide: 'Executive Dashboard', key: 'dash.kpi3lbl', label: 'KPI 3 label', value: 'ETL & RPA processes' },
    { slide: 'Executive Dashboard', key: 'dash.kpi4lbl', label: 'KPI 4 label', value: 'Platforms without formal support' },
    { slide: 'Executive Dashboard', key: 'dash.panelPlatforms', label: 'Panel: platforms', value: 'Processes by platform' },
    { slide: 'Executive Dashboard', key: 'dash.panelSupport', label: 'Panel: support', value: 'Support heatmap' },
    { slide: 'Executive Dashboard', key: 'dash.typemix', label: 'Type mix label', value: 'Process type mix' },
    { slide: 'Executive Dashboard', key: 'dash.decisionTag', label: 'Banner tag', value: 'Decision ask' },
    { slide: 'Executive Dashboard', key: 'dash.decisionMsg', label: 'Banner message', value: 'Approve a platform-by-process support matrix — defining ownership, monitoring priorities and vendor scope across integrations and automations.' },
    { slide: 'Executive Dashboard', key: 'dash.foot', label: 'Footer', value: 'Prepared for the Head of Technology · Executive dashboard' },

    // Group slides — shared labels
    { slide: 'Automation slides (shared)', key: 'grp.eyebrow', label: 'Eyebrow', value: 'AUTOMATIONS' },
    { slide: 'Automation slides (shared)', key: 'grp.panelDrivers', label: 'Drivers panel title', value: 'Business drivers' },
    { slide: 'Automation slides (shared)', key: 'grp.panelAreas', label: 'Areas panel title', value: 'Business areas affected' },
    { slide: 'Automation slides (shared)', key: 'grp.hintCount', label: 'Panel hint', value: 'process count' },
    { slide: 'Automation slides (shared)', key: 'grp.diagHead', label: 'Diagram rail head', value: 'How it works' },
    { slide: 'Automation slides (shared)', key: 'grp.execTag', label: 'Executive banner tag', value: 'Executive message' },

    // Module 6 — Providers & Gap (vendor support model)
    { slide: 'Providers & Gap', key: 'pg.eyebrow', label: 'Eyebrow', value: 'PROVIDERS & GAP · VENDOR SUPPORT MODEL' },
    { slide: 'Providers & Gap', key: 'pg.title', label: 'Title', value: 'Providers & Gap' },
    { slide: 'Providers & Gap', key: 'pg.subtitle', label: 'Subtitle', value: 'Where development effort goes today, the coverage gap in production, and the HH needed to sustain continuity' },
    // -- Actus capacity --
    { slide: 'Providers & Gap', key: 'pg.capHead', label: 'Capacity · title', value: 'Actus capacity' },
    { slide: 'Providers & Gap', key: 'pg.capSub', label: 'Capacity · subtitle', value: 'Current contract vs. proposed expansion' },
    { slide: 'Providers & Gap', key: 'pg.capCurrent', label: 'Capacity · current HH', value: '360' },
    { slide: 'Providers & Gap', key: 'pg.capCurrentLbl', label: 'Capacity · current HH label', value: 'HH / month today' },
    { slide: 'Providers & Gap', key: 'pg.capProposed', label: 'Capacity · proposed HH', value: '550' },
    { slide: 'Providers & Gap', key: 'pg.capProposedLbl', label: 'Capacity · proposed HH label', value: 'HH / month proposed' },
    { slide: 'Providers & Gap', key: 'pg.capAdd', label: 'Capacity · added HH', value: '+190' },
    { slide: 'Providers & Gap', key: 'pg.capAddLbl', label: 'Capacity · added HH label', value: 'additional HH / month' },
    { slide: 'Providers & Gap', key: 'pg.capPct', label: 'Capacity · % increase', value: '+53%' },
    { slide: 'Providers & Gap', key: 'pg.capPctLbl', label: 'Capacity · % increase label', value: 'capacity increase' },
    { slide: 'Providers & Gap', key: 'pg.costHead', label: 'Capacity · cost title', value: 'Monthly cost view' },
    { slide: 'Providers & Gap', key: 'pg.costCurrentLbl', label: 'Cost · current label', value: 'Current' },
    { slide: 'Providers & Gap', key: 'pg.costCurrent', label: 'Cost · current', value: 'USD 17.7K' },
    { slide: 'Providers & Gap', key: 'pg.costProposedLbl', label: 'Cost · proposed label', value: 'Proposed' },
    { slide: 'Providers & Gap', key: 'pg.costProposed', label: 'Cost · proposed', value: 'USD 27.0K' },
    { slide: 'Providers & Gap', key: 'pg.costIncreaseLbl', label: 'Cost · increase label', value: 'Increase' },
    { slide: 'Providers & Gap', key: 'pg.costIncrease', label: 'Cost · increase', value: '+USD 9.3K' },
    { slide: 'Providers & Gap', key: 'pg.opexNote', label: 'Capacity · OPEX note', value: 'Additional 2026 OPEX referenced: ~USD 70K through Dec-2026.' },
    // -- HH dedication (current mix) --
    { slide: 'Providers & Gap', key: 'pg.dedHead', label: 'Dedication · title', value: 'Current HH dedication' },
    { slide: 'Providers & Gap', key: 'pg.dedSub', label: 'Dedication · subtitle', value: 'How the 360 HH/month are consumed today' },
    { slide: 'Providers & Gap', key: 'pg.dedEvoLbl', label: 'Dedication · Evolutivos label', value: 'Evolutivos' },
    { slide: 'Providers & Gap', key: 'pg.dedEvoPct', label: 'Dedication · Evolutivos %', value: '70' },
    { slide: 'Providers & Gap', key: 'pg.dedCorLbl', label: 'Dedication · Correctivos label', value: 'Correctivos' },
    { slide: 'Providers & Gap', key: 'pg.dedCorPct', label: 'Dedication · Correctivos %', value: '5' },
    { slide: 'Providers & Gap', key: 'pg.dedOndLbl', label: 'Dedication · OnDemand label', value: 'OnDemand' },
    { slide: 'Providers & Gap', key: 'pg.dedOndPct', label: 'Dedication · OnDemand %', value: '10' },
    { slide: 'Providers & Gap', key: 'pg.dedCybLbl', label: 'Dedication · Cyber label', value: 'Cyber' },
    { slide: 'Providers & Gap', key: 'pg.dedCybPct', label: 'Dedication · Cyber %', value: '15' },
    { slide: 'Providers & Gap', key: 'pg.dedNote', label: 'Dedication · note', value: 'Capacity is fully committed — there is no slack to formally absorb the unsupported platforms.' },
    // -- Support gap --
    { slide: 'Providers & Gap', key: 'pg.gapHead', label: 'Support gap · title', value: 'Support gap' },
    { slide: 'Providers & Gap', key: 'pg.gapSub', label: 'Support gap · subtitle', value: 'Production platforms & processes without formal coverage' },
    { slide: 'Providers & Gap', key: 'pg.gapWebLbl', label: 'Support gap · websites label', value: 'Websites' },
    { slide: 'Providers & Gap', key: 'pg.gapWebCount', label: 'Support gap · websites count', value: '15' },
    { slide: 'Providers & Gap', key: 'pg.gapWebNote', label: 'Support gap · websites note', value: 'Extra-official Actus support' },
    { slide: 'Providers & Gap', key: 'pg.gapHeadTpl', label: 'Support gap · headline', value: 'integrations/processes + {web} websites now in production require regularised coverage.' },
    // -- Need for more support --
    { slide: 'Providers & Gap', key: 'pg.needHead', label: 'Need · title', value: 'Need for more support' },
    { slide: 'Providers & Gap', key: 'pg.needSub', label: 'Need · subtitle', value: 'Why the additional HH matters' },
    { slide: 'Providers & Gap', key: 'pg.need1t', label: 'Need · 1 title', value: 'Key-person dependency' },
    { slide: 'Providers & Gap', key: 'pg.need1d', label: 'Need · 1 desc', value: 'The developers who keep Sensedia, n8n, Fluig and UiPath running are few and hard to replace — losing one stalls production support.' },
    { slide: 'Providers & Gap', key: 'pg.need2t', label: 'Need · 2 title', value: 'No formal AMS model' },
    { slide: 'Providers & Gap', key: 'pg.need2d', label: 'Need · 2 desc', value: 'These platforms were handed to production without a formal application-management / support model behind them.' },
    { slide: 'Providers & Gap', key: 'pg.need3t', label: 'Need · 3 title', value: 'Current scope mismatch' },
    { slide: 'Providers & Gap', key: 'pg.need3d', label: 'Need · 3 desc', value: 'The 360 HH were sized for evolutives, correctives, on-demand and cyber — not for covering the unsupported platforms.' },
    { slide: 'Providers & Gap', key: 'pg.need4t', label: 'Need · 4 title', value: 'Operational continuity' },
    { slide: 'Providers & Gap', key: 'pg.need4d', label: 'Need · 4 desc', value: 'The coverage gap creates real risk for incidents, monitoring and clean production handover.' },
    // -- Technical debt --
    { slide: 'Providers & Gap', key: 'pg.debtHead', label: 'Tech debt · title', value: 'Technical debt' },
    { slide: 'Providers & Gap', key: 'pg.debtSub', label: 'Tech debt · subtitle', value: 'Accumulated gaps that raise operational risk' },
    { slide: 'Providers & Gap', key: 'pg.debt1t', label: 'Tech debt · 1 title', value: 'Processes without alerting' },
    { slide: 'Providers & Gap', key: 'pg.debt1d', label: 'Tech debt · 1 desc', value: 'Many flows have no proactive alerts, so failures are found after the business impact — not before.' },
    { slide: 'Providers & Gap', key: 'pg.debt2t', label: 'Tech debt · 2 title', value: 'Processes without logs (n8n)' },
    { slide: 'Providers & Gap', key: 'pg.debt2d', label: 'Tech debt · 2 desc', value: 'Platforms like n8n run without proper logging or traceability, making incident root-cause analysis slow.' },
    { slide: 'Providers & Gap', key: 'pg.debt3t', label: 'Tech debt · 3 title', value: 'No development standards' },
    { slide: 'Providers & Gap', key: 'pg.debt3d', label: 'Tech debt · 3 desc', value: 'No shared standards for building and handing over automations — this deepens key-person dependency and rework.' },
    // -- Decision & executive message --
    { slide: 'Providers & Gap', key: 'pg.decTag', label: 'Decision · tag', value: 'Decision ask' },
    { slide: 'Providers & Gap', key: 'pg.decMsg', label: 'Decision · message', value: 'Approve the expanded Actus scope from 360 to 550 HH/month to regularise coverage for unsupported platforms and begin paying down technical debt.' },
    { slide: 'Providers & Gap', key: 'pg.execTag', label: 'Executive · tag', value: 'Executive message' },
    { slide: 'Providers & Gap', key: 'pg.execMsg', label: 'Executive · message', value: 'The current 360 HH model is fully consumed by evolutives, correctives, on-demand and cyber — it does not formally cover the platforms and websites now running in production. More HH is what protects operational continuity.' },
    { slide: 'Providers & Gap', key: 'pg.foot', label: 'Footer', value: 'Prepared for the Head of Technology · Providers & Gap' },

    // Module 7 — Next steps
    { slide: 'Next steps', key: 'close.eyebrow', label: 'Eyebrow', value: 'NEXT STEPS' },
    { slide: 'Next steps', key: 'close.title', label: 'Title', value: 'Where we go next' },
    { slide: 'Next steps', key: 'close.subtitle', label: 'Subtitle', value: 'Three concrete moves coming out of this landscape review' },
    { slide: 'Next steps', key: 'close.askTag', label: 'Banner tag', value: 'The ask' },
    { slide: 'Next steps', key: 'close.askMsg', label: 'Banner message', value: 'Endorse the support matrix and area-tagging effort so we can turn this inventory into an owned, monitored operating model.' },
    { slide: 'Next steps', key: 'close.foot', label: 'Footer', value: 'Prepared for the Head of Technology · Next steps' }
  ];
  var TEXT_DEFAULTS = {};
  TEXT_FIELDS.forEach(function (f) { TEXT_DEFAULTS[f.key] = f.value; });

  // ---- state: working copy (may be overridden from localStorage) ----
  var data = loadData();

  function deepClone(o) { return JSON.parse(JSON.stringify(o)); }
  function ensureText() {
    var merged = {};
    Object.keys(TEXT_DEFAULTS).forEach(function (k) { merged[k] = TEXT_DEFAULTS[k]; });
    if (data.text) Object.keys(data.text).forEach(function (k) { if (data.text[k] != null && data.text[k] !== '') merged[k] = data.text[k]; });
    data.text = merged;
  }
  function loadData() {
    // The working copy always starts from the bundled default (data.js).
    // Edits live in memory and are published back to the source on demand via
    // "Publicar a GitHub" (commits data.js to the repo) — no localStorage.
    return deepClone(DEFAULT);
  }
  var dirty = false;
  // persist() no longer touches storage; it just flags unsaved edits and
  // refreshes the publish button so the user knows there's something to send.
  function persist() {
    dirty = true;
    updateSaveButton();
  }
  // Backfill anything an older saved state (or the defaults) might miss, so the
  // rows-as-source-of-truth model always has what it needs.
  function ensureAll() {
    ensureText();
    if (!data.config) data.config = deepClone(DEFAULT.config || {});
    if (!Array.isArray(data.rows)) data.rows = deepClone(DEFAULT.rows || []);
    if (!data.mapping) data.mapping = deepClone(DEFAULT.mapping || {});
    if (!data.nextSteps) data.nextSteps = deepClone(DEFAULT.nextSteps || []);
    if (!data.noFormalSupport) data.noFormalSupport = deepClone(DEFAULT.noFormalSupport || (data.config.noFormalSupport || []));
    // authored group copy, seeded from config/defaults
    var defCopy = DEFAULT.copy || {};
    if (!data.copy) data.copy = {};
    Object.keys(defCopy).forEach(function (id) {
      if (!data.copy[id]) data.copy[id] = { kpiNote: defCopy[id].kpiNote, executiveMessage: defCopy[id].executiveMessage };
    });
  }
  ensureAll();

  // T(key) — editable text with default fallback
  function T(key) {
    return (data.text && data.text[key] != null) ? data.text[key] : (TEXT_DEFAULTS[key] || '');
  }

  // ============================================================
  //  Client-side aggregator — mirrors scripts/build_data.js.
  //  Rebuilds data.groups + data.dashboard from data.rows so any edit to the
  //  raw process table re-derives every count and percentage on the slides.
  // ============================================================
  function sysKey(s) { return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim(); }
  function uniq(arr) { var s = {}, out = []; arr.forEach(function (x) { if (x != null && !s[x]) { s[x] = 1; out.push(x); } }); return out; }

  function tallyBy(items, keyFn) {
    var m = {}; var order = [];
    items.forEach(function (r) { var v = keyFn(r); if (!(v in m)) { m[v] = 0; order.push(v); } m[v]++; });
    return order.map(function (k) { return [k, m[k]]; }).sort(function (a, b) { return b[1] - a[1]; });
  }

  function aggregate() {
    var cfg = data.config || {};
    var map = data.mapping || {};
    var areasOrder = cfg.areasOrder || data.areasOrder || [];
    var noFormal = data.noFormalSupport || cfg.noFormalSupport || [];
    var rows = data.rows || [];
    var lookup = map.systemAreaLookup || {};
    var lookupEntries = Object.keys(lookup).map(function (k) { return [k, lookup[k]]; })
      .sort(function (a, b) { return b[0].length - a[0].length; });

    function inferArea(r) {
      if (r.area && map.directAreaMap && map.directAreaMap[r.area]) return { area: map.directAreaMap[r.area], inferred: false };
      var hay = ' ' + String(r.name || '').toLowerCase() + ' ';
      for (var i = 0; i < lookupEntries.length; i++) {
        var sys = lookupEntries[i][0], usage = lookupEntries[i][1];
        if (hay.indexOf(String(sys).toLowerCase()) >= 0) {
          var mapped = map.usageAreaMap && map.usageAreaMap[usage];
          if (mapped) return { area: mapped, inferred: true };
        }
      }
      if (r.areaNegocio && areasOrder.indexOf(r.areaNegocio) >= 0 && r.areaNegocio !== 'Unclassified')
        return { area: r.areaNegocio, inferred: true };
      return { area: 'Unclassified', inferred: false };
    }
    // stamp derived area on each row (used by the Data table's derived column)
    rows.forEach(function (r) { var res = inferArea(r); r._area = res.area; r._inf = res.inferred; });

    function driverOf(r) { return r.driver || 'External Integrations'; }
    function detailFor(grows, driverLabels, systems) {
      var sub = grows.filter(function (r) { return driverLabels.indexOf(driverOf(r)) >= 0; });
      var per = systems.map(function (s) {
        return { system: s, count: sub.filter(function (r) { return sysKey(r.system) === sysKey(s); }).length };
      }).filter(function (x) { return x.count > 0; });
      return { perPlatform: per, critical: sub.filter(function (r) { return r.critico; }).length };
    }
    function driversTop6(grows, systems) {
      var sorted = tallyBy(grows, driverOf);
      var top = sorted.slice(0, 6).map(function (e, i) {
        return mergeObj({ rank: i + 1, label: e[0], count: e[1] }, detailFor(grows, [e[0]], systems));
      });
      var rest = sorted.slice(6);
      if (rest.length) {
        var restLabels = rest.map(function (e) { return e[0]; });
        var restCount = rest.reduce(function (s, e) { return s + e[1]; }, 0);
        top.push(mergeObj({ rank: 7, label: 'Other drivers', count: restCount, includes: restLabels }, detailFor(grows, restLabels, systems)));
      }
      return top;
    }
    function areaBreak(grows) {
      var counts = {}, inf = {};
      grows.forEach(function (r) { counts[r._area] = (counts[r._area] || 0) + 1; if (r._inf) inf[r._area] = (inf[r._area] || 0) + 1; });
      return areasOrder.filter(function (a) { return counts[a]; }).map(function (a) {
        return { area: a, count: counts[a], inferred: inf[a] || 0 };
      });
    }
    function isNoFormal(s) { return noFormal.some(function (n) { return sysKey(n) === sysKey(s); }); }
    var blurbA = cfg.areaBlurbs || {}, blurbD = cfg.driverBlurbs || {};

    var groups = (cfg.groups || []).map(function (gc) {
      var grows = rows.filter(function (r) { return gc.systems.some(function (s) { return sysKey(s) === sysKey(r.system); }); });
      var copy = (data.copy && data.copy[gc.id]) || {};
      var drivers = driversTop6(grows, gc.systems).map(function (d) { return mergeObj(d, { blurb: blurbD[d.label] || '' }); });
      var areas = areaBreak(grows).map(function (a) { return mergeObj(a, { blurb: blurbA[a.area] || '' }); });
      var platformTotals = gc.systems.map(function (s) {
        return {
          system: s,
          count: grows.filter(function (r) { return sysKey(r.system) === sysKey(s); }).length,
          critical: grows.filter(function (r) { return sysKey(r.system) === sysKey(s) && r.critico; }).length,
          noSupport: isNoFormal(s)
        };
      }).filter(function (x) { return x.count > 0; });
      return {
        id: gc.id, title: gc.title, subtitle: gc.subtitle, systems: gc.systems,
        noSupport: gc.systems.filter(isNoFormal),
        platformTotals: platformTotals,
        total: grows.length,
        critical: grows.filter(function (r) { return r.critico; }).length,
        unclassified: grows.filter(function (r) { return r._area === 'Unclassified'; }).length,
        kpiNote: copy.kpiNote || '', executiveMessage: copy.executiveMessage || '',
        drivers: drivers, areas: areas
      };
    });

    var TOTAL = rows.length;
    var types = tallyBy(rows, function (r) { return r.tipo || '(none)'; }).map(function (e) {
      return { label: e[0], count: e[1], pct: +((e[1] / (TOTAL || 1)) * 100).toFixed(1) };
    });
    var platforms = tallyBy(rows, function (r) { return r.system; }).map(function (e) { return { label: e[0], count: e[1] }; });
    var dashboard = {
      totalProcesses: TOTAL,
      totalCritical: rows.filter(function (r) { return r.critico; }).length,
      totalUnclassified: rows.filter(function (r) { return r._area === 'Unclassified'; }).length,
      platformsWithoutFormalSupport: noFormal.slice(),
      types: types,
      platforms: platforms,
      groupSummary: groups.map(function (g) { return { id: g.id, title: g.title, total: g.total, critical: g.critical }; })
    };
    return { groups: groups, dashboard: dashboard };
  }
  function mergeObj(a, b) { var o = {}; Object.keys(a).forEach(function (k) { o[k] = a[k]; }); Object.keys(b).forEach(function (k) { o[k] = b[k]; }); return o; }

  // Re-derive groups/dashboard from rows and rebuild the module list.
  function recompute() {
    var agg = aggregate();
    data.groups = agg.groups;
    data.dashboard = agg.dashboard;
    modules = buildModules();
  }

  // ---- icon helpers ----
  function icon(id, cls) {
    return '<svg class="' + (cls || 'ic') + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }
  var AREA_ICON = {
    'Funds Operations': 'ic-funds',
    'Wealth Management': 'ic-middle',
    'Middle Office': 'ic-middle',
    'Treasury': 'ic-treasury',
    'Investments/PM': 'ic-invest',
    'Risk & Compliance': 'ic-compliance',
    'BI/Reporting': 'ic-bi',
    'Corporate/Other': 'ic-corporate',
    'Unclassified': 'ic-alert'
  };
  var AREA_COLOR = {
    'Funds Operations': 'var(--navy)',
    'Wealth Management': 'var(--teal)',
    'Middle Office': 'var(--teal)',
    'Treasury': 'var(--navy2)',
    'Investments/PM': 'var(--orange)',
    'Risk & Compliance': 'var(--red)',
    'BI/Reporting': 'var(--green)',
    'Corporate/Other': 'var(--gray)',
    'Unclassified': 'var(--gray)'
  };
  var PLATFORM_ICON = {
    'Pentaho & Sensedia': 'ic-database',
    'BluePrism & UiPath': 'ic-bot',
    'Fluig, n8n & Power Automate': 'ic-gears',
    'Other Scheduled Jobs': 'ic-server'
  };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---- process type mix: percentages computed LIVE from counts ----
  function typeSum() {
    return (data.dashboard.types || []).reduce(function (s, t) { return s + (Number(t.count) || 0); }, 0);
  }
  function typePct(count) {
    var sum = typeSum() || 1;
    return +((Number(count) || 0) / sum * 100).toFixed(1);
  }

  // ============================================================
  //  Slide renderers  — each returns an HTML string for #slide
  // ============================================================
  function eyebrow(txt) {
    return '<div class="s-eyebrow">PATRIA · ' + esc(txt) + '</div>';
  }
  function foot(label, page) {
    return '<div class="foot">' + esc(label) + '</div><div class="foot-pg">' +
      String(page).padStart(2, '0') + '</div>';
  }

  // ---- Module 0: Landscape flow ----
  function renderFlow(page) {
    var areas = [
      ['ic-funds', T('flow.area1t'), T('flow.area1d')],
      ['ic-accounting', T('flow.area2t'), T('flow.area2d')],
      ['ic-reporting', T('flow.area3t'), T('flow.area3d')],
      ['ic-compliance', T('flow.area4t'), T('flow.area4d')],
      ['ic-middle', T('flow.area5t'), T('flow.area5d')]
    ];
    var areaItems = areas.map(function (a) {
      return '<div class="flow-item"><svg class="fi-ic"><use href="#' + a[0] + '"/></svg>' +
        '<div><div class="fi-t">' + esc(a[1]) + '</div><div class="fi-d">' + esc(a[2]) + '</div></div></div>';
    }).join('');

    return eyebrow(T('flow.eyebrow')) +
      '<div class="s-body">' +
        '<h1 class="s-title">' + esc(T('flow.title')) + '</h1>' +
        '<p class="s-sub">' + esc(T('flow.subtitle')) + '</p>' +
        '<div class="flow">' +
          '<div class="flow-areas"><div class="flow-col-head"><div class="fh-t">' + esc(T('flow.areasHead')) + '</div><div class="fh-s">' + esc(T('flow.areasSub')) + '</div></div>' + areaItems + '</div>' +
          '<div class="flow-process"><div class="flow-col-head"><div class="fh-t">' + esc(T('flow.processHead')) + '</div><div class="fh-s">' + esc(T('flow.processSub')) + '</div></div>' +
            '<div class="flow-proc">' +
              '<div class="fp-block"><svg class="fp-ic rpa"><use href="#ic-bot"/></svg><div class="fp-t">' + esc(T('flow.rpaT')) + '</div><div class="fp-d">' + esc(T('flow.rpaD')) + '</div></div>' +
              '<div class="fp-block"><svg class="fp-ic integ"><use href="#ic-api"/></svg><div class="fp-t">' + esc(T('flow.integT')) + '</div><div class="fp-d">' + esc(T('flow.integD')) + '</div></div>' +
            '</div>' +
          '</div>' +
          '<div class="flow-support"><div class="flow-col-head"><div class="fh-t">' + esc(T('flow.supportHead')) + '</div><div class="fh-s">' + esc(T('flow.supportSub')) + '</div></div>' +
            '<div class="flow-item"><svg class="fi-ic"><use href="#ic-support"/></svg><div><div class="fi-t">' + esc(T('flow.supT')) + '</div><div class="fi-d">' + esc(T('flow.supD')) + '</div></div></div>' +
          '</div>' +
        '</div>' +
      '</div>' + foot(T('flow.foot'), page);
  }

  // ---- Module 1: Executive dashboard ----
  var TYPE_COLORS = ['var(--navy)', 'var(--teal)', 'var(--orange)', 'var(--navy2)', 'var(--green)', 'var(--amber)', 'var(--gray)', '#8894b0', '#b3bdd4'];

  function renderDashboard(page) {
    var d = data.dashboard;
    var etl = (d.types.find(function (t) { return t.label === 'ETL'; }) || { count: 0 });
    var rpa = (d.types.find(function (t) { return t.label === 'RPA'; }) || { count: 0 });
    var etlRpa = (Number(etl.count) || 0) + (Number(rpa.count) || 0);
    var etlRpaPct = typePct(etlRpa);

    var kpis = [
      ['num', d.totalProcesses, T('dash.kpi1lbl'), T('dash.kpi1desc')],
      ['num', d.totalCritical, T('dash.kpi2lbl'), T('dash.kpi2desc')],
      ['num', etlRpa, T('dash.kpi3lbl'), etlRpaPct + '% of scope'],
      ['warn', d.platformsWithoutFormalSupport.length, T('dash.kpi4lbl'), d.platformsWithoutFormalSupport.join(' · ')]
    ];
    var kpiHtml = kpis.map(function (k) {
      return '<div class="kpi-card"><div class="kpi-num ' + (k[0] === 'warn' ? 'warn' : '') + '">' + k[1] +
        '</div><div class="kpi-meta"><div class="k-lbl">' + esc(k[2]) + '</div><div class="k-desc">' + esc(k[3]) + '</div></div></div>';
    }).join('');

    // platform bars
    var maxP = Math.max.apply(null, d.platforms.map(function (p) { return p.count; }));
    var bars = d.platforms.map(function (p) {
      var w = (p.count / maxP * 100).toFixed(1);
      return '<div class="barrow"><div class="b-name">' + esc(p.label) + '</div>' +
        '<div class="bartrack"><div class="barfill" style="width:' + w + '%"></div></div>' +
        '<div class="b-val">' + p.count + ' processes</div></div>';
    }).join('');

    // type split bar + legend (percentages recomputed live from counts)
    var seg = d.types.map(function (t, i) {
      var pct = typePct(t.count);
      return '<div class="seg" style="width:' + pct + '%;background:' + TYPE_COLORS[i % TYPE_COLORS.length] + '" title="' + esc(t.label) + ' ' + pct + '%"></div>';
    }).join('');
    var legend = d.types.map(function (t, i) {
      return '<div class="tl"><span class="dot" style="background:' + TYPE_COLORS[i % TYPE_COLORS.length] + '"></span>' +
        esc(t.label) + ' <b>' + t.count + ' · ' + typePct(t.count) + '%</b></div>';
    }).join('');

    // support heatmap rows (per group) — the support-status column now
    // evidences which platforms are supported vs. without formal support.
    var OP_MODEL = {
      'pentaho-sensedia': 'ETL batch & API integration backbone',
      'blueprism-uipath': 'Attended / unattended RPA execution',
      'workflow-lowcode': 'Workflow & low-code automation',
      'other-jobs': 'Infrastructure & legacy scheduled jobs'
    };
    var rows = data.groups.map(function (g) {
      var pts = g.platformTotals || [];
      var noSup = g.noSupport || [];
      function ns(sys) { return noSup.some(function (n) { return String(n).toLowerCase() === String(sys).toLowerCase(); }); }
      var statusCell;
      if (g.id === 'other-jobs') {
        statusCell = '<span class="pill a">Supported by infra teams</span>';
      } else {
        var ok = pts.filter(function (p) { return !ns(p.system); }).map(function (p) { return p.system; });
        var no = pts.filter(function (p) { return ns(p.system); }).map(function (p) { return p.system; });
        statusCell = '<div class="sup-split">';
        if (ok.length) statusCell += '<span class="sup-chip ok"><span class="sd ok"></span>' + esc(ok.join(', ')) + ' — supported</span>';
        if (no.length) statusCell += '<span class="sup-chip no"><span class="sd no"></span>' + esc(no.join(', ')) + ' — no formal support</span>';
        statusCell += '</div>';
      }
      return '<tr><td><span class="h-plat">' + icon(PLATFORM_ICON[g.title] || 'ic-gears') + esc(g.title) + '</span></td>' +
        '<td>' + esc(OP_MODEL[g.id] || '') + '</td><td style="text-align:center;font-weight:700;color:var(--navy)">' + g.total + '</td>' +
        '<td>' + statusCell + '</td></tr>';
    }).join('');

    return eyebrow(T('dash.eyebrow')) +
      '<div class="s-body">' +
        '<h1 class="s-title">' + esc(T('dash.title')) + '</h1>' +
        '<p class="s-sub">' + esc(T('dash.subtitle')) + '</p>' +
        '<div class="kpi-row">' + kpiHtml + '</div>' +
        '<div class="panels dash">' +
          '<div class="panel"><div class="panel-head"><h2 class="panel-title">' + esc(T('dash.panelPlatforms')) + '</h2><span class="panel-hint">count</span></div>' +
            '<div class="barlist">' + bars + '</div>' +
          '</div>' +
          '<div class="panel"><div class="panel-head"><h2 class="panel-title">' + esc(T('dash.panelSupport')) + '</h2><span class="panel-hint">by platform</span></div>' +
            '<table class="heat"><thead><tr><th>Platform</th><th>Operating model</th><th style="text-align:center">Processes</th><th>Support status</th></tr></thead><tbody>' + rows + '</tbody></table>' +
            '<div style="margin-top:12px"><div class="panel-hint" style="margin-bottom:8px">' + esc(T('dash.typemix')) + '</div>' +
            '<div class="typesplit">' + seg + '</div><div class="typelegend">' + legend + '</div></div>' +
          '</div>' +
        '</div>' +
        '<div class="banner"><span class="b-tag">' + esc(T('dash.decisionTag')) + '</span><span class="b-msg">' + esc(T('dash.decisionMsg')) + '</span></div>' +
      '</div>' + foot(T('dash.foot'), page);
  }

  // ---- Modules 2–5: group slides ----
  function renderGroup(group, page) {
    var noSup = group.noSupport || [];
    function isNoSup(sys) {
      return noSup.some(function (n) { return String(n).toLowerCase() === String(sys).toLowerCase(); });
    }

    // drivers (numbered 1-6 + Other) — with per-platform split + critical marker
    var drivers = group.drivers.map(function (dr) {
      var isOther = dr.label === 'Other drivers';
      var rankHtml = isOther ? '∑' : dr.rank;
      var plats = (dr.perPlatform || []).map(function (p) {
        var ns = isNoSup(p.system);
        return '<span class="plat-chip' + (ns ? ' nosup' : '') + '"' + (ns ? ' title="Platform without formal support"' : '') + '>' +
          (ns ? '<span class="ns-dot"></span>' : '') + esc(p.system) + ' <b>' + p.count + '</b></span>';
      }).join('');
      var crit = dr.critical > 0
        ? '<span class="crit-badge" title="' + dr.critical + ' critical process' + (dr.critical > 1 ? 'es' : '') + '">' + icon('ic-alert', 'cb-ic') + dr.critical + ' critical</span>'
        : '';
      // On group slides the per-platform breakdown (requested) replaces the
      // one-line blurb to keep the panel within the 1080px slide height.
      return '<div class="driver ' + (isOther ? 'other' : '') + '">' +
        '<div class="rank">' + rankHtml + '</div>' +
        '<div class="d-main"><div class="d-name">' + esc(dr.label) + '</div>' +
        (plats || crit ? '<div class="d-plats">' + plats + crit + '</div>' : '') +
        '</div>' +
        '<div class="count-chip">' + dr.count + '</div></div>';
    }).join('');

    // per-platform summary legend under the drivers panel
    var platLegend = (group.platformTotals || []).map(function (p) {
      var ns = isNoSup(p.system);
      return '<span class="pl-item' + (ns ? ' nosup' : '') + '">' + (ns ? '<span class="ns-dot"></span>' : '') +
        esc(p.system) + ' <b>' + p.count + '</b>' + (p.critical ? ' <span class="pl-crit">· ' + p.critical + ' crit</span>' : '') + '</span>';
    }).join('');
    var hasNoSup = (group.platformTotals || []).some(function (p) { return isNoSup(p.system); });
    var noSupNote = hasNoSup
      ? '<div class="nosup-note"><span class="ns-dot"></span> Platform without formal support · <span class="crit-mini">' + icon('ic-alert', 'cb-ic') + '</span> critical processes</div>'
      : '<div class="nosup-note"><span class="crit-mini">' + icon('ic-alert', 'cb-ic') + '</span> critical processes</div>';

    // areas
    var areas = group.areas.map(function (a) {
      var unc = a.area === 'Unclassified';
      var iBadge = a.inferred ? ' <span class="badge-i" title="Includes ' + a.inferred + ' inferred classification' + (a.inferred > 1 ? 's' : '') + '">ⓘ</span>' : '';
      return '<div class="area-card ' + (unc ? 'unclassified' : '') + '" style="box-shadow: inset 6px 0 0 ' + (AREA_COLOR[a.area] || 'var(--teal)') + '">' +
        '<svg class="a-ic" style="color:' + (AREA_COLOR[a.area] || 'var(--navy)') + '"><use href="#' + (AREA_ICON[a.area] || 'ic-corporate') + '"/></svg>' +
        '<div><div class="a-name">' + esc(a.area) + iBadge + '</div>' +
        (a.blurb ? '<div class="a-blurb">' + esc(a.blurb) + '</div>' : '') + '</div>' +
        '<div class="count-chip sub">' + a.count + '</div></div>';
    }).join('');

    var critLine = group.critical > 0
      ? '<b>' + group.critical + '</b> flagged critical'
      : 'no critical flags in source';

    // Pentaho & Sensedia gets a compact lateral rail with the ETL / API flow diagrams
    var isDiag = /pentaho/i.test(group.title);
    var rail = isDiag ?
      '<aside class="diag-rail">' +
        '<div class="dr-head">' + esc(T('grp.diagHead')) + '</div>' +
        '<figure class="dr-fig"><img src="assets/pentaho-etl.png" alt="Pentaho ETL flow: data sources, Pentaho PDI, business processes"/></figure>' +
        '<figure class="dr-fig"><img src="assets/sensedia-etl.png" alt="Sensedia integration flow: source systems, data integration & ETL, business processes"/></figure>' +
      '</aside>' : '';

    return eyebrow(T('grp.eyebrow')) +
      '<div class="s-body">' +
        '<h1 class="s-title rule">' + esc(group.title) + '</h1>' +
        '<p class="s-sub">' + esc(group.subtitle) + ' — business drivers and impacted areas</p>' +
        '<div class="kpi-badge"><div class="b-num">' + group.total + '</div>' +
          '<div class="b-txt">' + esc(group.kpiNote) + '<br>' + critLine + '</div></div>' +
        '<div class="panels two' + (isDiag ? ' with-rail' : '') + '" style="margin-top:22px">' +
          '<div class="panel"><div class="panel-head"><h2 class="panel-title">' + esc(T('grp.panelDrivers')) + '</h2><span class="panel-hint">' + esc(T('grp.hintCount')) + ' · by platform</span></div>' +
            drivers +
            (platLegend ? '<div class="plat-legend">' + platLegend + '</div>' : '') + noSupNote +
          '</div>' +
          '<div class="panel"><div class="panel-head"><h2 class="panel-title">' + esc(T('grp.panelAreas')) + '</h2><span class="panel-hint">' + esc(T('grp.hintCount')) + '</span></div>' + areas + '</div>' +
          rail +
        '</div>' +
        '<div class="banner exec"><span class="b-tag">' + esc(T('grp.execTag')) + '</span><span class="b-msg">' + esc(group.executiveMessage) + '</span></div>' +
      '</div>' + foot('Prepared for the Head of Technology · Automations — ' + group.title, page);
  }

  // ---- Module 6: Providers & Gap (vendor support model) ----
  function pgNum(v) {
    var n = parseFloat(String(v == null ? '' : v).replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
  }
  function renderProviders(page) {
    // ---- Support gap: platform counts derived LIVE from the process rows ----
    var noFormal = data.noFormalSupport || [];
    var plats = (data.dashboard && data.dashboard.platforms) || [];
    function countOf(name) {
      var p = plats.find(function (x) { return sysKey(x.label) === sysKey(name); });
      return p ? p.count : 0;
    }
    var GAP_COLOR = {
      'sensedia': 'var(--navy2)', 'n8n': '#6C5CE7', 'fluig': 'var(--amber)',
      'uipath': 'var(--teal)', 'blueprism': 'var(--navy)', 'power automate': 'var(--orange)'
    };
    var gapRows = noFormal.map(function (name) {
      var c = countOf(name);
      var col = GAP_COLOR[sysKey(name)] || 'var(--navy2)';
      return '<div class="pg-gap-row" style="--gc:' + col + '">' +
        '<span class="gr-name">' + esc(name) + '</span>' +
        '<span class="gr-count">' + c + '</span>' +
        '<span class="gr-note no">No formal support</span></div>';
    }).join('');
    var web = pgNum(T('pg.gapWebCount'));
    gapRows += '<div class="pg-gap-row" style="--gc:var(--gray)">' +
      '<span class="gr-name">' + esc(T('pg.gapWebLbl')) + '</span>' +
      '<span class="gr-count muted">' + web + '</span>' +
      '<span class="gr-note">' + esc(T('pg.gapWebNote')) + '</span></div>';
    var liveSum = noFormal.reduce(function (s, n) { return s + countOf(n); }, 0);
    var rounded = Math.max(10, Math.floor(liveSum / 10) * 10);
    var gapHeadline = '<b>' + rounded + '+</b> ' + esc(T('pg.gapHeadTpl')).replace('{web}', '<b>' + web + '</b>');

    // ---- Actus capacity: 2x2 stat grid ----
    var stats = [
      [T('pg.capCurrent'), T('pg.capCurrentLbl'), 'teal'],
      [T('pg.capProposed'), T('pg.capProposedLbl'), 'navy'],
      [T('pg.capAdd'), T('pg.capAddLbl'), 'orange'],
      [T('pg.capPct'), T('pg.capPctLbl'), 'orange']
    ];
    var statGrid = stats.map(function (s) {
      return '<div class="pg-stat"><div class="ps-num ' + s[2] + '">' + esc(s[0]) + '</div>' +
        '<div class="ps-lbl">' + esc(s[1]) + '</div></div>';
    }).join('');

    // ---- Monthly cost view: mini bars scaled to the largest value ----
    var costs = [
      [T('pg.costCurrentLbl'), T('pg.costCurrent'), 'teal'],
      [T('pg.costProposedLbl'), T('pg.costProposed'), 'navy'],
      [T('pg.costIncreaseLbl'), T('pg.costIncrease'), 'orange']
    ];
    var costMax = Math.max.apply(null, costs.map(function (c) { return pgNum(c[1]); }).concat([1]));
    var costRows = costs.map(function (c) {
      var w = (pgNum(c[1]) / costMax * 100).toFixed(1);
      return '<div class="pg-cost-row"><span class="cr-lbl">' + esc(c[0]) + '</span>' +
        '<span class="cr-track"><span class="cr-fill ' + c[2] + '" style="width:' + w + '%"></span></span>' +
        '<span class="cr-val">' + esc(c[1]) + '</span></div>';
    }).join('');

    // ---- HH dedication split ----
    var ded = [
      [T('pg.dedEvoLbl'), pgNum(T('pg.dedEvoPct')), 'var(--navy)'],
      [T('pg.dedCorLbl'), pgNum(T('pg.dedCorPct')), 'var(--teal)'],
      [T('pg.dedOndLbl'), pgNum(T('pg.dedOndPct')), 'var(--orange)'],
      [T('pg.dedCybLbl'), pgNum(T('pg.dedCybPct')), 'var(--red)']
    ];
    var dedSum = ded.reduce(function (s, d) { return s + d[1]; }, 0) || 1;
    var dedBar = ded.map(function (d) {
      return '<div class="pg-ded-seg" style="width:' + (d[1] / dedSum * 100).toFixed(1) + '%;background:' + d[2] + '" title="' + esc(d[0]) + ' ' + d[1] + '%"></div>';
    }).join('');
    var dedLegend = ded.map(function (d) {
      return '<div class="pg-ded-item"><span class="dl-dot" style="background:' + d[2] + '"></span>' +
        '<span class="dl-name">' + esc(d[0]) + '</span><span class="dl-pct">' + d[1] + '%</span></div>';
    }).join('');

    // ---- Need for more support (numbered reasons) ----
    var needs = [
      [T('pg.need1t'), T('pg.need1d')], [T('pg.need2t'), T('pg.need2d')],
      [T('pg.need3t'), T('pg.need3d')], [T('pg.need4t'), T('pg.need4d')]
    ];
    var needHtml = needs.map(function (n, i) {
      return '<div class="pg-need"><div class="pn-n">' + (i + 1) + '</div>' +
        '<div><div class="pn-t">' + esc(n[0]) + '</div><div class="pn-d">' + esc(n[1]) + '</div></div></div>';
    }).join('');

    // ---- Technical debt ----
    var debts = [
      [T('pg.debt1t'), T('pg.debt1d')], [T('pg.debt2t'), T('pg.debt2d')], [T('pg.debt3t'), T('pg.debt3d')]
    ];
    var debtHtml = debts.map(function (d) {
      return '<div class="pg-debt">' + icon('ic-alert', 'pd-ic') +
        '<div><div class="pd-t">' + esc(d[0]) + '</div><div class="pd-d">' + esc(d[1]) + '</div></div></div>';
    }).join('');

    return eyebrow(T('pg.eyebrow')) +
      '<div class="s-body">' +
        '<h1 class="s-title rule">' + esc(T('pg.title')) + '</h1>' +
        '<p class="s-sub">' + esc(T('pg.subtitle')) + '</p>' +
        '<div class="pg-cols">' +
          // Column 1 — Actus capacity + HH dedication
          '<div class="pg-col">' +
            '<div class="pg-card">' +
              '<div class="pg-ch"><h2>' + esc(T('pg.capHead')) + '</h2><span>' + esc(T('pg.capSub')) + '</span></div>' +
              '<div class="pg-stat-grid">' + statGrid + '</div>' +
              '<div class="pg-cost-head">' + esc(T('pg.costHead')) + '</div>' +
              '<div class="pg-cost">' + costRows + '</div>' +
              '<div class="pg-note">' + esc(T('pg.opexNote')) + '</div>' +
            '</div>' +
            '<div class="pg-card">' +
              '<div class="pg-ch"><h2>' + esc(T('pg.dedHead')) + '</h2><span>' + esc(T('pg.dedSub')) + '</span></div>' +
              '<div class="pg-ded-bar">' + dedBar + '</div>' +
              '<div class="pg-ded-legend">' + dedLegend + '</div>' +
              '<div class="pg-note">' + esc(T('pg.dedNote')) + '</div>' +
            '</div>' +
          '</div>' +
          // Column 2 — Support gap + Technical debt
          '<div class="pg-col">' +
            '<div class="pg-card">' +
              '<div class="pg-ch"><h2>' + esc(T('pg.gapHead')) + '</h2><span>' + esc(T('pg.gapSub')) + '</span></div>' +
              '<div class="pg-gap">' + gapRows + '</div>' +
              '<div class="pg-gap-headline">' + gapHeadline + '</div>' +
            '</div>' +
            '<div class="pg-card">' +
              '<div class="pg-ch"><h2>' + esc(T('pg.debtHead')) + '</h2><span>' + esc(T('pg.debtSub')) + '</span></div>' +
              '<div class="pg-debts">' + debtHtml + '</div>' +
            '</div>' +
          '</div>' +
          // Column 3 — Need for more support + Decision ask
          '<div class="pg-col">' +
            '<div class="pg-card">' +
              '<div class="pg-ch"><h2>' + esc(T('pg.needHead')) + '</h2><span>' + esc(T('pg.needSub')) + '</span></div>' +
              '<div class="pg-needs">' + needHtml + '</div>' +
            '</div>' +
            '<div class="pg-decision"><span class="pd-tag">' + esc(T('pg.decTag')) + '</span>' +
              '<span class="pd-msg">' + esc(T('pg.decMsg')) + '</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="banner exec"><span class="b-tag">' + esc(T('pg.execTag')) + '</span><span class="b-msg">' + esc(T('pg.execMsg')) + '</span></div>' +
      '</div>' + foot(T('pg.foot'), page);
  }

  // ---- Module 7: Next steps ----
  function renderClosing(page) {
    var steps = data.nextSteps.map(function (s, i) {
      return '<div class="step"><div class="st-n">' + (i + 1) + '</div>' +
        '<div class="st-t">' + esc(s.title) + '</div><div class="st-b">' + esc(s.body) + '</div></div>';
    }).join('');
    return eyebrow(T('close.eyebrow')) +
      '<div class="s-body">' +
        '<h1 class="s-title rule">' + esc(T('close.title')) + '</h1>' +
        '<p class="s-sub">' + esc(T('close.subtitle')) + '</p>' +
        '<div class="steps">' + steps + '</div>' +
        '<div class="banner"><span class="b-tag">' + esc(T('close.askTag')) + '</span><span class="b-msg">' + esc(T('close.askMsg')) + '</span></div>' +
      '</div>' + foot(T('close.foot'), page);
  }

  // ============================================================
  //  Module registry & navigation
  // ============================================================
  function buildModules() {
    var mods = [
      { label: 'Landscape flow', render: renderFlow },
      { label: 'Executive Dashboard', render: renderDashboard }
    ];
    data.groups.forEach(function (g) {
      mods.push({ label: 'Automations · ' + shortTitle(g.title), render: function (p) { return renderGroup(g, p); } });
    });
    mods.push({ label: 'Providers & Gap', render: renderProviders });
    mods.push({ label: 'Next steps', render: renderClosing });
    return mods;
  }
  function shortTitle(t) {
    if (t === 'Fluig, n8n & Power Automate') return 'Workflow & Low-code';
    if (t === 'Pentaho & Sensedia') return 'Pentaho & Sensedia';
    return t;
  }

  var modules = [];
  recompute(); // derive groups/dashboard from rows and build the module list
  var current = 0;
  var slideEl = document.getElementById('slide');
  var scaleEl = document.getElementById('slide-scale');
  var vpEl = document.getElementById('viewport');

  function renderCurrent() {
    slideEl.innerHTML = modules[current].render(current + 1);
    document.getElementById('pageind').textContent = (current + 1) + ' / ' + modules.length;
    updateRail();
  }

  function buildRail() {
    var ul = document.getElementById('rail-list');
    ul.innerHTML = modules.map(function (m, i) {
      return '<li data-i="' + i + '"><span class="num">' + i + '</span><span class="lbl">' + esc(m.label) + '</span></li>';
    }).join('');
    ul.addEventListener('click', function (e) {
      var li = e.target.closest('li');
      if (li) go(parseInt(li.getAttribute('data-i'), 10));
    });
  }
  function updateRail() {
    var lis = document.querySelectorAll('#rail-list li');
    lis.forEach(function (li, i) { li.classList.toggle('active', i === current); });
  }

  function go(i) {
    current = Math.max(0, Math.min(modules.length - 1, i));
    renderCurrent();
  }

  // ---- responsive scaling to fit the viewport ----
  function fit() {
    var present = document.body.classList.contains('present');
    var railW = present ? 0 : 208;
    var padW = present ? 0 : 48;
    var padH = present ? 0 : 48 + 66; // toolbar allowance when not presenting
    var availW = window.innerWidth - railW - padW;
    var availH = window.innerHeight - padH;
    var scale = Math.min(availW / 1920, availH / 1080);
    if (!present) scale = Math.min(scale, 0.9); // no cap in capture mode → max resolution
    scaleEl.style.transform = 'scale(' + scale + ')';
    vpEl.style.width = (1920 * scale) + 'px';
    vpEl.style.height = (1080 * scale) + 'px';
  }
  window.addEventListener('resize', fit);

  // ---- full-screen capture (present) mode ----
  var hintTimer = null;
  function setPresent(on) {
    document.body.classList.toggle('present', on);
    var hint = document.getElementById('present-hint');
    if (on) {
      hint.classList.remove('faded');
      clearTimeout(hintTimer);
      hintTimer = setTimeout(function () { hint.classList.add('faded'); }, 3200);
    }
    fit();
  }
  function togglePresent() { setPresent(!document.body.classList.contains('present')); }

  // ============================================================
  //  Export current slide -> self-contained vector SVG (>=1920x1080)
  // ============================================================
  function collectCss() {
    var css = '';
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sh = document.styleSheets[i];
      try {
        var rules = sh.cssRules;
        for (var j = 0; j < rules.length; j++) css += rules[j].cssText + '\n';
      } catch (e) { /* skip unreadable sheet */ }
    }
    return css;
  }

  // inline every <use> by cloning its referenced <symbol> children into a standalone svg
  function inlineUses(root) {
    var uses = root.querySelectorAll('use');
    uses.forEach(function (u) {
      var href = u.getAttribute('href') || u.getAttribute('xlink:href') || '';
      var id = href.replace('#', '');
      var sym = document.getElementById(id);
      var svg = u.closest('svg');
      if (!sym || !svg) return;
      if (!svg.getAttribute('viewBox') && sym.getAttribute('viewBox'))
        svg.setAttribute('viewBox', sym.getAttribute('viewBox'));
      ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'].forEach(function (a) {
        if (sym.getAttribute(a) && !svg.getAttribute(a)) svg.setAttribute(a, sym.getAttribute(a));
      });
      svg.innerHTML = sym.innerHTML;
    });
  }

  function buildSlideSvg() {
    var W = 1920, H = 1080;
    var clone = slideEl.cloneNode(true);
    inlineUses(clone);
    var css = collectCss();
    var wrapper =
      '<div xmlns="http://www.w3.org/1999/xhtml" class="slide" ' +
      'style="width:' + W + 'px;height:' + H + 'px;position:relative;overflow:hidden;background:#fff;">' +
      '<style>' + css + '</style>' + clone.innerHTML + '</div>';
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" ' +
      'viewBox="0 0 ' + W + ' ' + H + '">' +
      '<rect width="100%" height="100%" fill="#ffffff"/>' +
      '<foreignObject x="0" y="0" width="' + W + '" height="' + H + '">' + wrapper +
      '</foreignObject></svg>';
  }

  function exportPng() {
    var btn = document.getElementById('btn-export');
    var prev = btn.textContent;
    btn.textContent = 'Exporting…'; btn.disabled = true;
    try {
      var svg = buildSlideSvg();
      var blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      var a = document.createElement('a');
      a.download = 'patria-landscape-' + (current + 1) + '-' + slug(modules[current].label) + '.svg';
      a.href = URL.createObjectURL(blob);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
      btn.textContent = 'Saved ✓';
    } catch (e) {
      btn.textContent = 'Export failed';
      console.error('Export error', e);
    }
    setTimeout(function () { btn.textContent = prev; btn.disabled = false; }, 1400);
  }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  // ============================================================
  //  Persist to source (data.js) — publish to GitHub via its API
  // ============================================================
  // Serialize the live data object back into the exact shape data.js ships in,
  // so once GitHub Pages rebuilds, window.__DATA__ *is* the edited dataset.
  function serializeDataJs() {
    var header = '/* Auto-generated by scripts/build_data.js — last edited via the Data Editor on '
      + new Date().toISOString() + '. */\n';
    return header + 'window.__DATA__ = ' + JSON.stringify(data) + ';\n';
  }

  // The publish button doubles as the unsaved-changes indicator.
  function updateSaveButton() {
    var btn = document.getElementById('btn-publish');
    if (!btn || btn.disabled) return; // don't clobber "Publicando…/Publicado ✓"
    btn.textContent = dirty ? '⬆ Publicar a GitHub •' : '⬆ Publicar a GitHub';
    btn.title = dirty ? 'Hay cambios sin publicar al repositorio' : 'Publica data.js al repositorio de GitHub Pages';
  }

  // ---- GitHub config, kept only in this browser (never written to the repo) ----
  var GH_CFG_KEY = 'patria-gh-config';   // owner/repo/branch/path — not sensitive
  var GH_TOKEN_KEY = 'patria-gh-token';  // personal access token — sensitive
  var sessionToken = '';                 // used when "recordar" is unchecked
  // Baked-in defaults for this deployment (repo: PAT-J-Ruiz/Tools, data.js at root).
  // Only the token is ever entered by hand — everything else is pre-filled.
  var GH_DEFAULTS = { owner: 'PAT-J-Ruiz', repo: 'Tools', branch: 'main', path: 'data.js' };
  function ghConfig() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(GH_CFG_KEY) || '{}') || {}; } catch (e) {}
    return {
      owner: s.owner || GH_DEFAULTS.owner,
      repo: s.repo || GH_DEFAULTS.repo,
      branch: s.branch || GH_DEFAULTS.branch,
      path: s.path || GH_DEFAULTS.path
    };
  }
  function ghToken() {
    try { return localStorage.getItem(GH_TOKEN_KEY) || sessionToken || ''; } catch (e) { return sessionToken || ''; }
  }
  function ghHeaders(token) {
    return {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    };
  }
  // btoa only handles Latin-1; the dataset has accents, so encode UTF-8 first.
  function utf8ToBase64(str) { return btoa(unescape(encodeURIComponent(str))); }
  function ghErrMsg(res, bodyMsg) {
    var extra = bodyMsg ? ' — ' + bodyMsg : '';
    var rl = (res.headers && res.headers.get) ? res.headers.get('x-ratelimit-remaining') : null;
    if (res.status === 401) return 'token inválido o expirado (401)' + extra;
    if (res.status === 403) {
      if (rl === '0') return 'límite de peticiones alcanzado (403) — espera unos minutos';
      // Almost always: fine-grained token without "Contents: Read and write" on this repo,
      // or a classic token without the "repo" scope, or pending org/SSO approval.
      return 'el token no tiene permiso de escritura (403)' + (extra || ' — dale "Contents: Read and write" sobre el repo Tools');
    }
    if (res.status === 404) return 'repo, rama o ruta no encontrada, o el token no ve este repo (404)' + extra;
    if (res.status === 409) return 'conflicto de versión (409) — reintenta';
    if (res.status === 422) return 'datos inválidos (422)' + extra;
    return bodyMsg || ('HTTP ' + res.status);
  }

  function publishToGitHub() {
    var btn = document.getElementById('btn-publish');
    var cfg = ghConfig();
    var token = ghToken();
    if (!cfg.owner || !cfg.repo || !cfg.path || !token) {
      openGhConfig(true);                       // first run — collect settings
      flashGhConfigHint();
      return;
    }
    var branch = cfg.branch || 'main';
    var apiBase = 'https://api.github.com/repos/' + encodeURIComponent(cfg.owner) +
      '/' + encodeURIComponent(cfg.repo) + '/contents/' +
      cfg.path.split('/').map(encodeURIComponent).join('/');
    btn.disabled = true; btn.textContent = 'Publicando…';
    (async function () {
      try {
        // 1. current file SHA (required to update an existing file)
        var sha = null;
        var getRes = await fetch(apiBase + '?ref=' + encodeURIComponent(branch), { headers: ghHeaders(token) });
        if (getRes.status === 200) { sha = (await getRes.json()).sha; }
        else if (getRes.status !== 404) {
          var gm = ''; try { gm = (await getRes.json()).message; } catch (e) {}
          throw new Error(ghErrMsg(getRes, gm));
        }
        // 2. commit the new content
        var body = {
          message: 'Update ' + cfg.path + ' via Data Editor (' + new Date().toISOString() + ')',
          content: utf8ToBase64(serializeDataJs()),
          branch: branch
        };
        if (sha) body.sha = sha;
        var putRes = await fetch(apiBase, { method: 'PUT', headers: ghHeaders(token), body: JSON.stringify(body) });
        if (!putRes.ok) {
          var pm = ''; try { pm = (await putRes.json()).message; } catch (e) {}
          throw new Error(ghErrMsg(putRes, pm));
        }
        dirty = false;
        btn.textContent = '✓ Publicado (Pages ~1 min)';
        setTimeout(function () { btn.disabled = false; updateSaveButton(); }, 3200);
      } catch (e) {
        console.error('Publish error', e);
        btn.textContent = 'Error: ' + (e.message || 'falló');
        setTimeout(function () { btn.disabled = false; updateSaveButton(); }, 4200);
      }
    })();
  }

  // ---- GitHub config panel ----
  function ghField(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
  function openGhConfig(force) {
    var p = document.getElementById('gh-config'); if (!p) return;
    p.hidden = force ? false : !p.hidden;
    if (!p.hidden) {
      fillGhConfig();
      // If the token is the only thing missing, jump straight to it.
      if (!ghToken()) { var t = document.getElementById('gh-token'); if (t) { t.focus(); } }
    }
  }
  function fillGhConfig() {
    var c = ghConfig();
    var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v || ''; };
    set('gh-owner', c.owner); set('gh-repo', c.repo);
    set('gh-branch', c.branch || 'main'); set('gh-path', c.path || 'data.js');
    var tokEl = document.getElementById('gh-token'); if (tokEl) tokEl.value = ghToken();
    var rem = document.getElementById('gh-remember');
    if (rem) { try { rem.checked = !!localStorage.getItem(GH_TOKEN_KEY); } catch (e) {} }
  }
  function flashGhConfigHint() {
    var s = document.getElementById('gh-status');
    if (s) { s.textContent = 'Completa la configuración de GitHub y guarda para publicar.'; }
  }
  function saveGhConfig() {
    var cfg = { owner: ghField('gh-owner'), repo: ghField('gh-repo'), branch: ghField('gh-branch') || 'main', path: ghField('gh-path') || 'data.js' };
    try { localStorage.setItem(GH_CFG_KEY, JSON.stringify(cfg)); } catch (e) {}
    var tok = ghField('gh-token');
    var remember = false; var rem = document.getElementById('gh-remember'); if (rem) remember = rem.checked;
    try {
      if (remember && tok) { localStorage.setItem(GH_TOKEN_KEY, tok); sessionToken = ''; }
      else { localStorage.removeItem(GH_TOKEN_KEY); sessionToken = tok; } // keep for this session only
    } catch (e) { sessionToken = tok; }
    var s = document.getElementById('gh-status');
    if (s) s.textContent = 'Configuración guardada' + (remember ? ' (token recordado en este navegador).' : ' (token solo para esta sesión).');
    updateSaveButton();
  }
  function forgetGhToken() {
    try { localStorage.removeItem(GH_TOKEN_KEY); } catch (e) {}
    sessionToken = '';
    var tokEl = document.getElementById('gh-token'); if (tokEl) tokEl.value = '';
    var rem = document.getElementById('gh-remember'); if (rem) rem.checked = false;
    var s = document.getElementById('gh-status'); if (s) s.textContent = 'Token borrado de este navegador.';
  }

  // Backup export — download the current dataset as pretty JSON.
  function exportDataset() {
    var btn = document.getElementById('btn-export-data');
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    var a = document.createElement('a');
    a.download = 'patria-dataset-' + new Date().toISOString().slice(0, 10) + '.json';
    a.href = URL.createObjectURL(blob);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
    if (btn) { var p = btn.textContent; btn.textContent = 'Descargado ✓'; setTimeout(function () { btn.textContent = p; }, 1400); }
  }

  // ============================================================
  //  Data Editor
  // ============================================================
  var editorOverlay = document.getElementById('editor-overlay');
  var editorBody = document.getElementById('editor-body');
  var editorTab = 0;

  function openEditor() { renderEditor(); updateSaveButton(); editorOverlay.hidden = false; }
  function closeEditor() { editorOverlay.hidden = true; }

  function editorTabs() {
    var t = [{ name: 'Data table', fn: edData }, { name: 'Dashboard', fn: edDashboard }];
    data.groups.forEach(function (g, gi) { t.push({ name: shortTitle(g.title), fn: function () { return edGroup(gi); } }); });
    t.push({ name: 'Area mapping', fn: edMapping });
    t.push({ name: 'Next steps', fn: edNextSteps });
    t.push({ name: 'Slide text', fn: edText });
    return t;
  }

  function renderEditor() {
    var tabs = editorTabs();
    if (editorTab >= tabs.length) editorTab = 0;
    var html = '<div class="ed-tabs">' + tabs.map(function (t, i) {
      return '<button class="ed-tab ' + (i === editorTab ? 'active' : '') + '" data-tab="' + i + '">' + esc(t.name) + '</button>';
    }).join('') + '</div>';

    html += '<div class="ed-section active">' + tabs[editorTab].fn() + '</div>';
    editorBody.innerHTML = html;

    editorBody.querySelectorAll('.ed-tab').forEach(function (b) {
      b.addEventListener('click', function () { editorTab = parseInt(b.getAttribute('data-tab'), 10); renderEditor(); });
    });
    bindEditorInputs();
    bindDataGrid();
  }

  function field(path, label, type) {
    return '<div class="ed-grid"><label>' + esc(label) + '</label>' +
      '<input type="' + (type || 'number') + '" data-path="' + esc(path) + '"/></div>';
  }
  function textArea(path, label) {
    return '<div class="ed-grid wide"><label>' + esc(label) + '</label>' +
      '<textarea data-path="' + esc(path) + '"></textarea></div>';
  }

  function statLine(label, val) {
    return '<div class="ed-grid"><label>' + esc(label) + '</label><div class="ed-ro">' + esc(val) + '</div></div>';
  }

  function edDashboard() {
    var d = data.dashboard;
    var h = '<div class="ed-sub">All counts below are computed from the <b>Data table</b>. To change them, edit the processes there.</div>';
    h += '<div class="ed-h">Headline KPIs (computed)</div>';
    h += statLine('Total inventory processes', d.totalProcesses);
    h += statLine('Total critical processes', d.totalCritical);
    h += '<div class="ed-h">Platforms without formal support</div><div class="ed-sub">Comma-separated list — drives the “no formal support” markers.</div>';
    h += '<div class="ed-grid wide"><textarea data-path="noFormalSupport" data-list="1"></textarea></div>';
    h += '<div class="ed-h">Process type mix (computed)</div>';
    d.types.forEach(function (t) { h += statLine(t.label, t.count + '  ·  ' + typePct(t.count) + '%'); });
    return h;
  }

  function edGroup(gi) {
    var g = data.groups[gi];
    var id = g.id;
    var h = '<div class="ed-h">' + esc(g.title) + ' — copy</div>';
    h += '<div class="ed-sub">Counts are computed from the Data table (' + g.total + ' processes, ' + g.critical + ' critical). Edit the text below.</div>';
    h += textArea('copy.' + id + '.kpiNote', 'KPI note');
    h += textArea('copy.' + id + '.executiveMessage', 'Executive message');
    h += '<div class="ed-h">Drivers (computed)</div>';
    g.drivers.forEach(function (dr) {
      var plats = (dr.perPlatform || []).map(function (p) { return p.system + ' ' + p.count; }).join(' · ');
      h += statLine(dr.label, dr.count + (plats ? '   [' + plats + ']' : '') + (dr.critical ? '  · ' + dr.critical + ' crit' : ''));
    });
    h += '<div class="ed-h">Business areas affected (computed)</div>';
    g.areas.forEach(function (a) { h += statLine(a.area, a.count); });
    return h;
  }

  // ---- Data table: every process, fully editable (source of truth) ----
  var KNOWN_TYPES = ['ETL', 'integrationFlow', 'Workflow', 'RPA', 'JOB', 'BBG-Retrieve', 'BBG-Submit', 'Scheduled Process Oracle', 'Dags', 'WindowsTask'];
  function edData() {
    var rows = data.rows || [];
    var systems = uniq(rows.map(function (r) { return r.system; }).filter(Boolean)).sort();
    var drivers = uniq(rows.map(function (r) { return r.driver; }).filter(Boolean)).sort();
    var areaCodes = uniq(rows.map(function (r) { return r.area; }).filter(Boolean)).sort();
    var types = uniq(KNOWN_TYPES.concat(rows.map(function (r) { return r.tipo; }).filter(Boolean)));
    var bizAreas = ((data.config && data.config.areasOrder) || []).filter(function (a) { return a !== 'Unclassified'; });
    function dl(id, arr) { return '<datalist id="' + id + '">' + arr.map(function (o) { return '<option value="' + esc(o) + '"></option>'; }).join('') + '</datalist>'; }
    var lists = dl('dl-sys', systems) + dl('dl-drv', drivers) + dl('dl-area', areaCodes) + dl('dl-ty', types);
    var head = '<div class="ed-sub">Every process is editable here. Changes recompute all slide counts and percentages live. <b>' + rows.length + '</b> processes.</div>' +
      '<div class="dt-tools"><input type="text" id="dt-search" placeholder="Filter by process, system, driver, area…"/>' +
      '<button type="button" class="btn-ghost" id="dt-add">+ Add process</button></div>';
    var thead = '<tr><th>#</th><th>Process (Schedule Name)</th><th>System</th><th>Type</th><th>Area code</th><th>Driver</th><th>Área Negocio</th><th>Crit</th><th>→ Business area</th><th></th></tr>';
    var body = rows.map(function (r, i) { return dataRowHtml(r, i, bizAreas); }).join('');
    return lists + head + '<div class="dt-wrap"><table class="dt"><thead>' + thead + '</thead><tbody id="dt-body">' + body + '</tbody></table></div>';
  }
  function dataRowHtml(r, i, bizAreas) {
    var biz = '<option value=""></option>' + bizAreas.map(function (a) { return '<option' + (r.areaNegocio === a ? ' selected' : '') + '>' + esc(a) + '</option>'; }).join('');
    return '<tr data-i="' + i + '" class="dt-row">' +
      '<td class="dt-n">' + (i + 1) + '</td>' +
      '<td><input data-f="name" value="' + esc(r.name) + '" class="w-nm"/></td>' +
      '<td><input list="dl-sys" data-f="system" value="' + esc(r.system) + '" class="w-sys"/></td>' +
      '<td><input list="dl-ty" data-f="tipo" value="' + esc(r.tipo) + '" class="w-ty"/></td>' +
      '<td><input list="dl-area" data-f="area" value="' + esc(r.area) + '" class="w-ar"/></td>' +
      '<td><input list="dl-drv" data-f="driver" value="' + esc(r.driver) + '" class="w-dr"/></td>' +
      '<td><select data-f="areaNegocio" class="w-bn">' + biz + '</select></td>' +
      '<td class="dt-c"><input type="checkbox" data-f="critico"' + (r.critico ? ' checked' : '') + '/></td>' +
      '<td class="dt-derived">' + esc(r._area || '') + '</td>' +
      '<td><button type="button" class="dt-del" title="Delete process">✕</button></td>' +
      '</tr>';
  }

  function edMapping() {
    var m = data.mapping || { directAreaMap: {}, usageAreaMap: {}, systemAreaLookup: {} };
    var h = '<div class="ed-sub">These are the classification tables. Editing them re-runs the classifier live — the area breakdown on every slide updates immediately (no rebuild needed).</div>';
    h += '<div class="ed-h">Direct area map</div><div class="ed-sub">Internal <code>Area</code> code → executive area (applied first, when Area is present).</div>';
    h += mapRows('mapping.directAreaMap', m.directAreaMap);
    h += '<div class="ed-h">Usage → area map</div><div class="ed-sub">System <code>Area/Usage</code> → executive area (used for text-inferred rows).</div>';
    h += mapRows('mapping.usageAreaMap', m.usageAreaMap);
    h += '<div class="ed-h">System → Area/Usage lookup</div><div class="ed-sub">Matched against <code>Schedule Name</code> to infer areas for un-tagged rows.</div>';
    h += mapRows('mapping.systemAreaLookup', m.systemAreaLookup);
    return h;
  }
  function mapRows(base, obj) {
    return Object.keys(obj).map(function (k) {
      return '<div class="map-row"><input type="text" value="' + esc(k) + '" disabled />' +
        '<span class="arrow">→</span>' +
        '<input type="text" data-path="' + esc(base) + '.' + esc(k) + '" /></div>';
    }).join('');
  }

  function edNextSteps() {
    var h = '<div class="ed-h">Next steps</div>';
    data.nextSteps.forEach(function (s, i) {
      h += '<div class="ed-h" style="font-size:14px">Step ' + (i + 1) + '</div>';
      h += textArea('nextSteps.' + i + '.title', 'Title');
      h += textArea('nextSteps.' + i + '.body', 'Body');
    });
    return h;
  }

  // Slide text tab — every hard-coded string on the slides, grouped by slide.
  function edText() {
    var h = '<div class="ed-sub">Edit any text that appears on the slides. Hover a field for the ✎ edit cue. Changes are live and never appear in exported images.</div>';
    var groups = [];
    var seen = {};
    TEXT_FIELDS.forEach(function (f) { if (!seen[f.slide]) { seen[f.slide] = []; groups.push(f.slide); } seen[f.slide].push(f); });
    groups.forEach(function (gname) {
      h += '<div class="ed-h">' + esc(gname) + '</div>';
      seen[gname].forEach(function (f) {
        var val = T(f.key);
        var isLong = String(val).length > 48;
        // data-textkey (not data-path): the keys contain dots, so they must be
        // treated as flat keys of data.text, not nested paths.
        h += isLong
          ? '<div class="ed-grid wide edit-row"><label>' + esc(f.label) + '</label><textarea data-textkey="' + esc(f.key) + '"></textarea></div>'
          : '<div class="ed-grid edit-row"><label>' + esc(f.label) + '</label><input type="text" data-textkey="' + esc(f.key) + '"/></div>';
      });
    });
    return h;
  }

  function getByPath(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
  }
  function setByPath(obj, path, val) {
    var keys = path.split('.'); var o = obj;
    for (var i = 0; i < keys.length - 1; i++) {
      if (o[keys[i]] == null) o[keys[i]] = {};
      o = o[keys[i]];
    }
    o[keys[keys.length - 1]] = val;
  }

  function bindEditorInputs() {
    // Flat text keys (Slide text tab) — keys contain dots, so store directly.
    editorBody.querySelectorAll('[data-textkey]').forEach(function (inp) {
      var key = inp.getAttribute('data-textkey');
      inp.value = T(key);
      inp.addEventListener('input', function () {
        if (!data.text) data.text = {};
        data.text[key] = inp.value;
        persist();
        renderCurrent();
      });
    });
    editorBody.querySelectorAll('[data-path]').forEach(function (inp) {
      var path = inp.getAttribute('data-path');
      var isList = inp.getAttribute('data-list') === '1';
      var cur = getByPath(data, path);
      if (isList && Array.isArray(cur)) inp.value = cur.join(', ');
      else if (cur != null) inp.value = cur;

      inp.addEventListener('input', function () {
        var v = inp.value;
        if (isList) { setByPath(data, path, v.split(',').map(function (s) { return s.trim(); }).filter(Boolean)); }
        else if (inp.type === 'number') { setByPath(data, path, v === '' ? 0 : Number(v)); }
        else { setByPath(data, path, v); }
        persist();
        recompute();   // mapping / support-list / copy edits affect the aggregates
        renderCurrent();
      });
    });
  }

  // ---- Data table grid: delegated editing, add/delete, filter ----
  function bindDataGrid() {
    var tbody = document.getElementById('dt-body');
    if (!tbody) return;

    // per-cell edits: update the row, re-derive, refresh the slide + the row's
    // derived cell — without re-rendering the grid (keeps input focus).
    function onCell(e) {
      var el = e.target;
      var f = el.getAttribute && el.getAttribute('data-f');
      if (!f) return;
      var tr = el.closest('tr'); if (!tr) return;
      var i = parseInt(tr.getAttribute('data-i'), 10);
      var row = data.rows[i]; if (!row) return;
      row[f] = (el.type === 'checkbox') ? el.checked : el.value;
      persist();
      recompute();
      renderCurrent();
      var dc = tr.querySelector('.dt-derived');
      if (dc) dc.textContent = row._area || '';
    }
    tbody.addEventListener('input', onCell);
    tbody.addEventListener('change', onCell);

    tbody.addEventListener('click', function (e) {
      var del = e.target.closest && e.target.closest('.dt-del');
      if (!del) return;
      var tr = del.closest('tr'); var i = parseInt(tr.getAttribute('data-i'), 10);
      data.rows.splice(i, 1);
      persist(); recompute(); renderCurrent(); renderEditor();
    });

    var addBtn = document.getElementById('dt-add');
    if (addBtn) addBtn.addEventListener('click', function () {
      var maxId = data.rows.reduce(function (m, r) { return Math.max(m, r.id || 0); }, 0);
      data.rows.push({ id: maxId + 1, name: 'New process', system: 'Pentaho', tipo: 'ETL', area: '', driver: 'External Integrations', areaNegocio: '', critico: false });
      persist(); recompute(); renderCurrent(); renderEditor();
      var wrap = document.querySelector('.dt-wrap'); if (wrap) wrap.scrollTop = wrap.scrollHeight;
    });

    var search = document.getElementById('dt-search');
    if (search) search.addEventListener('input', function () {
      var q = search.value.toLowerCase().trim();
      [].forEach.call(tbody.querySelectorAll('tr'), function (tr) {
        if (!q) { tr.style.display = ''; return; }
        // field values live in inputs/selects, not textContent
        var txt = '';
        [].forEach.call(tr.querySelectorAll('input,select'), function (el) { txt += ' ' + (el.value || ''); });
        var dc = tr.querySelector('.dt-derived'); if (dc) txt += ' ' + dc.textContent;
        tr.style.display = txt.toLowerCase().indexOf(q) >= 0 ? '' : 'none';
      });
    });
  }

  // ============================================================
  //  Wire up
  // ============================================================
  document.getElementById('btn-prev').addEventListener('click', function () { go(current - 1); });
  document.getElementById('btn-next').addEventListener('click', function () { go(current + 1); });
  document.getElementById('btn-export').addEventListener('click', exportPng);
  document.getElementById('btn-present').addEventListener('click', togglePresent);
  document.getElementById('btn-editor').addEventListener('click', openEditor);
  document.getElementById('btn-close-editor').addEventListener('click', closeEditor);
  document.getElementById('btn-publish').addEventListener('click', publishToGitHub);
  document.getElementById('btn-export-data').addEventListener('click', exportDataset);
  bindIfPresent('btn-gh-settings', function () { openGhConfig(); });
  bindIfPresent('gh-save', saveGhConfig);
  bindIfPresent('gh-forget', forgetGhToken);
  bindIfPresent('gh-close', function () { var p = document.getElementById('gh-config'); if (p) p.hidden = true; });
  function bindIfPresent(id, fn) { var el = document.getElementById(id); if (el) el.addEventListener('click', fn); }

  // Warn before leaving with unsaved edits (they no longer survive a reload).
  window.addEventListener('beforeunload', function (e) {
    if (dirty) { e.preventDefault(); e.returnValue = ''; }
  });
  editorOverlay.addEventListener('click', function (e) { if (e.target === editorOverlay) closeEditor(); });

  // Close the GitHub popover on outside click (but not when toggling it via ⚙).
  document.addEventListener('click', function (e) {
    var pop = document.getElementById('gh-config');
    if (!pop || pop.hidden) return;
    if (pop.contains(e.target)) return;
    if (e.target.closest && e.target.closest('#btn-gh-settings')) return;
    pop.hidden = true;
  });

  function ghPopOpen() { var p = document.getElementById('gh-config'); return p && !p.hidden; }
  document.addEventListener('keydown', function (e) {
    if (!editorOverlay.hidden) {
      // Escape closes the GitHub popover first, then the editor.
      if (e.key === 'Escape') { if (ghPopOpen()) { document.getElementById('gh-config').hidden = true; } else { closeEditor(); } }
      return;
    }
    if (e.key === 'Escape') { setPresent(false); return; }
    if (e.key === 'ArrowRight' || e.key === 'PageDown') go(current + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(current - 1);
    else if (e.key === 'f' || e.key === 'F') togglePresent();
    else if (e.key === 'e' || e.key === 'E') exportPng();
  });

  buildRail();
  renderCurrent();
  fit();
})();
