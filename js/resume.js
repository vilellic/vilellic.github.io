(function($) {
  "use strict"; // Start of use strict

  // Height of the fixed top navbar in mobile view (excluding the open menu), 0 on desktop sidebar
  function navOffset() {
    if (window.innerWidth >= 992) return 0;
    return $('#sideNav').outerHeight() - ($('#sideNav .navbar-collapse:visible').outerHeight() || 0);
  }

  // Scroll animation length; no animation if the user prefers reduced motion
  function scrollDuration() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500;
  }

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        // Highlight the clicked item right away and pause scrollspy during the animation,
        // so the highlight doesn't run through the sections in between
        $('body').scrollspy('dispose');
        spyOffset = null;
        $('#sideNav .nav-link').removeClass('active')
          .filter('[href="' + this.hash + '"]').addClass('active');
        $('html, body').stop().animate({
          scrollTop: (target.offset().top - navOffset())
        }, scrollDuration(), "easeInOutCubic").promise().done(initScrollspy);
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll.
  // Re-create it when the navbar height changes (mobile <-> desktop layout).
  var spyOffset = null;
  function initScrollspy() {
    var offset = navOffset() + 10;
    if (offset === spyOffset) return;
    spyOffset = offset;
    $('body').scrollspy('dispose').scrollspy({
      target: '#sideNav',
      offset: offset
    });
  }
  initScrollspy();
  $(window).on('resize orientationchange', initScrollspy);

})(jQuery); // End of use strict
