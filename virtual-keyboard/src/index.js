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

let lang = localStorage.getItem('currentLang') ? localStorage.getItem('currentLang') : 'en';
let cursorPosition = 0;

const isKeyPressed = {
  capslock: false,
  shift: false,
};

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

function checkCursorPosition() {
  const textarea = document.querySelector('textarea');
  textarea.selectionStart = cursorPosition;
  textarea.selectionEnd = cursorPosition;
}

function changeLanguage() {
  const language = lang;
  const keys = document.querySelectorAll('.key');
  if (language === 'en') {
    keys.forEach((key) => {
      const keyRu = key.querySelector('.ru-lang');
      const keyEn = key.querySelector('.en-lang');
      keyRu.classList.remove('hidden');
      keyEn.classList.add('hidden');
    });
    lang = 'ru';
    localStorage.setItem('currentLang', lang);
  } else {
    keys.forEach((key) => {
      const keyRu = key.querySelector('.ru-lang');
      const keyEn = key.querySelector('.en-lang');
      keyEn.classList.remove('hidden');
      keyRu.classList.add('hidden');
    });
    lang = 'en';
    localStorage.setItem('currentLang', lang);
  }
}

function changingLangWithKeys(event) {
  event.preventDefault();
  const textarea = document.querySelector('textarea');
  if (event.altKey === true && event.code === 'Space') {
    textarea.value = textarea.value.substr(0, (cursorPosition - 1))
            + textarea.value.substr((cursorPosition), textarea.value.length);
    cursorPosition -= 1;
    checkCursorPosition();
    changeLanguage();
  }
}

function changingLangWithMouse(event) {
  const keyCode = event.target.closest('.key').dataset.code;
  if (keyCode === 'AltLeft') {
    changeLanguage();
  }
}

function switchVisibility(htmlClass) {
  const keys = document.querySelectorAll('.key-name');
  keys.forEach((key) => {
    if (!(key.classList.contains('hidden'))) {
      key.classList.add('hidden');
    }
  });
  const visibleKeys = document.querySelectorAll(htmlClass);
  visibleKeys.forEach((letter) => {
    letter.classList.remove('hidden');
  });
}

function emulateTyping(keyCode) {
  const textarea = document.querySelector('textarea');
  if (KEY_CODE_TABLE.includes(keyCode)) {
    textarea.focus();
    checkCursorPosition();
    if (keyCode === 'Backspace') {
      if (cursorPosition > 0) {
        textarea.value = textarea.value.substr(0, (cursorPosition - 1))
            + textarea.value.substr((cursorPosition), textarea.value.length);
        cursorPosition -= 1;
        checkCursorPosition();
      }
    } else if (keyCode === 'Delete') {
      textarea.value = textarea.value.substr(0, cursorPosition)
        + textarea.value.substr((cursorPosition + 1), textarea.value.length);
      checkCursorPosition();
    } else if (keyCode === 'Space') {
      textarea.value = `${textarea.value.substr(0, cursorPosition)} ${textarea.value.substr(cursorPosition, textarea.value.length)}`;
      cursorPosition += 1;
      checkCursorPosition();
    } else if (keyCode === 'Enter') {
      textarea.value = `${textarea.value.substr(0, cursorPosition)}\n${textarea.value.substr(cursorPosition, textarea.value.length)}`;
      cursorPosition += 1;
      checkCursorPosition();
    } else if (keyCode === 'Tab') {
      textarea.value = `${textarea.value.substr(0, cursorPosition)}    ${textarea.value.substr(cursorPosition, textarea.value.length)}`;
      cursorPosition += 4;
      checkCursorPosition();
    } else if (keyCode === 'ArrowUp') {
      textarea.value = `${textarea.value.substr(0, cursorPosition)}▲${textarea.value.substr(cursorPosition, textarea.value.length)}`;
      cursorPosition += 1;
      checkCursorPosition();
    } else if (keyCode === 'ArrowDown') {
      textarea.value = `${textarea.value.substr(0, cursorPosition)}▼${textarea.value.substr(cursorPosition, textarea.value.length)}`;
      cursorPosition += 1;
      checkCursorPosition();
    } else if (keyCode === 'ArrowLeft') {
      if (cursorPosition > 0) {
        cursorPosition -= 1;
        checkCursorPosition();
      }
    } else if (keyCode === 'ArrowRight') {
      if (cursorPosition < textarea.value.length) {
        cursorPosition += 1;
        checkCursorPosition();
      }
    } else if (keyCode === 'MetaLeft'
    || keyCode === 'MetaRight'
    || keyCode === 'MetaLeft'
    || keyCode === 'AltLeft'
    || keyCode === 'AltRight'
    || keyCode === 'ControlLeft'
    || keyCode === 'ShiftLeft'
    || keyCode === 'ShiftRight'
    || keyCode === 'CapsLock') {
      checkCursorPosition();
    } else {
      textarea.value = `${textarea.value.substr(0, cursorPosition)}${document.querySelector(`[data-code="${keyCode}"]`).innerText}${textarea.value.substr(cursorPosition, textarea.value.length)}`;
      cursorPosition += 1;
      checkCursorPosition();
    }
  }
}

function pressKeyDown(event) {
  event.preventDefault();
  if (event.code !== 'CapsLock' && KEY_CODE_TABLE.includes(event.code)) {
    const dataCode = document.querySelector(`[data-code="${event.code}"]`);
    dataCode.classList.add('active');
    emulateTyping(event.code);
  }
  if (event.code === 'CapsLock') {
    if (isKeyPressed.capslock === false) {
      document.querySelector('.capslock-key').classList.add('active');
      switchVisibility('.capslock-on');
      isKeyPressed.capslock = true;
    } else {
      document.querySelector('.capslock-key').classList.remove('active');
      switchVisibility('.default-key');
      isKeyPressed.capslock = false;
    }
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (isKeyPressed.capslock === true) {
      switchVisibility('.caps-on-shift-on');
      isKeyPressed.shift = true;
    } else {
      switchVisibility('.shift-on');
      isKeyPressed.shift = true;
    }
  }
}

function pressKeyUp(event) {
  if (event.code !== 'CapsLock' && KEY_CODE_TABLE.includes(event.code)) {
    const dataCode = document.querySelector(`[data-code="${event.code}"]`);
    dataCode.classList.remove('active');
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (isKeyPressed.capslock === true) {
      switchVisibility('.capslock-on');
      isKeyPressed.shift = false;
    } else {
      switchVisibility('.default-key');
      isKeyPressed.shift = false;
    }
  }
}

document.addEventListener('dblclick', (event) => changingLangWithMouse(event));

document.addEventListener('keydown', (event) => pressKeyDown(event));
document.addEventListener('keydown', (event) => changingLangWithKeys(event));
document.addEventListener('keyup', (event) => pressKeyUp(event));

window.onload = () => {
  document.body.append(createHeader());
  createKeyboard();
  document.querySelector('textarea').addEventListener('click', (event) => {
    cursorPosition = event.target.selectionStart;
  });
};
