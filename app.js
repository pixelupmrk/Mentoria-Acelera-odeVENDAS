// ====== Configurações ======
const COVER_BASE = 'ativos';   // troque para a pasta onde suas capas estão (ex.: 'ativos')
const SHOW_COVERS = false;     // mude para true quando subir cover-m1.png..cover-m8.png

// ====== Sanitiza SW/cache antigo (evita tela vazia) ======
(function () {
  try {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
    }
    if (window.caches) {
      caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
    }
  } catch (e) {}
})();

// ====== Helpers ======
function $(s, el) { return (el || document).querySelector(s); }
const app = $("#app");

const STORE = {
  A: 'pxup-answers',
  P: 'pxup-progress',
  getA() { try { return JSON.parse(localStorage.getItem(this.A) || '{}'); } catch { return {}; } },
  setA(v) { localStorage.setItem(this.A, JSON.stringify(v)); },
  getP() { try { return JSON.parse(localStorage.getItem(this.P) || '{"done":{}}'); } catch { return { done: {} }; } },
  setP(v) { localStorage.setItem(this.P, JSON.stringify(v)); }
};
const pct = (d, t) => t ? Math.round(d / t * 100) : 0;
const modStats = m => {
  const d = (STORE.getP().done) || {};
  const total = m.lessons.length;
  const done = m.lessons.filter(l => d[m.slug + '/' + l.slug]).length;
  return { done, total, pct: pct(done, total) };
};
const allStats = DATA => {
  const s = DATA.modules.map(modStats);
  let d = 0, t = 0; s.forEach(x => { d += x.done; t += x.total; });
  return { done: d, total: t, pct: pct(d, t) };
};

// ====== Render ======
function saveForm(ms, ls) {
  const a = STORE.getA(); a[ms + '/' + ls] = {};
  [...app.querySelectorAll('[data-field]')].forEach(i => a[ms + '/' + ls][i.dataset.field] = i.value.trim());
  STORE.setA(a);
}
function loadForm(ms, ls) {
  const a = (STORE.getA()[ms + '/' + ls]) || {};
  [...app.querySelectorAll('[data-field]')].forEach(i => { if (a[i.dataset.field] != null) i.value = a[i.dataset.field]; });
}
function markDone(ms, ls) {
  const p = STORE.getP(); p.done || (p.done = {}); p.done[ms + '/' + ls] = true; STORE.setP(p);
}

function renderHome(DATA) {
  const s = allStats(DATA);
  app.innerHTML = `
  <section class="card">
    <h1>Mentoria PixelUp • App de Aulas</h1>
    <p class="note">Respostas ficam salvas neste dispositivo (localStorage).</p>
    <div style="display:grid;grid-template-columns:120px 1fr;gap:12px;align-items:center">
      <div class="badge">Progresso geral</div>
      <div><div class="progress"><i style="width:${s.pct}%"></i></div><small>${s.done}/${s.total} aulas • ${s.pct}%</small></div>
    </div>
  </section>
  <section class="grid" style="margin-top:16px">
    ${DATA.modules.map(m => {
      const st = modStats(m);
      const coverHTML = (SHOW_COVERS && m.cover) ? `<img src="${m.cover}" onerror="this.remove()">` : '';
      return `
      <article class="module">
        <div class="cover">${coverHTML}</div>
        <h3>${m.title}</h3>
        <p class="note">${m.summary || ''}</p>
        <div class="progress"><i style="width:${st.pct}%"></i></div>
        <small>${st.done}/${st.total} aulas</small>
        <div style="margin-top:10px"><a class="btn" href="#/module/${m.slug}">Ver aulas</a></div>
      </article>`;
    }).join('')}
  </section>`;
}

function renderModule(DATA, slug) {
  const m = DATA.modules.find(x => x.slug === slug);
  if (!m) { app.innerHTML = '<section class="card"><p>Módulo não encontrado.</p></section>'; return; }
  const st = modStats(m);
  const coverHTML = (SHOW_COVERS && m.cover) ? `<img src="${m.cover}" onerror="this.remove()">` : '';
  app.innerHTML = `<section class="card">
    <a class="btn ghost" href="#/">← Início</a>
    <div class="cover" style="margin-top:10px">${coverHTML}</div>
    <h2 style="margin:10px 0">${m.title}</h2>
    <p class="note">${m.summary || ''}</p>
    <div class="progress"><i style="width:${st.pct}%"></i></div><small>${st.done}/${st.total} aulas</small>
    <hr/>
    ${m.lessons.map(l => {
      const done = (STORE.getP().done || {})[m.slug + '/' + l.slug];
      return `
      <div class="lesson">
        <div><strong>${l.title}</strong><br><small class="note">${done ? 'Concluída' : 'Pendente'}</small></div>
        <a class="btn" href="#/lesson/${m.slug}/${l.slug}">${done ? 'Revisar' : 'Abrir'}</a>
      </div>`;
    }).join('')}
  </section>`;
}

