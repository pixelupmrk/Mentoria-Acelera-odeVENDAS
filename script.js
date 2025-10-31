// O JSON (course_structure.json) é carregado antes deste script
// A variável 'courseStructure' (ou similar) deve estar disponível globalmente.
// Como o JSON está separado, vamos simular a leitura aqui.
// NOTA: Para funcionar, você precisa do seu JSON em um arquivo chamado 'course_structure.json'

// O conteúdo do seu JSON deve ser colocado dentro de 'courseStructure'
const courseStructure = {
  "courseTitle": "Mentoria PixelUP: Acelera-deVENDAS",
  "description": "Estrutura modular completa do curso com mapeamento dos arquivos DOCX do repositório.",
  "repositoryBaseUrl": "https://raw.githubusercontent.com/pixelupmrk/Mentoria-Acelera-odeVENDAS/main/",
  "modules": [
    {
      "moduleID": "M0",
      "moduleTitle": "Módulo 0: Boas-Vindas e Apresentação",
      "folderName": "Apresentacao Mentoria",
      "lessons": [
        {
          "lessonTitle": "Introdução e Alinhamento de Expectativas",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "apresentacao.docx"
        }
      ]
    },
    {
      "moduleID": "M1",
      "moduleTitle": "Módulo 1: Fundamentos do Negócio e Posicionamento",
      "folderName": "Modulo 01",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Fundamentos e Posicionamento",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Mentoria MD01.docx"
        }
      ]
    },
    {
      "moduleID": "M2",
      "moduleTitle": "Módulo 2: O Algoritmo do Meta",
      "folderName": "modulo 02",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Como o Algoritmo Funciona",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Doc MD02.docx"
        },
        {
          "lessonTitle": "Recurso: Dica - Gancho Forte e CTA",
          "contentType": "RECURSO",
          "fileName": "Doc MD2.1.docx"
        }
      ]
    },
    {
      "moduleID": "M3",
      "moduleTitle": "Módulo 3: Cronograma de Postagens Estratégico",
      "folderName": "modulo 03",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Estratégia de Cronograma",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Doc  MD3.0.docx"
        },
        {
          "lessonTitle": "Recurso: Exemplo de Cronograma Semanal",
          "contentType": "RECURSO",
          "fileName": "Doc  MD3.1.docx"
        }
      ]
    },
    {
      "moduleID": "M4",
      "moduleTitle": "Módulo 4: Conteúdo que Conecta (Vídeos e Design)",
      "folderName": "Modulo 04",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Estrutura de Vídeo e Edição",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Doc MD4.0.docx"
        },
        {
          "lessonTitle": "Recurso: Desafio de Vídeo Teste e Roteiro",
          "contentType": "RECURSO",
          "fileName": "Doc MD4.1.docx"
        }
      ]
    },
    {
      "moduleID": "M5",
      "moduleTitle": "Módulo 5: Copywriting com ChatGPT",
      "folderName": "Modulo 05",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Fórmulas de Copy e Prompts",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Doc  MD5.0.docx"
        },
        {
          "lessonTitle": "Recurso 1: Como Ter uma Boa Relação com o ChatGPT",
          "contentType": "RECURSO",
          "fileName": "Doc  MD5.1.docx"
        },
        {
          "lessonTitle": "Recurso 2: Prompt Base PixelUp Personalizado",
          "contentType": "RECURSO",
          "fileName": "Doc  MD5.2.docx"
        }
      ]
    },
    {
      "moduleID": "M6",
      "moduleTitle": "Módulo 6: Implementação de CRM",
      "folderName": "Modulo 06",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: O que é CRM e Ferramentas",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "DOC MD 6.0.docx"
        },
        {
          "lessonTitle": "Recurso 1: Exemplo de Funil de Vendas",
          "contentType": "RECURSO",
          "fileName": "DOC MD 6.1.docx"
        },
        {
          "lessonTitle": "Recurso 2: Opções de Remarketing com Leads",
          "contentType": "RECURSO",
          "fileName": "DOC MD 6.2.docx"
        }
      ]
    },
    {
      "moduleID": "M7",
      "moduleTitle": "Módulo 7: Processo Comercial e Técnicas de Venda",
      "folderName": "Modulo 07",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Pitch, Rapport e Follow-up",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "DOC MD07.docx"
        }
      ]
    },
    {
      "moduleID": "M8",
      "moduleTitle": "Módulo 8: Conexão com a Audiência e Humanização",
      "folderName": "Modulo 08",
      "lessons": [
        {
          "lessonTitle": "Aula Principal: Humanização e Comunidade Leal",
          "contentType": "TEXTO_PRINCIPAL",
          "fileName": "Doc MD08.docx"
        }
      ]
    }
  ]
};

