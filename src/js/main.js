import '../scss/style.scss';

const markdownInput = document.querySelector('#raw-input');
const preview = document.querySelector('#preview');

const headings = [
  { tag: 'h1', markdownSyntax: '#', class: 'heading1' },
  { tag: 'h2', markdownSyntax: '##', class: 'heading2' },
  { tag: 'h3', markdownSyntax: '###', class: 'heading3' },
  { tag: 'h4', markdownSyntax: '####', class: 'heading4' },
  { tag: 'h5', markdownSyntax: '#####', class: 'heading5' },
  { tag: 'h6', markdownSyntax: '######', class: 'heading6' },
];

const getHeadingTemplate = (heading, line, index) => {
  return `<${heading.tag} 
  class="${heading.class}" 
  id=${index}>
  ${line.trimStart().slice(heading.markdownSyntax.length)}
  </${heading.tag}>`;
};

const getImageTemplate = (link) => {
  return `<img class='img-el' src="${link.trimStart().replace('!', '')}" alt="">`;
};

const getLinkTemplate = (link, text = 'link') => {
  return `<a href="${link}" target="_blank">${text}</a>`;
};

const lists = [{ tag: `li`, markdownSyntax: '-', class: 'listElement' }];
const getListItemTemplate = (list, line, index) => {
  return `<${list.tag} 
  class="${list.class}" 
  id=${index}>
  ${line.slice(list.markdownSyntax.length, line.length)}
  </${list.tag}>`;
};

const getFormattedInputLines = () => {
  let formattedLines = markdownInput.value
    .replaceAll('\n', `<br/>`)
    .split('<br/>');
  return formattedLines;
};

const boldText = (text) => {
  const parts = text.split(/\*\*/);
  return parts.map((part, index) => {
    return index % 2 === 1 ? `<strong>${part}</strong>` : part;
  }).join('');
};

// Функция для обработки ссылок в формате [текст](URL)
const processLinks = (text) => {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank">$1</a>`);
};

const checkElements = () => {
  const lines = getFormattedInputLines();
  lines.forEach((currentLine, index) => {
    // Сначала обрабатываем ссылки, а затем жирный текст
    const processedLine = boldText(processLinks(currentLine));
    
    if (currentLine.trimStart().startsWith(headings[5].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[5], processedLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[4].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[4], processedLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[3].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[3], processedLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[2].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[2], processedLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[1].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[1], processedLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[0].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[0], processedLine, index)
      );
    } else if (currentLine.startsWith('---')) {
      preview.insertAdjacentHTML('beforeend', `<hr/>`);
    } else if (currentLine.trimStart().startsWith('-')) {
      preview.insertAdjacentHTML(
        'beforeend',
        getListItemTemplate(lists[0], processedLine, index)
      );
    } else if (currentLine.startsWith('!')) {
      preview.insertAdjacentHTML('beforeend', getImageTemplate(currentLine));
    } else {
      preview.insertAdjacentHTML(
        'beforeend',
        `<div class="element" id=${index}>${processedLine}</div>`
      );
    }
  });
};
const deletePreviewInner = () => (preview.innerHTML = '');
const updatePreview = () => {
  deletePreviewInner();
  checkElements();
};
markdownInput.addEventListener('input', updatePreview);