function renderLesson(DATA, ms, ls) {
  const m = DATA.modules.find(x => x.slug === ms);
  const l = m && m.lessons.find(x => x.slug === ls);
  if (!m || !l) { app.innerHTML = '<section class="card"><p>Aula não encontrada.</p></section>'; return; }
  const coverHTML = (SHOW_COVERS && l.cover) ? `<img src="${l.cover}" onerror="this.remove()">` : '';
  app.innerHTML = `<section class="card">
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <a class="btn ghost" href="#/module/${m.slug}">← ${m.title}</a><span class="badge">Aula</span>
    </div>
    <div class="cover" style="margin-top:10px">${coverHTML}</div>
    <h2 style="margin:10px 0">${l.title}</h2>
    <h3>Apresentação</h3>
    <ul class="note" style="line-height:1.6;margin-top:6px">${(l.presentation || []).map(p => `<li>${p}</li>`).join('')}</ul>
    <hr/>
    <h3>Questionário Prático</h3>
    <form class="form">
      ${(l.form || []).map(q => {
        const base = `<label for="${q.id}">${q.label}</label>`;
        if (q.type === 'text')   return base + `<input data-field="${q.id}" id="${q.id}" type="text" placeholder="Digite aqui...">`;
        if (q.type === 'select') return base + `<select data-field="${q.id}" id="${q.id}">${(q.options || []).map(o => `<option>${o}</option>`).join('')}</select>`;
        return base + `<textarea data-field="${q.id}" id="${q.id}" placeholder="Escreva aqui..."></textarea>`;
      }).join('')}
    </form>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
      <button id="saveBtn" class="btn">Salvar respostas</button>
      <button id="doneBtn" class="btn ghost">Marcar como concluída</button>
      <button id="exportBtn" class="btn ghost">Exportar (.json)</button>
      <button id="printBtn" class="btn ghost">Imprimir</button>
    </div>
    <p id="status" class="note" style="margin-top:8px"></p>
  </section>`;

  $("#saveBtn").addEventListener("click", () => { saveForm(m.slug, l.slug); flash("Respostas salvas!"); });
  $("#doneBtn").addEventListener("click", () => { saveForm(m.slug, l.slug); markDone(m.slug, l.slug); flash("Aula marcada como concluída."); });
  $("#exportBtn").addEventListener("click", () => {
    saveForm(m.slug, l.slug);
    const data = STORE.getA()[m.slug + '/' + l.slug] || {};
    const blob = new Blob([JSON.stringify({ module: m.title, lesson: l.title, answers: data }, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${m.slug}-${l.slug}-respostas.json`; a.click();
  });
  $("#printBtn").addEventListener("click", () => window.print());
  loadForm(m.slug, l.slug);

  function flash(msg) { const s = $("#status"); s.textContent = msg; setTimeout(() => s.textContent = "", 2000); }
}

// ====== Boot ======
function rewriteCovers(DATA) {
  DATA.modules.forEach(m => {
    if (m.cover) m.cover = m.cover.replace('assets', COVER_BASE);
    (m.lessons || []).forEach(l => { if (l.cover) l.cover = l.cover.replace('assets', COVER_BASE); });
  });
  if (!SHOW_COVERS) {
    DATA.modules.forEach(m => { m.cover = null; (m.lessons || []).forEach(l => l.cover = null); });
  }
}

async function init() {
  // Busca o JSON sem cache
  let DATA = null;
  try {
    const res = await fetch('modulos.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('modulos.json não encontrado');
    DATA = await res.json();
  } catch (e) {
    app.innerHTML = `<section class="card"><h2>Erro ao carregar conteúdo</h2><p class="note">${String(e.message || e)}</p></section>`;
    return;
  }

  rewriteCovers(DATA);

  // Busca
  $("#homeBtn").addEventListener("click", () => location.hash = "");
  $("#search").addEventListener("input", (e) => {
    const q = (e.target.value || "").toLowerCase().trim();
    if (!q) { router(); return; }
    const res = [];
    DATA.modules.forEach(m => m.lessons.forEach(l => {
      const hay = (m.title + " " + (m.summary || " ") + " " + l.title + " " + (l.presentation || []).join(" ")).toLowerCase();
      if (hay.includes(q)) res.push({ m, l });
    }));
    app.innerHTML = `<section class="card"><h2>Resultados para: “${q}”</h2>${
      res.length
        ? res.map(({ m, l }) => `<div class="lesson"><div><strong>${l.title}</strong><br><small class="note">${m.title}</small></div><a class="btn" href="#/lesson/${m.slug}/${l.slug}">Abrir</a></div>`).join("")
        : '<p class="note">Nada encontrado.</p>'}</section>`;
  });

  // Router
  function router() {
    const p = (location.hash || '').slice(1).split('/').filter(Boolean);
    if (!p.length) return renderHome(DATA);
    if (p[0] === 'module' && p[1]) return renderModule(DATA, p[1]);
    if (p[0] === 'lesson' && p[1] && p[2]) return renderLesson(DATA, p[1], p[2]);
    renderHome(DATA);
  }
  window.addEventListener('hashchange', router);
  router();
}

document.addEventListener('DOMContentLoaded', init);
