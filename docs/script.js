const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.global-nav');
const navLinks = [...nav.querySelectorAll('a')];

function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.menu-label').textContent = 'メニュー';
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') === 'false';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.querySelector('.menu-label').textContent = opening ? '閉じる' : 'メニュー';
  nav.classList.toggle('open', opening);
  document.body.classList.toggle('menu-open', opening);
  if (opening) navLinks[0].focus();
});

navLinks.forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
window.addEventListener('resize', () => { if (window.innerWidth >= 768) closeMenu(); });
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 8), { passive: true });

const dialog = document.querySelector('#work-dialog');
const dialogOpenButton = document.querySelector('[data-dialog-open="work-dialog"]');
const dialogCloseButton = dialog.querySelector('[data-dialog-close]');

dialogOpenButton.addEventListener('click', () => {
  dialog.showModal();
  document.body.classList.add('dialog-open');
});

function closeDialog() {
  dialog.close();
}

dialogCloseButton.addEventListener('click', closeDialog);
dialog.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeDialog();
  }
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogOpenButton.focus();
});