const navigationElement = document.getElementById('course-navigation');
const lessonTitleElement = document.getElementById('lesson-title');
const lessonContentElement = document.getElementById('lesson-content');
const baseUrl = courseStructure.repositoryBaseUrl;

// Função para renderizar a navegação do curso
function renderNavigation() {
    courseStructure.modules.forEach(module => {
        // 1. Cria o cabeçalho do módulo
        const moduleHeader = document.createElement('a');
        moduleHeader.className = 'module-header';
        moduleHeader.textContent = module.moduleTitle;
        moduleHeader.href = '#';
        moduleHeader.id = 'module-' + module.moduleID;
        navigationElement.appendChild(moduleHeader);

        // 2. Cria a lista de aulas (inicialmente escondida)
        const lessonList = document.createElement('ul');
        lessonList.className = 'lesson-list';
        lessonList.id = 'lessons-' + module.moduleID;
        navigationElement.appendChild(lessonList);

        // 3. Adiciona as lições
        module.lessons.forEach(lesson => {
            const listItem = document.createElement('li');
            const lessonLink = document.createElement('a');
            
            // Constrói a URL do arquivo RAW no GitHub
            const fileUrl = baseUrl + module.folderName + '/' + lesson.fileName;
            
            lessonLink.href = fileUrl;
            lessonLink.target = '_blank'; // Abre o arquivo em uma nova aba
            lessonLink.textContent = lesson.lessonTitle;
            
            // Adiciona um ícone/tag para identificar o tipo de conteúdo
            if (lesson.contentType === 'RECURSO') {
                 lessonLink.innerHTML += ' <span style="font-size: 0.8em; color: #ff9900;">(Recurso/Download)</span>';
            } else {
                 lessonLink.innerHTML += ' <span style="font-size: 0.8em; color: #1a56db;">(Aula/Texto)</span>';
            }

            // Adiciona um evento para atualizar o título do conteúdo principal
            lessonLink.addEventListener('click', (e) => {
                // Remove o e.preventDefault() para que o link direto abra o arquivo
                lessonTitleElement.textContent = lesson.lessonTitle;
                lessonContentElement.innerHTML = `
                    <p>Você está prestes a acessar: <strong>${lesson.lessonTitle}</strong>.</p>
                    <p>Este é um arquivo DOCX hospedado no GitHub. O seu navegador irá <strong>baixar o arquivo</strong> ou <strong>abrir em uma nova aba</strong>.</p>
                    <a href="${fileUrl}" target="_blank" class="download-button" style="display:inline-block; margin-top:15px; padding:10px 20px; background:#1a56db; color:white; border-radius:5px;">Acessar o Arquivo</a>
                `;
            });

            listItem.appendChild(lessonLink);
            lessonList.appendChild(listItem);
        });

        // 4. Adiciona evento de clique para expandir/colapsar
        moduleHeader.addEventListener('click', (e) => {
            e.preventDefault();
            lessonList.style.display = lessonList.style.display === 'block' ? 'none' : 'block';
        });
    });
}

// Inicializa a renderização
document.addEventListener('DOMContentLoaded', renderNavigation);
