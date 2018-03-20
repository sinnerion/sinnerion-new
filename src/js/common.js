window.onload = function () {
  // Main-nav
  const mainNavToggle = document.querySelector('.main-nav_toggle');
  mainNavToggle.addEventListener('click', function () {
    this.querySelectorAll('i').forEach(function (value) {
      value.classList.toggle('hidden');
    });
    document.querySelector('.main-nav').classList.toggle('main-nav__active');
  });

  function get_current_age(date) {
    return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
  }
  document.querySelectorAll('.age').forEach(function (element) { element.innerHTML = get_current_age('1992-04-19') });

};
