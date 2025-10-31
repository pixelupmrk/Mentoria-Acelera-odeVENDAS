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

// Função para ler o DOCX do GitHub e exibir o conteúdo como HTML
function displayDocxContent(url, title) {
    lessonTitleElement.textContent = title;
    lessonContentElement.innerHTML = `<p class="loading-message">⏳ Carregando conteúdo premium... Convertendo DOCX em HTML. Aguarde.</p>`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo DOCX. Status: ' + response.status);
            }
            return response.arrayBuffer();
        })
        .then(arrayBuffer => {
            return mammoth.convertToHtml({arrayBuffer: arrayBuffer});
        })
        .then(result => {
            // Exibe o conteúdo convertido na div
            lessonContentElement.innerHTML = result.value; 
            // Adiciona a opção de download para o caso de o aluno querer o original
            lessonContentElement.innerHTML += `<p style="margin-top: 25px; border-top: 1px dashed #eee; padding-top: 15px;">**Opcional:** <a href="${url}" target="_blank">Clique aqui para baixar o arquivo DOCX original.</a></p>`;
        })
        .catch(error => {
            lessonContentElement.innerHTML = `<p class="error-message">❌ **Erro ao carregar o conteúdo da aula:** O arquivo DOCX não pôde ser lido ou o CORS do GitHub está bloqueando. Por favor, utilize o link de download direto:</p><p><a href="${url}" target="_blank" style="color: red; font-weight: bold;">[CLIQUE PARA BAIXAR O ARQUIVO]</a></p>`;
            console.error('Erro de carregamento ou conversão:', error);
        });
}

// Função para renderizar a navegação do curso
function renderNavigation() {
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
            
            const fileUrl = baseUrl + module.folderName.replace(/\s/g, '%20') + '/' + lesson.fileName.replace(/\s/g, '%20');
            
            lessonLink.textContent = lesson.lessonTitle;
            lessonLink.href = '#lesson-' + lesson.moduleID;
            
            // Adiciona ícone de acordo com o tipo
            let icon = lesson.contentType === 'RECURSO' ? '&#x1F4BE; ' : '&#x1F4DA; '; // Disquete (Recurso) ou Livro (Aula)
            lessonLink.innerHTML = icon + lessonLink.textContent;
            
            lessonLink.addEventListener('click', (e) => {
                e.preventDefault();
                displayDocxContent(fileUrl, lesson.lessonTitle);
                // Fecha outras listas (opcional, para manter a sidebar limpa)
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
