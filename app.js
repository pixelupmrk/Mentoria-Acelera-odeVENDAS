const App=(()=>{const e=document.getElementById("app"),t=document.getElementById("search"),n=document.getElementById("installBtn");let a=null,o=null;function s(){const t=location.hash.slice(1),n=t.split("/"),a=n[1],o=n[2],s=n[3];return t&&""!==a?"module"===a?i(o):"lesson"===a?r(o,s):"certificate"===a?c():l():l()}function l(){return u().then((t=>{const n=d(t),a=p.get().last;let o="#";a&&([m,l]=a.split("/"),o=`#/lesson/${m}/${l}`),e.innerHTML=`
      <section class="card">
        <h1>Mentoria PixelUp • App de Aulas</h1>
        <p class="note">Instale no celular e acompanhe o progresso. Parte do conteúdo funciona offline (vídeos hospedados não ficam offline).</p>
        <div class="kv">
          <div><span class="badge">Progresso</span></div>
          <div>
            <div class="progress"><i style="width:${n.pct}%"></i></div>
            <small>${n.done}/${n.total} aulas • ${n.pct}%</small>
          </div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 12px">
          <a href="${o}" class="btn">${a?"Continuar":"Começar"}</a>
          <a href="#/certificate" class="btn ghost">Gerar Certificado</a>
        </div>
      </section>

      <section class="grid" style="margin-top:16px">
        ${t.modules.map((e=>{const t=h(e);return`
            <article class="module">
              <h3>${e.title}</h3>
              <p class="note">${e.summary}</p>
              <div class="progress"><i style="width:${t.pct}%"></i></div>
              <small>${t.done}/${t.total} aulas</small>
              <div style="margin-top:10px">
                <a class="btn" href="#/module/${e.slug}">Ver aulas</a>
              </div>
            </article>
          `})).join("")}
      </section>
    `}))}function i(t){return u().then((n=>{const a=n.modules.find((e=>e.slug===t));if(!a)return e.innerHTML=`<section class="card"><p>Módulo não encontrado.</p></section>`;const o=h(a);e.innerHTML=`
      <section class="card">
        <a class="btn ghost" href="#/">← Voltar</a>
        <h2 style="margin:8px 0">${a.title}</h2>
        <p class="note">${a.summary}</p>
        <div class="progress"><i style="width:${o.pct}%"></i></div>
        <small>${o.done}/${o.total} aulas</small>
        <hr>
        ${a.lessons.map((e=>{const n=p.isDone(a.slug,e.slug);return`
            <div class="lesson">
              <div>
                <strong>${e.title}</strong><br>
                <small class="note">${n?"Concluída":"Pendente"}</small>
              </div>
              <a class="btn" href="#/lesson/${a.slug}/${e.slug}">${n?"Revisar":"Assistir"}</a>
            </div>
          `})).join("")}
      </section>
    `}))}function r(t,n){return u().then((a=>{const o=a.modules.find((e=>e.slug===t));if(!o)return e.innerHTML=`<section class="card"><p>Módulo não encontrado.</p></section>`;const s=o.lessons.find((e=>e.slug===n));if(!s)return e.innerHTML=`<section class="card"><p>Aula não encontrada.</p></section>`;const l=(s.attachments||[]).map((e=>`<a class="btn ghost" href="${e.url}" download>${e.title}</a>`)).join(" ");e.innerHTML=`
      <section class="card">
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
          <a class="btn ghost" href="#/module/${t}">← Módulo</a>
          <span class="badge">${o.title}</span>
        </div>
        <h2 style="margin:8px 0">${s.title}</h2>
        ${s.video?`<iframe src="${s.video}" title="Vídeo" allowfullscreen></iframe>`:'<div class="note">Sem vídeo anexado.</div>'}
        <p style="margin-top:10px">${s.content||""}</p>
        <div class="attach">${l}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
          <button id="doneBtn" class="btn">${p.isDone(t,n)?"Concluída ✓":"Marcar como concluída"}</button>
          ${s.quiz?`<a class="btn ghost" id="quizBtn" href="#">Fazer Quiz</a>`:""}
        </div>
      </section>
    `,document.getElementById("doneBtn").addEventListener("click",(()=>{p.markDone(t,n),r(t,n)})),s.quiz&&document.getElementById("quizBtn").addEventListener("click",(e=>{e.preventDefault(),f(o,s)}));const i=p.get();i.last=`${t}/${n}`,p.set(i)}))}function f(t,n){const a=n.quiz;e.innerHTML=`
      <section class="card quiz">
        <a class="btn ghost" href="#/lesson/${t.slug}/${n.slug}">← Voltar</a>
        <h3>Quiz: ${n.title}</h3>
        <p>${a.question}</p>
        ${a.options.map(((e,t)=>`
          <label class="opt"><input type="radio" name="q" value="${t}"> <span>${e}</span></label>
        `)).join("")}
        <div style="margin-top:10px">
          <button id="submitQuiz" class="btn">Enviar</button>
        </div>
        <div id="quizResult" style="margin-top:10px"></div>
      </section>
    `,document.getElementById("submitQuiz").addEventListener("click",(()=>{const e=document.querySelector('input[name="q"]:checked'),t=document.getElementById("quizResult");if(!e)return void(t.innerHTML='<span class="note">Selecione uma opção.</span>');const n=Number(e.value)===a.correctIndex;t.innerHTML=n?"✅ Correto! "+(a.explanation||""):"❌ Não é isso. "+(a.explanation||"")}))}function c(){const t=a,n=y(t||{modules:[]});e.innerHTML=`
      <section class="card">
        <a href="#/" class="btn ghost">← Voltar</a>
        <h2>Certificado de Conclusão</h2>
        <p class="note">Disponível ao concluir 100% das aulas. Seu progresso: <strong>${n.pct}%</strong></p>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:10px 0">
          <input id="studentName" class="search" placeholder="Seu nome completo" style="min-width:300px">
          <button id="genCert" class="btn" ${100===n.pct?"":"disabled"}>Gerar PNG</button>
        </div>
        <canvas id="certCanva" width="1280" height="720" style="display:none"></canvas>
        <div id="certOut" style="margin-top:12px"></div>
      </section>
    `;const o=document.getElementById("genCert");o&&o.addEventListener("click",(()=>{const e=(document.getElementById("studentName").value||"Aluno PixelUp").trim(),t=document.getElementById("certCanva").getContext("2d");t.fillStyle="#0b0f1a",t.fillRect(0,0,1280,720),t.strokeStyle="#0ea5ff",t.lineWidth=6,t.strokeRect(24,24,1232,672),t.fillStyle="#e6f1ff",t.font="bold 48px sans-serif",t.fillText("Certificado de Conclusão",380,140),t.font="bold 64px sans-serif",t.fillStyle="#33ccff",t.fillText(e,320,260),t.fillStyle="#e6f1ff",t.font="24px sans-serif",t.fillText("Concluiu 100% da Mentoria PixelUp.",420,320),t.fillText("Data: "+(new Date).toLocaleDateString("pt-BR"),420,360),t.font="20px sans-serif",t.fillText("PixelUp Marketing Digital & Mídia",420,420);const n=document.getElementById("certCanva").toDataURL("image/png"),a=document.getElementById("certOut");a.innerHTML=`<a class="btn" download="certificado-pixelup.png" href="${n}">Baixar Certificado</a>`}))}const p={key:"pixelup-mentoria-state",get(){try{return JSON.parse(localStorage.getItem(this.key))||{done:{},last:null}}catch{return{done:{},last:null}}},set(e){localStorage.setItem(this.key,JSON.stringify(e))},markDone(e,t){const n=this.get(),a=`${e}/${t}`;n.done[a]=!0,n.last=a,this.set(n)},isDone(e,t){return!!this.get().done[`${e}/${t}`]}},u=async()=>{if(a)return a;const e=await fetch("modules.json");return a=await e.json()},h=e=>{const t=e.lessons.length,n=e.lessons.filter((t=>p.isDone(e.slug,t.slug))).length;return{done:n,total:t,pct:Math.round(n/t*100)||0}},y=e=>{const t=e.modules.map(h),n=t.reduce(((e,t)=>e+t.done),0),a=t.reduce(((e,t)=>e+t.total),0);return{done:n,total:a,pct:Math.round(n/a*100)||0}};window.addEventListener("beforeinstallprompt",(e=>{e.preventDefault(),o=e,n.style.display="inline-flex"})),n&&n.addEventListener("click",(async()=>{if(!o)return;o.prompt();const{outcome:e}=await o.userChoice;o=null,n.textContent="accepted"===e?"Instalado!":"Tentar de novo"})),window.addEventListener("hashchange",s),t&&t.addEventListener("input",(async n=>{const a=n.target.value.toLowerCase(),o=await u(),s=[];o.modules.forEach((e=>e.lessons.forEach((t=>{const n=(e.title+" "+t.title+" "+(t.content||"")).toLowerCase();n.includes(a)&&s.push({m:e,l:t})})))),a?e.innerHTML=`
      <section class="card">
        <h2>Resultados para: "${a}"</h2>
        ${s.length?s.map((e=>`
          <div class="lesson">
            <div>
              <strong>${e.l.title}</strong><br>
              <small class="note">${e.m.title}</small>
            </div>
            <a class="btn" href="#/lesson/${e.m.slug}/${e.l.slug}">Abrir</a>
          </div>
        `)).join(""):'<p class="note">Nada encontrado.</p>'}
      </section>
    `:s()})),u().then(s);})();