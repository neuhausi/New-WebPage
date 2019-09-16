jQuery(document).ready(function( $ ) {

  $(window).scroll(function () {
    var height = $(window).height();
    var scroll = $(window).scrollTop();
    if (scroll) {
      $(".header-hide").addClass("scroll-header");
    } else {
      $(".header-hide").removeClass("scroll-header");
    }

  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });
  
  /**
   *  Validate forms when submitted
   */
  
	window.addEventListener('load', function() {

		var forms = document.getElementsByTagName('form');

		var validation = Array.prototype.filter.call(forms, function(form) {

      form.addEventListener('submit', function(event) {
				
        event.preventDefault();
        event.stopPropagation();

        var f = $(this).find('.form-group');
				var ferror = false;
				var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

				f.children('input').each(function() {

					var i = $(this);
					var rule = i.attr('data-rule');

					if (rule !== undefined) {
						var ierror = false;
						var pos = rule.indexOf(':', 0);
						if (pos >= 0) {
							var exp = rule.substr(pos + 1, rule.length);
							rule = rule.substr(0, pos);
						} else {
							rule = rule.substr(pos + 1, rule.length);
						}

						switch (rule) {
							case 'required':
								if (i.val() === '') {
									ferror = ierror = true;
								}
								break;

							case 'minlen':
								if (i.val().length < parseInt(exp)) {
									ferror = ierror = true;
								}
								break;

							case 'email':
								if (!emailExp.test(i.val())) {
									ferror = ierror = true;
								}
								break;

							case 'checked':
								if (!i.is(':checked')) {
									ferror = ierror = true;
								}
								break;

							case 'regexp':
								exp = new RegExp(exp);
								if (!exp.test(i.val())) {
									ferror = ierror = true;
								}
								break;
						}
						i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
					}
					
				});
				
				f.children('textarea').each(function() {

					var i = $(this);
					var rule = i.attr('data-rule');

					if (rule !== undefined) {
						var ierror = false;
						var pos = rule.indexOf(':', 0);
						if (pos >= 0) {
							var exp = rule.substr(pos + 1, rule.length);
							rule = rule.substr(0, pos);
						} else {
							rule = rule.substr(pos + 1, rule.length);
						}

						switch (rule) {
							case 'required':
								if (i.val() === '') {
									ferror = ierror = true;
								}
								break;

							case 'minlen':
								if (i.val().length < parseInt(exp)) {
									ferror = ierror = true;
								}
								break;
						}
						i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
					}
				});
				
				var f = $(this);
				var e = f.prev();
				var m = e.prev();

				if (ferror) {
					setTimeout(function() {
				    f.find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
				    f.find('.validation').empty();
				    f.removeClass('was-validated');
					}, 5000);
					return false;
			  }
			
				var str = $(this).serialize(); 
				var action = $(this).attr('action');
				
				if (!action) {
					action = 'https://canvasxpress.org/cgi-bin/services.pl';
				}


        $.ajax({
					type : "POST",
					url : action,
					data : str,
					success : function(msg) {
						if (!msg) {
							msg = m.text();
						}
						e.removeClass("show");
						f.find("input, textarea").val("");
						m.addClass("show");
						m.html(msg);
						if (f.attr('id') == 'loginForm') {
							setCookie("canvasXpressUserId", msg);
						}
						setTimeout(function() {
							$('#account').modal('hide');
							m.removeClass("show");
						}, 3500);
					},
					error : function(msg) {
						m.removeClass("show");
						e.addClass("show");
						e.html(msg);
					}
				});
        
				return false;
				
			});

		});

	}, false);

	/**
	 * Modals
	 */

	$("#search").on("hide.bs.modal", function(){
    $('form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
  });
  $("#account").on("hide.bs.modal", function(){
    $('form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
    $(this).find('.validation').empty();
    $('form').removeClass('was-validated');
  });
		
});

/**
 * Show Register Form
 * 
 * @returns void
 */

var showRegisterForm = function(){
	$('#social').fadeIn('fast');
	$('#login').fadeOut('fast', function () {	
    $('#forgot').fadeOut('fast');
    $('#register').fadeIn('fast');
    $('#create-forgot-footer').fadeOut('fast', function () {        	
      $('#login-footer').fadeIn('fast');
    });	
	});
	$('.modal-title').html('Register with');
  $('.error').removeClass('alert alert-danger').html('');     
}

/**
 * Show Login Form
 * 
 * @returns void
 */

var showLoginForm = function(){
	unsetCookie("canvasXpressUserId");
	$('#social').fadeIn('fast');
  $('#register').fadeOut('fast', function (){
    $('#logout').fadeOut('fast');
    $('#forgot').fadeOut('fast');
    $('#login').fadeIn('fast');
    $('#login-footer').fadeOut('fast', function () {
    	$('#create-forgot-footer').fadeIn('fast');
    });
	});
  $('.modal-title').html('Login with');
  $('.error').removeClass('alert alert-danger').html(''); 
}

/**
 * Show Forgot Form
 * 
 * @returns void
 */

var showForgotForm = function(){
	$('#social').fadeOut('fast');
  $('#login').fadeOut('fast', function () {
    $('#register').fadeOut('fast');
    $('#forgot').fadeIn('fast');
    $('#create-forgot-footer').fadeOut('fast', function () {        	
      $('#login-footer').fadeIn('fast');
    });	
  });
  $('.modal-title').html('Enter email');
  $('.error').removeClass('alert alert-danger').html('');
}

/**
 * Show Logout Form
 * 
 * @returns void
 */
var showLogoutForm = function(){
	$('#social').fadeOut('fast');
  $('#login').fadeOut('fast');
  $('#register').fadeOut('fast');
  $('#forgot').fadeOut('fast');
  $('#logout').fadeIn('fast');
  $('#create-forgot-footer').fadeOut('fast');
  $('#login-footer').fadeOut('fast');
  $('.modal-title').html('Close Modal');
  $('.error').removeClass('alert alert-danger').html('');
}

/**
 * Set Cookie
 * 
 * @returns void
 */

var setCookie = function(cname, cvalue) {
	var d = new Date();
	d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	checkCookie("canvasXpressUserId");
}

/**
 * Unset Cookie
 * 
 * @returns void
 */

var unsetCookie = function(cname) {
	var d = new Date();
	d.setTime(d.getTime() + 1);
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=;" + expires + ";path=/";
	checkCookie("canvasXpressUserId");
}

/**
 * Get Cookie
 * 
 * @returns void
 */

var getCookie = function(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for ( var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

/**
 * Check Cookie
 * 
 * @returns void
 */

var checkCookie = function(cname) {
	var val = getCookie(cname);
	var nav = "";
	if (val != "") {
		nav = 'Welcome, ' + val;
		$("#siteUserId").text(nav);
		showLogoutForm();
	} else {
		nav = "";
		$("#siteUserId").text(nav);
	}
}

checkCookie();


// CanvasXpress

onReady(function () {

	CanvasXpress.initImage();
	
})
