const navigationElement = document.getElementById('course-navigation');
const lessonTitleElement = document.getElementById('lesson-title');
const lessonContentElement = document.getElementById('lesson-content');

let courseStructure = {};
let baseUrl = '';

// 1. Função para exibir o conteúdo do DOCX na página
function displayDocxContent(url, title) {
    lessonTitleElement.textContent = title;
    lessonContentElement.innerHTML = `<p class="loading-message">⏳ Carregando conteúdo premium... Convertendo DOCX em HTML. Aguarde.</p>`;

    // Fetch o arquivo DOCX como array buffer
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo DOCX. Status: ' + response.status);
            }
            return response.arrayBuffer();
        })
        .then(arrayBuffer => {
            // Usa a biblioteca mammoth para converter
            return mammoth.convertToHtml({arrayBuffer: arrayBuffer});
        })
        .then(result => {
            lessonContentElement.innerHTML = result.value; 
            // Link de download de backup (em caso de necessidade)
            lessonContentElement.innerHTML += `<p style="margin-top: 25px; border-top: 1px dashed #eee; padding-top: 15px;">Em caso de necessidade de formatação original, você pode <a href="${url}" target="_blank">baixar o arquivo DOCX original aqui.</a></p>`;
        })
        .catch(error => {
            lessonContentElement.innerHTML = `
                <p class="error-message">❌ **Erro ao carregar o conteúdo da aula:** O arquivo DOCX não pôde ser lido ou há um problema de permissão no GitHub. Utilize o link de download direto:</p>
                <p><a href="${url}" target="_blank" style="color: red; font-weight: bold;">[CLIQUE PARA BAIXAR O ARQUIVO]</a></p>`;
            console.error('Erro de carregamento ou conversão:', error);
        });
}

// 2. Função principal para ler o JSON e renderizar a navegação
function renderNavigation(structure) {
    courseStructure = structure;
    baseUrl = courseStructure.repositoryBaseUrl;
    
    courseStructure.modules.forEach(module => {
        // ... (Mesma lógica de criação de headers e listas de aulas) ...

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
            
            // Constrói a URL do arquivo RAW no GitHub
            const folderNameEncoded = module.folderName.replace(/\s/g, '%20');
            const fileNameEncoded = lesson.fileName.replace(/\s/g, '%20');
            const fileUrl = baseUrl + folderNameEncoded + '/' + fileNameEncoded;
            
            lessonLink.textContent = lesson.lessonTitle;
            lessonLink.href = '#lesson-' + lesson.moduleID;
            
            let icon = lesson.contentType === 'RECURSO' ? '&#x1F4BE; ' : '&#x1F4DA; '; 
            lessonLink.innerHTML = icon + lessonLink.textContent;
            
            // Adiciona evento de clique para CARREGAR O CONTEÚDO NA PÁGINA
            lessonLink.addEventListener('click', (e) => {
                e.preventDefault();
                displayDocxContent(fileUrl, lesson.lessonTitle);
                // Lógica de visualização da sidebar (expande o módulo atual)
                document.querySelectorAll('.lesson-list').forEach(ul => ul.style.display = 'none');
                lessonList.style.display = 'block'; 
            });

            listItem.appendChild(lessonLink);
            lessonList.appendChild(listItem);
        });

        moduleHeader.addEventListener('click', (e) => {
            e.preventDefault();
            lessonList.style.display = lessonList.style.display === 'block' ? 'none' : 'block';
        });
    });
}

// 3. Inicia o processo: busca o JSON no GitHub antes de tudo
document.addEventListener('DOMContentLoaded', () => {
    // Busca o arquivo JSON a partir do URL RAW do seu repositório
    const jsonUrl = 'https://raw.githubusercontent.com/pixelupmrk/Mentoria-Acelera-odeVENDAS/main/course_structure.json';

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao carregar o JSON da estrutura do curso. Verifique se o arquivo course_structure.json existe no repositório.');
            }
            return response.json();
        })
        .then(data => {
            renderNavigation(data);
        })
        .catch(error => {
            lessonTitleElement.textContent = "Erro Crítico de Carregamento";
            lessonContentElement.innerHTML = `<p class="error-message">Não foi possível carregar a estrutura do curso (${error.message}). Por favor, confira se os arquivos estão corretos no seu repositório GitHub.</p>`;
            console.error(error);
        });
});
