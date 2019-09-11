jQuery(document).ready(function($) {

	"use strict";

	window.addEventListener('load', function() {

		var forms = document.getElementsByTagName('form');

		var validation = Array.prototype.filter.call(forms, function(form) {

      form.addEventListener('submit', function(event) {
				
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
				
				if (ferror) {
					return false;
			  }
			
				var str = $(this).serialize(); 
				var action = $(this).attr('action');
				var f = $(this);
				var e = f.prev();
				var m = e.prev();
				
				if (!action) {
					action = 'https://canvasxpress.org/cgi-bin/services.pl';
				}

        event.preventDefault();
        event.stopPropagation();

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

});
