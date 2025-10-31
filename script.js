const navigationElement = document.getElementById('course-navigation');
const lessonTitleElement = document.getElementById('lesson-title');
const lessonContentElement = document.getElementById('lesson-content');

// --- DADOS DO CURSO (Estrutura e Conteúdo Extraído) ---
const courseStructure = {
  "courseTitle": "Mentoria PixelUP: Acelera-deVENDAS",
  // Base URL para links de download de recursos originais
  "repositoryBaseUrl": "https://raw.githubusercontent.com/pixelupmrk/Mentoria-Acelera-odeVENDAS/main/", 
  "modules": [
    // MÓDULO 0
    {
      "moduleID": "M0",
      "moduleTitle": "Módulo 0: Boas-Vindas e Apresentação",
      "folderName": "Apresentacao Mentoria",
      "lessons": [
        {
          "lessonTitle": "Introdução e Alinhamento de Expectativas",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "apresentacao.docx",
          "htmlContent": `
            <p>Seja muito bem-vindo(a) à Mentoria PixelUP Acelera-deVENDAS!</p>
            <p>Este módulo é o seu ponto de partida. Ele foi criado para alinhar expectativas e apresentar o método de 8 módulos que transformará sua presença online em uma máquina de vendas.</p>
            <h3>O que esperar da Mentoria:</h3>
            <ul>
                <li><strong>Foco em Vendas:</strong> Todas as aulas e estratégias visam converter seguidores em clientes pagantes.</li>
                <li><strong>Ação Imediata:</strong> Estruturas práticas para você aplicar hoje mesmo (vídeos, copy, CRM).</li>
                <li><strong>Design PixelUP:</strong> Aprenda a criar um visual que conecta e gera autoridade.</li>
            </ul>
            <p>Comece pelo Módulo 1 para definir os fundamentos do seu negócio e posicionamento.</p>
          `
        }
      ]
    },
    // MÓDULO 1: FUNDAMENTOS (Conteúdo de Mentoria MD01.docx)
    {
      "moduleID": "M1",
      "moduleTitle": "Módulo 1: Fundamentos do Negócio e Posicionamento",
      "folderName": "Modulo 01",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Fundamentos e Posicionamento",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Mentoria MD01.docx",
          "htmlContent": `
            <h3>1. Definição da Persona Ideal</h3>
            <p>Antes de qualquer estratégia, é essencial saber <strong>com quem você está falando</strong>. A persona é a representação semifictícia do seu cliente ideal, baseada em dados reais e comportamentos.</p>
            <p><strong>Exercício prático sugerido:</strong> Crie sua persona respondendo perguntas como: Nome fictício, idade, profissão, quais são suas dores e desejos? Onde ela busca informação? Quais redes sociais usa?</p>
            
            <h3>2. Proposta de Valor e Diferenciação no Mercado</h3>
            <p>Por que alguém deve comprar de você e não do concorrente? A proposta de valor comunica o que você entrega, como entrega e por que é relevante.</p>
            <p><strong>Dica prática:</strong> Escreva uma frase simples que responda: <em>“Eu ajudo [persona] a [solução] através de [diferencial].”</em></p>
            
            <h3>3. Escolha do Plano de Serviço Ideal</h3>
            <p>Com base na persona e na proposta de valor, o cliente pode escolher o plano mais adequado (básico, intermediário ou avançado). Esse alinhamento evita frustrações.</p>
            <p><strong>Atividade orientada:</strong> Reflita: Qual plano atende melhor o estágio atual do seu negócio? Quais recursos e suportes você realmente precisa agora?</p>
          `
        },
        {
          "lessonTitle": "Recurso: Questionário para Definição de Persona",
          "contentType": "RECURSO",
          "fileName": "mentoria MD1.1.docx",
          "htmlContent": "<p>Acesse o material de apoio para preencher o questionário detalhado e criar sua persona com excelência.</p>"
        }
      ]
    },
    // MÓDULO 2: ALGORITMO (Conteúdo de Doc MD02.docx)
    {
      "moduleID": "M2",
      "moduleTitle": "Módulo 2: O Algoritmo do Meta",
      "folderName": "modulo 02",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Como o Algoritmo Funciona",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Doc MD02.docx",
          "htmlContent": `
            <h3>1. Como o algoritmo funciona e entrega os conteúdos</h3>
            <p>O algoritmo da Meta prioriza conteúdos que geram **interação rápida** (curtidas, comentários, compartilhamentos e tempo de visualização). 📌 Ou seja: quanto mais relevante for o seu conteúdo para o público, mais ele será entregue.</p>
            
            <h3>2. O que influencia o alcance orgânico</h3>
            <ul>
                <li>Qualidade do conteúdo</li>
                <li>Engajamento nos primeiros minutos</li>
                <li>Frequência de publicações</li>
                <li>Relacionamento com o público (DMs, respostas, salvamentos)</li>
            </ul>
            
            <h3>3. Engajamento inicial e comportamento do usuário</h3>
            <p>Os primeiros minutos são decisivos. O algoritmo testa seu conteúdo com um grupo pequeno: se houver boas reações, ele expande a entrega.</p>
            <p>👁 Além disso, se o usuário interage com seus stories e responde mensagens, o algoritmo entende que há conexão e mostra mais conteúdos seus a ele.</p>
          `
        },
        {
          "lessonTitle": "Recurso: Dica - Gancho Forte e CTA",
          "contentType": "RECURSO",
          "fileName": "Doc MD2.1.docx",
          "htmlContent": "<p>Acesse o recurso e aprenda a criar ganchos que prendem a atenção no primeiro segundo, e chamadas para ação (CTA) que convertem.</p>"
        }
      ]
    },
    // MÓDULO 3: CRONOGRAMA (Conteúdo de Doc MD3.0.docx)
    {
      "moduleID": "M3",
      "moduleTitle": "Módulo 3: Cronograma de Postagens Estratégico",
      "folderName": "modulo 03",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Estratégia de Cronograma",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Doc  MD3.0.docx",
          "htmlContent": `
            <h3>1. Melhores horários e dias para postagem</h3>
            <p>O ideal é postar quando seu público está mais ativo — geralmente entre <strong>11h e 13h ou 18h e 20h, de terça a quinta.</strong></p>
            <p>📌 <strong>Dica:</strong> Use as métricas do Instagram (Insights) para ver quando seus seguidores estão online.</p>
            
            <h3>2. Frequência ideal por nicho</h3>
            <p>Mais importante que a quantidade, é a <strong>consistência</strong>. A frequência varia:</p>
            <ul>
                <li>**Estética e beleza:** 4 a 5 posts por semana (reels + stories)</li>
                <li>**B2B e serviços:** 3 posts bem elaborados por semana</li>
            </ul>
            
            <h3>3. Templates e modelos de calendário</h3>
            <p>Use modelos prontos no Canva ou ChatGPT com categorias como: Conteúdo educativo, Prova social, Chamada para ação e Oferta/promoção.</p>
          `
        },
        {
          "lessonTitle": "Recurso: Exemplo de Cronograma Semanal",
          "contentType": "RECURSO",
          "fileName": "Doc  MD3.1.docx",
          "htmlContent": "<p>Baixe o exemplo de Cronograma de Postagens Semanal e adapte-o à sua rotina para garantir a consistência de conteúdo.</p>"
        }
      ]
    },
    // MÓDULO 4: CONTEÚDO (Conteúdo de Doc MD4.0.docx)
    {
      "moduleID": "M4",
      "moduleTitle": "Módulo 4: Conteúdo que Conecta",
      "folderName": "Modulo 04",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Estrutura de Vídeo e Edição",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Doc MD4.0.docx",
          "htmlContent": `
            <h3>1. Como gravar vídeos que engajam: estrutura (gancho, valor, CTA)</h3>
            <p>Um vídeo precisa de uma ordem estratégica para reter a atenção:</p>
            <ol>
                <li><strong>Gancho (1º segundo):</strong> Frase impactante para fazer a pessoa parar.</li>
                <li><strong>Valor:</strong> Entregue uma dica, solução ou informação útil rapidamente.</li>
                <li><strong>CTA:</strong> Incentive o público a comentar, salvar, compartilhar ou te chamar no Whats.</li>
            </ol>
            
            <h3>2. Edição prática com CapCut ou InShot</h3>
            <p>Com o CapCut ou InShot, você pode: cortar partes desnecessárias, adicionar legendas automáticas, inserir trilha sonora e efeitos. 💡 Dica: Mantenha cortes rápidos e música de fundo suave.</p>
            
            <h3>3. Design com Canva: dicas de layout, fontes e identidade visual</h3>
            <p>Use fontes legíveis e cores da sua marca e crie um padrão visual para seus posts serem reconhecidos no feed.</p>
          `
        },
        {
          "lessonTitle": "Recurso: Desafio de Vídeo Teste e Roteiro",
          "contentType": "RECURSO",
          "fileName": "Doc MD4.1.docx",
          "htmlContent": "<p>Acesse o desafio '1 Dica, 1 Minuto' e o roteiro pronto para criar seu primeiro vídeo de alto impacto.</p>"
        }
      ]
    },
    // MÓDULO 5: COPYWRITING (Conteúdo de Doc MD5.0.docx)
    {
      "moduleID": "M5",
      "moduleTitle": "Módulo 5: Copywriting com ChatGPT",
      "folderName": "Modulo 05",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Fórmulas de Copy e Prompts",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Doc  MD5.0.docx",
          "htmlContent": `
            <h3>1. Como criar textos persuasivos com IA</h3>
            <p>O ChatGPT é uma ferramenta poderosa para gerar textos que vendem. A chave está em **saber o que pedir** e como direcionar a IA com clareza.</p>
            
            <h3>2. Fórmulas testadas: AIDA, PAS, 4Ps</h3>
            <p>Use essas estruturas como base para montar seus prompts:</p>
            <ul>
                <li><strong>AIDA:</strong> Atenção, Interesse, Desejo, Ação</li>
                <li><strong>PAS:</strong> Problema, Agitação, Solução</li>
                <li><strong>4Ps:</strong> Problema, Promessa, Prova, Proposta</li>
            </ul>
            
            <h3>3. Títulos e legendas que geram cliques e salvamentos</h3>
            <p>Títulos e primeiras frases precisam ser chamativas. Use perguntas, listas, números e ganchos fortes. ✨ O segredo está em provocar curiosidade e entregar valor.</p>
          `
        },
        {
          "lessonTitle": "Recurso 1: Como Ter uma Boa Relação com o ChatGPT",
          "contentType": "RECURSO",
          "fileName": "Doc  MD5.1.docx",
          "htmlContent": "<p>Guia prático para desenvolver uma boa relação com o ChatGPT, usando contextualização e refinamento nos seus pedidos.</p>"
        },
        {
          "lessonTitle": "Recurso 2: Prompt Base PixelUp Personalizado",
          "contentType": "RECURSO",
          "fileName": "Doc  MD5.2.docx",
          "htmlContent": "<p>Baixe nosso modelo de Prompt Base – PixelUp. A fórmula pronta para gerar conteúdo de alta conversão!</p>"
        }
      ]
    },
    // MÓDULO 6: CRM (Conteúdo de DOC MD 6.0.docx)
    {
      "moduleID": "M6",
      "moduleTitle": "Módulo 6: Implementação de CRM",
      "folderName": "Modulo 06",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: O que é CRM e Ferramentas",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "DOC MD 6.0.docx",
          "htmlContent": `
            <h3>1. O que é CRM e por que sua empresa precisa</h3>
            <p>CRM (Customer Relationship Management) é uma ferramenta que organiza o relacionamento com seus leads e clientes. Com ele, você consegue <strong>acompanhá-los desde o primeiro contato até o fechamento da venda</strong>, mantendo tudo organizado.</p>
            <p>📌 Empresas que usam CRM vendem mais porque mantêm o controle sobre o funil.</p>
            
            <h3>2. Ferramentas gratuitas e pagas</h3>
            <p>Você pode começar com:</p>
            <ul>
                <li>**Trello:** Adaptado com colunas como “Novo Lead”, “Negociação”, “Fechado” (gratuito)</li>
                <li>**HubSpot CRM:** Ideal para gestão mais profissional (gratuito)</li>
                <li>**RD Station, Pipedrive:** Indicadas para times de vendas (pagas)</li>
            </ul>
            
            <h3>3. Construção de funil de vendas básico e organização de leads</h3>
            <p>Um funil simples pode ter 4 etapas: Contato Inicial, Conversa/Apresentação, Proposta enviada, Cliente fechado. 🎯 Organizar os leads por estágio ajuda a manter o foco.</p>
          `
        },
        {
          "lessonTitle": "Recurso 1: Exemplo de Funil de Vendas",
          "contentType": "RECURSO",
          "fileName": "DOC MD 6.1.docx",
          "htmlContent": "<p>Acesse o funil de vendas detalhado, com as etapas e ações práticas dentro do CRM.</p>"
        },
        {
          "lessonTitle": "Recurso 2: Opções de Remarketing com Leads",
          "contentType": "RECURSO",
          "fileName": "DOC MD 6.2.docx",
          "htmlContent": "<p>Descubra como segmentar e criar campanhas de Remarketing eficazes para leads que não fecharam a primeira proposta.</p>"
        }
      ]
    },
    // MÓDULO 7: PROCESSO COMERCIAL (Conteúdo de DOC MD07.docx)
    {
      "moduleID": "M7",
      "moduleTitle": "Módulo 7: Processo Comercial e Técnicas de Venda",
      "folderName": "Modulo 07",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Pitch, Rapport e Follow-up",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "DOC MD07.docx",
          "htmlContent": `
            <h3>1. Como montar um pitch comercial que gera interesse</h3>
            <p>O pitch precisa ser claro, direto e despertar curiosidade. Inclua: Quem você ajuda, O problema que resolve, O diferencial do seu serviço.</p>
            <p>🎯 <strong>Exemplo:</strong> <em>“Nós ajudamos negócios locais a atrair clientes todos os dias usando vídeos e tráfego pago com baixo custo.”</em></p>
            
            <h3>2. Rapport, gatilhos mentais e técnicas de espelhamento</h3>
            <p>O cliente compra quando sente confiança. Use:</p>
            <ul>
                <li><strong>Rapport:</strong> Usar linguagem e ritmo parecidos com o do cliente.</li>
                <li><strong>Gatilhos mentais:</strong> Escassez, autoridade, prova social, urgência.</li>
            </ul>
            
            <h3>3. Como conduzir um follow-up eficiente e sem pressão</h3>
            <p>A maioria das vendas acontece no 2º ou 3º contato. Use o CRM para agendar retornos e sempre traga um **valor novo** na abordagem.</p>
            <p>💬 Evite ser insistente. Seja consultivo.</p>
          `
        }
      ]
    },
    // MÓDULO 8: CONEXÃO (Conteúdo de Doc MD08.docx)
    {
      "moduleID": "M8",
      "moduleTitle": "Módulo 8: Conexão com a Audiência e Humanização",
      "folderName": "Modulo 08",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Humanização e Comunidade Leal",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Doc MD08.docx",
          "htmlContent": `
            <h3>1. Como gerar conexão real com o público (sem forçar)</h3>
            <p>Pessoas se conectam com pessoas. Mostrar sua rotina, bastidores e valores cria empatia. O segredo é <strong>ser autêntico, não perfeito.</strong></p>
            <p>💡 <strong>Dica:</strong> Use a câmera frontal e fale como se fosse para um amigo.</p>
            
            <h3>2. Estratégias de bastidores, vulnerabilidade e rotina nos stories</h3>
            <p>Os stories são o canal ideal para mostrar o que acontece por trás do conteúdo pronto. Compartilhe erros e aprendizados e traga o público para os bastidores de uma entrega.</p>
            
            <h3>3. Criando uma comunidade engajada e leal</h3>
            <p>Uma audiência fiel é construída com <strong>interação real e constância.</strong> Responda comentários e DMs com atenção e envolva seguidores com perguntas.</p>
            <p>🎯 Quem se sente visto, volta. E quem volta, compra.</p>
          `
        }
      ]
    }
  ]
};

