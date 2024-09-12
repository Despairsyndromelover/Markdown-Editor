import '../scss/style.scss';

const rawInput = document.querySelector('#raw-input');
const preview = document.querySelector('#preview');

console.log(rawInput);
console.log(preview);

function updatePreview() {
  const formattedInputValue = rawInput.value.replaceAll('\n', `<br/>`);
  preview.innerHTML = formattedInputValue;
}

rawInput.addEventListener('input', updatePreview);
