window.onload = function () {
  // Empty links prevent default
  const emptyLinks = document.querySelectorAll('a[href="#"]');
  Array.from(emptyLinks).forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
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

  if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

    // Function to animate the scroll
    var smoothScroll = function (anchor, duration) {

      // Calculate how far and how fast to scroll
      var startLocation = window.pageYOffset;
      var endLocation = anchor.offsetTop;
      var distance = endLocation - startLocation;
      var increments = distance/(duration/16);
      var stopAnimation;

      // Scroll the page by an increment, and check if it's time to stop
      var animateScroll = function () {
        window.scrollBy(0, increments);
        stopAnimation();
      };

      // If scrolling down
      if ( increments >= 0 ) {
        // Stop animation when you reach the anchor OR the bottom of the page
        stopAnimation = function () {
          var travelled = window.pageYOffset;
          if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
            clearInterval(runAnimation);
          }
        };
      }
      // If scrolling up
      else {
        // Stop animation when you reach the anchor OR the top of the page
        stopAnimation = function () {
          var travelled = window.pageYOffset;
          if ( travelled <= (endLocation || 0) ) {
            clearInterval(runAnimation);
          }
        };
      }

      // Loop the animation function
      var runAnimation = setInterval(animateScroll, 16);

    };

    // Define smooth scroll links
    var scrollToggle = document.querySelectorAll('.main-nav a');

    // For each smooth scroll link
    [].forEach.call(scrollToggle, function (toggle) {

      // When the smooth scroll link is clicked
      toggle.addEventListener('click', function(e) {

        // Prevent the default link behavior
        e.preventDefault();

        // Get anchor link and calculate distance from the top
        var dataID = toggle.getAttribute('href');
        var dataTarget = document.querySelector(dataID);
        var dataSpeed = toggle.getAttribute('data-speed');

        // If the anchor exists
        if (dataTarget) {
          // Scroll to the anchor
          smoothScroll(dataTarget, dataSpeed || 500);
        }

      }, false);

    });

  }

};
