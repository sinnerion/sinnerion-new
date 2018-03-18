window.onload = function () {
  // Main-nav
  const mainNavToggle = document.querySelector('.main-nav_toggle');
  mainNavToggle.addEventListener('click', function () {
    this.getElementsByTagName('i')[0].classList.toggle('hidden');
    this.getElementsByTagName('i')[1].classList.toggle('hidden');
    document.querySelector('.main-nav').classList.toggle('main-nav__active');
  });
};
