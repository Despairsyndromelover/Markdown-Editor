import '../scss/style.scss';

const markdownInput = document.querySelector('#raw-input');
const preview = document.querySelector('#preview');

const getFormattedInputLines = () => {
  let formattedLines = markdownInput.value
    .replaceAll('\n', `<br/>`)
    .split('<br/>');
  return formattedLines;
};

const deletePreviewInner = () => (preview.innerHTML = '');

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
  ${line.trimStart().slice(heading.markdownSyntax.length, line.length)}
  </${heading.tag}>`;
};
const createHeadings = (lines) => {
  lines.forEach((currentLine, index) => {
    if (currentLine.startsWith(headings[5].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[5], currentLine, index)
      );
    } else if (currentLine.startsWith(headings[4].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[4], currentLine, index)
      );
    } else if (currentLine.startsWith(headings[3].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[3], currentLine, index)
      );
    } else if (currentLine.startsWith(headings[2].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[2], currentLine, index)
      );
    } else if (currentLine.startsWith(headings[1].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[1], currentLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[0].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[0], currentLine, index)
      );
    }
  });
};

const lists = [{ tag: `li`, markdownSyntax: '-', class: 'listElement' }];
const getListItemTemplate = (list, line, index) => {
  return `<${list.tag} 
  class="${list.class}" 
  id=${index}>
  ${line.slice(list.markdownSyntax.length, line.length)}
  </${list.tag}>`;
};

const checkHeadings = () => {
  const lines = getFormattedInputLines();
  lines.forEach((currentLine, index) => {
    if (currentLine.startsWith(headings[5].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[5], currentLine, index)
      );
    } else if (currentLine.startsWith(headings[4].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[4], currentLine, index)
      );
    } else if (currentLine.startsWith(headings[3].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[3], currentLine, index)
      );
    } else if (currentLine.startsWith(headings[2].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[2], currentLine, index)
      );
    } else if (currentLine.startsWith(headings[1].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[1], currentLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[0].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[0], currentLine, index)
      );
    }
  });
};
const checkLists = () => {
  const lines = getFormattedInputLines();
  lines.forEach((currentLine, index) => {
    if (currentLine.trimStart().startsWith('-')) {
      preview.insertAdjacentHTML(
        'beforeend',
        getListItemTemplate(lists[0], currentLine, index)
      );
    }
  });
};

const updatePreview = () => {
  const lines = getFormattedInputLines();
  deletePreviewInner();
  lines.forEach((currentLine, index) => {
    if (currentLine.trimStart().startsWith(headings[5].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[5], currentLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[4].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[4], currentLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[3].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[3], currentLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[2].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[2], currentLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[1].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[1], currentLine, index)
      );
    } else if (currentLine.trimStart().startsWith(headings[0].markdownSyntax)) {
      preview.insertAdjacentHTML(
        'beforeend',
        getHeadingTemplate(headings[0], currentLine, index)
      );
    } else if (currentLine.trimStart().startsWith('-')) {
      preview.insertAdjacentHTML(
        'beforeend',
        getListItemTemplate(lists[0], currentLine, index)
      );
    } else {
      preview.insertAdjacentHTML(
        'beforeend',
        `<div class="element" id=${index}>${currentLine}</div>`
      );
    }
  });
};
markdownInput.addEventListener('input', updatePreview);
