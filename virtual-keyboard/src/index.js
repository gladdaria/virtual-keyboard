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
