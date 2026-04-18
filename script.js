// Mobile menu + sections dropdown for 115th Ballinteer site
(function () {
  var BREAKPOINT = 860; // must match the CSS @media breakpoint
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  var dropdown = document.querySelector('.nav-dropdown');
  var dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  var dropdownMenu = document.querySelector('.nav-dropdown-menu');
  if (!toggle || !nav) return;

  /* ── Dropdown (sections) ── */
  function openDropdown() {
    if (!dropdown) return;
    dropdown.classList.add('is-open');
    if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    if (!dropdown) return;
    dropdown.classList.remove('is-open');
    if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
  }

  if (dropdownToggle) {
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dropdown.classList.contains('is-open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });
  }

  // Close dropdown when clicking outside it
  document.addEventListener('click', function (e) {
    if (dropdown && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close dropdown when a link inside it is clicked on mobile
  if (dropdownMenu) {
    dropdownMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth < BREAKPOINT) {
        closeDropdown();
      }
    });
  }

  /* ── Mobile hamburger menu ── */
  function openMenu() {
    nav.setAttribute('aria-hidden', 'false');
    nav.style.cssText =
      'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;' +
      'background:rgba(13,44,60,0.98);padding:1rem;gap:0.5rem;' +
      'border-bottom:1px solid rgba(255,255,255,0.1);';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.setAttribute('aria-hidden', 'true');
    nav.style.display = 'none';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('is-open');
    document.body.style.overflow = '';
    closeDropdown();
  }

  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', function () {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking outside the header
  document.addEventListener('click', function (e) {
    if (
      toggle.getAttribute('aria-expanded') === 'true' &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close when a non-dropdown nav link is tapped on mobile
  nav.addEventListener('click', function (e) {
    if (
      e.target.tagName === 'A' &&
      window.innerWidth < BREAKPOINT &&
      !dropdownMenu.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ── Responsive reset on resize ── */
  function checkWidth() {
    if (window.innerWidth >= BREAKPOINT) {
      nav.removeAttribute('aria-hidden');
      nav.style.cssText = '';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('is-open');
      document.body.style.overflow = '';
      closeDropdown();
    } else if (toggle.getAttribute('aria-expanded') !== 'true') {
      nav.setAttribute('aria-hidden', 'true');
      nav.style.display = 'none';
    }
  }

  window.addEventListener('resize', checkWidth);
  checkWidth();

  /* ── Active page highlighting ── */
  var currentFile = window.location.pathname.split('/').pop() || 'index.html';
  if (currentFile === '') currentFile = 'index.html';

  nav.querySelectorAll('a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var hrefFile = href.split('/').pop().split('#')[0];
    if (!hrefFile) hrefFile = 'index.html';
    if (hrefFile === currentFile) {
      link.classList.add('active');
      // Also mark the dropdown toggle as active if a child link is active
      if (dropdownMenu && dropdownMenu.contains(link) && dropdownToggle) {
        dropdownToggle.classList.add('active');
      }
    }
  });
})();
