import {
  EN_LOWER_CASE,
  EN_SHIFT_ON,
  EN_CAPS_ON,
  EN_CAPS_ON_SHIFT_ON,
  RU_LOWER_CASE,
  RU_SHIFT_ON,
  RU_CAPS_ON,
  RU_CAPS_ON_SHIFT_ON,
  KEY_CODE_TABLE,
  CLASSES_TABLE,
} from './keyboard_arr.js';

const lang = localStorage.getItem('currentLang') ? localStorage.getItem('currentLang') : 'en';

function createHeader() {
  const header = document.createElement('header');
  header.classList.add('header');
  header.insertAdjacentHTML(
    'beforeend',
    `<div class = "container">
          <h1 class="title">Virtual Keyboard</h1>
          <div class ="operation-system">Клавиатура создана в macOS</div>
          </div>`,
  );
  return header;
}

function createKeyboard() {
  const container = document.createElement('div');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const paragraph = document.createElement('p');

  container.classList.add('container');
  document.body.appendChild(container);
  textarea.classList.add('textarea');
  container.appendChild(textarea);
  keyboard.classList.add('keyboard');
  container.appendChild(keyboard);
  paragraph.innerText = 'Для переключения языка комбинации: \n 1. На клавиатуре: Option (alt) + Пробел\n 2. Двойной щелчок мышью на левой клавише Option';
  container.appendChild(paragraph);

  for (let i = 0; i < KEY_CODE_TABLE.length; i += 1) {
    keyboard.insertAdjacentHTML(
      'beforeend',
      `
    <div class="key ${CLASSES_TABLE[i]}" data-code="${KEY_CODE_TABLE[i]}">
      <span class="en-lang ${lang === 'en' ? '' : 'hidden'}">
        <span class="default-key key-name">${EN_LOWER_CASE[i]}</span>
        <span class="capslock-on hidden key-name">${EN_CAPS_ON[i]}</span>
        <span class="shift-on key-name hidden">${EN_SHIFT_ON[i]}</span>
        <span class="caps-on-shift-on key-name hidden">${EN_CAPS_ON_SHIFT_ON[i]}</span>
      </span>
      <span class="ru-lang ${lang === 'en' ? 'hidden' : ''}">
        <span class="default-key key-name">${RU_LOWER_CASE[i]}</span>
        <span class="capslock-on key-name hidden">${RU_CAPS_ON[i]}</span>
        <span class="shift-on key-name hidden">${RU_SHIFT_ON[i]}</span>
        <span class="caps-on-shift-on key-name hidden">${RU_CAPS_ON_SHIFT_ON[i]}</span>
      </span>
    </div>`,
    );
  }
}

window.onload = () => {
  document.body.append(createHeader());
  createKeyboard();
};
