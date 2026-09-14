'use strict';

// Essential content and contact links also work without JavaScript.
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const mobileQuery = window.matchMedia('(max-width: 760px)');

function setMenu(open, restoreFocus = false) {
  header.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '닫기' : '메뉴';
  if (restoreFocus) menuToggle.focus();
}

if (header && menuToggle && navigation) {
  header.classList.add('menu-enhanced');
  menuToggle.hidden = false;
  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !mobileQuery.matches) return;
    setMenu(false);
    const target = link.getAttribute('href');
    const destination = target.startsWith('#') ? document.getElementById(target.slice(1)) : null;
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) setMenu(false, true);
  });
  mobileQuery.addEventListener('change', () => {
    const focusWasInMenu = navigation.contains(document.activeElement);
    setMenu(false, mobileQuery.matches && focusWasInMenu);
  });
}

// Image links remain a usable fallback if scripting is disabled.
document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const image = gallery.querySelector('[data-main-image]');
  const fullImage = gallery.querySelector('[data-full-image]');
  const options = gallery.querySelectorAll('[data-image]');
  const originalLabel = fullImage.getAttribute('aria-label');
  let selectedFlyer = null;
  fullImage.addEventListener('click', (event) => {
    if (!selectedFlyer || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const flyerLink = gallery.closest('.product').querySelector('[data-flyer]');
    const dialog = document.querySelector('#flyer-dialog');
    if (!flyerLink || !dialog || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    flyerLink.click();
  });
  options.forEach((option) => {
    option.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      image.src = option.dataset.image;
      image.alt = option.dataset.alt;
      fullImage.href = option.dataset.image;
      selectedFlyer = option.hasAttribute('data-gallery-flyer');
      fullImage.classList.toggle('product-photo--flyer', selectedFlyer);
      fullImage.setAttribute('aria-label', selectedFlyer ? option.dataset.alt + ' 크게 보기' : originalLabel);
      if (selectedFlyer && typeof document.querySelector('#flyer-dialog')?.showModal === 'function') {
        fullImage.setAttribute('aria-haspopup', 'dialog');
      } else {
        fullImage.removeAttribute('aria-haspopup');
      }
      options.forEach((item) => item.removeAttribute('aria-current'));
      option.setAttribute('aria-current', 'true');
    });
  });
});

const template = document.querySelector('#inquiry-template');
document.querySelectorAll('[data-inquiry]').forEach((link) => {
  const product = link.dataset.inquiry;
  const subject = '[믿음상공사 견적 문의] ' + (product || '렌치 주문 제작 및 대량 구매');
  const body = template.value.replace('문의 품목:', '문의 품목: ' + product);
  link.href = 'mailto:bbyngsuh@naver.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});

// Native dialogs handle focus trapping and Escape; ordinary image links are the fallback.
const flyerDialog = document.querySelector('#flyer-dialog');
if (flyerDialog && typeof flyerDialog.showModal === 'function') {
  const flyerImage = document.querySelector('#flyer-image');
  const flyerTitle = document.querySelector('#flyer-dialog-title');
  const flyerDownload = document.querySelector('#flyer-download');
  const flyerOriginal = document.querySelector('#flyer-original');
  let flyerTrigger = null;

  document.querySelectorAll('[data-flyer]').forEach((link) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', 'flyer-dialog');
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      flyerTrigger = link;
      const title = link.dataset.flyerTitle;
      flyerTitle.textContent = title;
      flyerImage.alt = title;
      flyerImage.src = link.href;
      flyerDownload.href = link.href;
      flyerDownload.download = title.replace(/\s+/g, '-') + '.png';
      flyerOriginal.href = link.href;
      flyerDialog.showModal();
      flyerDialog.scrollTop = 0;
      document.body.classList.add('flyer-open');
    });
  });
  document.querySelector('#flyer-close').addEventListener('click', () => flyerDialog.close());
  flyerDialog.addEventListener('click', (event) => {
    if (event.target !== flyerDialog) return;
    const bounds = flyerDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) flyerDialog.close();
  });
  flyerDialog.addEventListener('close', () => {
    document.body.classList.remove('flyer-open');
    if (flyerTrigger && flyerTrigger.isConnected) flyerTrigger.focus({ preventScroll: true });
  });
}

const copyButton = document.querySelector('#copy-template');
const status = document.querySelector('#copy-status');
if (copyButton && template && status) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(template.value);
      status.textContent = '문의 양식을 복사했습니다. 이메일에 붙여넣어 작성해주세요.';
    } catch {
      template.focus();
      template.select();
      template.setSelectionRange(0, template.value.length);
      status.textContent = '양식을 선택했습니다. 기기의 복사 메뉴 또는 Ctrl+C / Command+C로 복사해주세요.';
    }
  });
}
