window.onload = function () {
  // Main-nav
  const mainNavToggle = document.querySelector('.main-nav_toggle');
  mainNavToggle.addEventListener('click', function () {
    this.querySelectorAll('i').forEach(function (value) {
      value.classList.toggle('hidden');
    });
    document.querySelector('.main-nav').classList.toggle('main-nav__active');
  });
};
