// Lightweight, dependency-free lightbox for gallery screenshots.
// Click (or Enter/Space) any image inside .gallery to enlarge it; Esc / click backdrop / Close to dismiss.
(function () {
  var overlay = null;
  var lastFocused = null;

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<button class="lightbox-close" type="button" aria-label="Close enlarged image">&times;</button>' +
      '<img class="lightbox-img" alt="" />' +
      '<p class="lightbox-caption"></p>';
    document.body.appendChild(overlay);
  }

  function open(img) {
    if (!overlay) buildOverlay();
    var fig = img.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    overlay.querySelector('.lightbox-img').src = img.currentSrc || img.src;
    overlay.querySelector('.lightbox-img').alt = img.alt || '';
    overlay.querySelector('.lightbox-caption').textContent = cap ? cap.textContent : '';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.lightbox-close').focus();
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    overlay.querySelector('.lightbox-img').src = '';
    if (lastFocused) { lastFocused.focus(); lastFocused = null; }
  }

  function init() {
    document.querySelectorAll('.gallery img').forEach(function (img) {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Enlarge image: ' + (img.alt || 'screenshot'));
    });
  }

  document.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest('.gallery img');
    if (img) { lastFocused = img; open(img); return; }
    if (overlay && (e.target === overlay || (e.target.closest && e.target.closest('.lightbox-close')))) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { close(); return; }
    var active = document.activeElement;
    if ((e.key === 'Enter' || e.key === ' ') && active && active.matches && active.matches('.gallery img')) {
      e.preventDefault();
      lastFocused = active;
      open(active);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