// --- Lógica de Renderização (Reutilizada e Simplificada) ---

function displayContent(title, content, fileUrl, contentType) {
    lessonTitleElement.textContent = title;
    
    let htmlOutput = content;

    // Se for recurso, adiciona o botão de download no final
    if (contentType === 'RECURSO') {
        htmlOutput += `
            <div class="resource-box">
                <p>Este é um material de apoio para download. Clique no botão abaixo para acessar o arquivo original:</p>
                <a href="${fileUrl}" target="_blank" class="download-button-link">BAIXAR RECURSO: ${title}</a>
            </div>
        `;
    }

    lessonContentElement.innerHTML = htmlOutput;
    
    // Rola o conteúdo para o topo
    lessonContentElement.scrollTop = 0; 
}


function renderNavigation() {
    // 1. Renderiza o conteúdo inicial (Módulo 0)
    const initialLesson = courseStructure.modules[0].lessons[0];
    const initialFolder = courseStructure.modules[0].folderName;
    const initialUrl = courseStructure.repositoryBaseUrl + initialFolder + '/' + initialLesson.fileName;

    displayContent(initialLesson.lessonTitle, initialLesson.htmlContent, initialUrl, initialLesson.contentType);


    // 2. Renderiza a navegação da Sidebar
    courseStructure.modules.forEach(module => {
        const moduleHeader = document.createElement('a');
        moduleHeader.className = 'module-header';
        moduleHeader.textContent = module.moduleTitle;
        moduleHeader.href = '#';
        navigationElement.appendChild(moduleHeader);

        const lessonList = document.createElement('ul');
        lessonList.className = 'lesson-list';
        navigationElement.appendChild(lessonList);

        module.lessons.forEach(lesson => {
            const listItem = document.createElement('li');
            const lessonLink = document.createElement('a');
            
            // Constrói a URL do arquivo RAW no GitHub para o recurso (se for o caso)
            const folderNameEncoded = module.folderName.replace(/\s/g, '%20');
            const fileNameEncoded = lesson.fileName.replace(/\s/g, '%20');
            const fileUrl = courseStructure.repositoryBaseUrl + folderNameEncoded + '/' + fileNameEncoded;
            
            lessonLink.textContent = lesson.lessonTitle;
            lessonLink.href = '#lesson-' + module.moduleID + lesson.lessonTitle.replace(/\s/g, '-');
            
            // Adiciona ícone de acordo com o tipo
            let icon = lesson.contentType === 'RECURSO' ? '&#x1F4BE; ' : '&#x1F4DA; '; // Disquete (Recurso) ou Livro (Aula)
            lessonLink.innerHTML = icon + lessonLink.textContent;
            
            // Evento de clique: exibe o conteúdo HTML embutido
            lessonLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Chama a função para exibir o conteúdo HTML (que agora está no JS)
                displayContent(lesson.lessonTitle, lesson.htmlContent, fileUrl, lesson.contentType);

                // Lógica de visualização da sidebar (expande o módulo atual)
                document.querySelectorAll('.lesson-list').forEach(ul => ul.style.display = 'none');
                lessonList.style.display = 'block'; 
            });

            listItem.appendChild(lessonLink);
            lessonList.appendChild(listItem);
        });

        // Evento de clique para expandir/colapsar a lista de aulas
        moduleHeader.addEventListener('click', (e) => {
            e.preventDefault();
            lessonList.style.display = lessonList.style.display === 'block' ? 'none' : 'block';
        });
    });
}

document.addEventListener('DOMContentLoaded', renderNavigation);
