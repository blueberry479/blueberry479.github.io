$(document).ready(function(){
        let user_icon = document.querySelector('.user-header__icon');
        user_icon.addEventListener("click", function(e){
        let user_menu = document.querySelector('.user-header__menu');
        user_menu.classList.toggle('active');
    });
    $('.icon-menu').click(function(event) {
		$(this).toggleClass('active');
		$('.menu__body').toggleClass('active');
		if($(this).hasClass('active')){
			$('body').data('scroll', $(window).scrollTop());
		}
			$('body').toggleClass('lock');
		if(!$(this).hasClass('active')){
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	});

    document.documentElement.addEventListener("click", function(e){
        if(!e.target.closest('.user-header')){
            let user_menu = document.querySelector('.user-header__menu');
            user_menu.classList.remove('active');
        }
    })
});

