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

const createHeadings = (lines) => {
  lines.forEach((line, index) => {
    if (line.trimStart().slice(0, 6) === '######') {
      preview.insertAdjacentHTML(
        'beforeend',
        `<h6 class="heading6" id=${index}>${line.slice(6, line.length)}</h6>`
      );
      return true;
    } else if (line.trimStart().slice(0, 5) === '#####') {
      preview.insertAdjacentHTML(
        'beforeend',
        `<h5 class="heading5" id=${index}>${line.slice(5, line.length)}</h5>`
      );
      return true;
    } else if (line.trimStart().slice(0, 4) === '####') {
      preview.insertAdjacentHTML(
        'beforeend',
        `<h4 class="heading4" id=${index}>${line.slice(4, line.length)}</h4>`
      );
      return true;
    } else if (line.trimStart().slice(0, 3) === '###') {
      preview.insertAdjacentHTML(
        'beforeend',
        `<h3 class="heading3" id=${index}>${line.slice(3, line.length)}</h3>`
      );
      return true;
    } else if (line.trimStart().slice(0, 2) === '##') {
      preview.insertAdjacentHTML(
        'beforeend',
        `<h2 class="heading2" id=${index}>${line.slice(2, line.length)}</h2>`
      );
      return true;
    } else if (line.trimStart().slice(0, 1) === '#') {
      preview.insertAdjacentHTML(
        'beforeend',
        `<h1 class="heading1" id=${index}>${line
          .trim()
          .slice(1, line.length)}</h1>`
      );
      return true;
    }
  });
};

const createTextStyling = (lines) => {
  lines.forEach((line, index) => {
    if (line.indexOf(`**`) !== -1) {
      preview.insertAdjacentHTML(
        'beforeend',
        `<span class="bold" id=${index}>${line.trim()}</span>`
      );
    }
  });
};

const checkElements = (lines) => {
  if (createHeadings(lines) || createTextStyling(lines)) {
    createHeadings(lines);
    // createTextStyling(lines);
  } else if() {
    lines.forEach((line, index) => {
      preview.insertAdjacentHTML(
        'beforeend',
        `<p class="element" id=${index}>${line}</p>`
      );
    });
  }
};

const updatePreview = () => {
  let lines = getFormattedInputLines();
  deletePreviewInner();
  checkElements(lines);
};

markdownInput.addEventListener('input', updatePreview);
