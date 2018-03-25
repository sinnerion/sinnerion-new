window.onload = function () {
  // Empty links prevent default
  const emptyLinks = document.querySelectorAll('a[href="#"]');
  emptyLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  // Smooth scrolling to sections
  function anchorLinkHandler(e) {
    const distanceToTop = el =>
    Math.floor(el.getBoundingClientRect().top);

    e.preventDefault();
    const targetID = this.getAttribute("href");
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);

    window.scrollBy({top: originalTop, left: 0, behavior: "smooth"});

    const checkIfDone = setInterval(function () {
      const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
        targetAnchor.tabIndex = "-1";
        targetAnchor.focus();
        window.history.pushState("", "", targetID);
        clearInterval(checkIfDone);
      }
    }, 100);
  }

  const linksToAnchors = document.querySelectorAll('a[href^="#"]');

  linksToAnchors.forEach(function (each) {
    each.onclick = anchorLinkHandler
  });

  // Main-nav
  const mainNavToggle = document.querySelector('.main-nav_toggle');
  mainNavToggle.addEventListener('click', function () {
    this.classList.toggle('main-nav_toggle__active');
    this.querySelectorAll('i').forEach(function (value) {
      value.classList.toggle('hidden');
    });
    document.querySelector('.main-nav').classList.toggle('main-nav__active');
  });

  // Dynamic age
  function get_current_age(date) {
    return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
  }

  document.querySelectorAll('.age').forEach(function (element) {
    element.innerHTML = get_current_age('1992-04-19')
  });
  // Up-btn
  const upBtn = document.querySelector('.up-btn');
  const footer = document.querySelector('.footer');

  window.addEventListener('scroll', function upBtnFade() {
    var currentScroll = this.pageYOffset;
    if (currentScroll > 200) {
      footer.style.display = "block";
    } else {
      footer.style.display = "none";
    }
  });
  upBtn.addEventListener('click', function () {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });
};
