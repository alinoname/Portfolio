// $(document).foundation();
$(document).ready(function() {


    var hamburger = $('.btn-menu');
    var navMenu = $('.nav-menu');


  hamburger.on('click', function() {
    navMenu.toggleClass('hide-for-small-only');
  });
});
