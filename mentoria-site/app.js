
const $ = (sel, el=document)=>el.querySelector(sel);
const $$ = (sel, el=document)=>[...el.querySelectorAll(sel)];

const state = { modules: [], brand: null };

async function loadData(){
  const res = await fetch('data/modules.json');
  const data = await res.json();
  state.modules = data.modules.sort((a,b)=>a.order-b.order);
  state.brand = data.brand;
}

function slugify(s){ return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

function viewHome(){
  const container = document.createElement('div');
  container.className = 'container';
  container.innerHTML = `
    <div class="search">
      <input id="q" class="input" placeholder="Buscar módulo, tema ou palavra‑chave..." />
      <button id="clear" class="button">Limpar</button>
    </div>
    <div id="grid" class="grid"></div>
    <p class="small">Dica: clique em um módulo para ver objetivo, passo a passo, checklist e tarefa. Este conteúdo está pronto para ser usado no SuperApp.</p>
  `;

  const grid = $('#grid', container);
  const render = (q="") => {
    grid.innerHTML = "";
    const qn = q.trim().toLowerCase();
    const items = state.modules.filter(m =>
      !qn || [m.title, m.objective, ...(m.sections?.flatMap(s=>[s.title, ...(s.items||[])] ) || [])]
        .join(" ").toLowerCase().includes(qn)
    );
    for(const m of items){
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        ${m.cover ? `<img class="cover" src="${m.cover}" alt="Capa ${m.title}"/>` : ''}
        <div class="body">
          <span class="tag">Módulo ${m.order}</span>
          <h3>${m.title}</h3>
          <p>${m.objective}</p>
        </div>
      `;
      card.addEventListener('click', ()=>navigate(`#/lesson/${m.id}/${m.slug || slugify(m.title)}`));
      grid.appendChild(card);
    }
  };

  $('#q', container).addEventListener('input', (e)=>render(e.target.value));
  $('#clear', container).addEventListener('click', ()=>{ $('#q', container).value=""; render(""); });
  render();
  return container;
}

function viewLesson(id){
  const m = state.modules.find(x=>x.id===id);
  if(!m) return el(`<div class="container"><p>Não encontrado.</p></div>`);

  const container = document.createElement('div');
  container.className = 'view';

  container.innerHTML = `
    <div class="hero">
      <div>
        <span class="tag">Módulo ${m.order}</span>
        <h2>${m.title}</h2>
        <p class="objective">${m.objective}</p>
        <p class="small">Rota para SuperApp: <code>/lesson/${m.id}/${m.slug || slugify(m.title)}</code></p>
        <a class="link" href="#/">← Voltar</a>
      </div>
      <div>${m.cover ? `<img src="${m.cover}" alt="Capa ${m.title}"/>` : ''}</div>
    </div>
    ${m.sections?.map(s=>sectionHTML(s)).join('') || ''}
  `;
  return container;
}

function sectionHTML(s){
  const ul = (s.items||[]).map(i=>`<li>${i}</li>`).join('');
  return `<section class="section"><h4>${s.title}</h4><ul>${ul}</ul></section>`;
}

function el(html){ const d=document.createElement('div'); d.innerHTML=html; return d.firstElementChild; }

function navigate(hash){
  window.location.hash = hash;
}

function router(){
  const app = $('#app');
  const hash = window.location.hash || '#/';
  const [_, base, a, b] = hash.split('/'); // #/, #/lesson/:id/:slug
  app.innerHTML = '';
  if(base === '' || base === '#'){ app.appendChild(viewHome()); }
  else if(base === 'lesson' && a){ app.appendChild(viewLesson(a)); }
  else if(base === 'sobre'){
    app.appendChild(el(`<div class="container"><h2>Sobre</h2><p>Material oficial da Mentoria PixelUp. Este site é estático (SPA) e o JSON em <code>data/modules.json</code> pode ser consumido pelo SuperApp.</p></div>`));
  } else { app.appendChild(el('<div class="container"><p>Rota não encontrada.</p></div>')); }
}

(async function init(){
  document.getElementById('year').textContent = new Date().getFullYear();
  await loadData();
  router();
  window.addEventListener('hashchange', router);
})();
