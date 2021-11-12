import TweenMax from 'gsap/src/minified/TweenMax.min';
import TimelineMax from 'gsap/src/minified/TimelineMax.min';
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min';

import './jquery.inputmask.bundle';
import './jquery.fancybox.min';

import './js-magic';

var windowWidth = window.innerWidth;

$('.hum').on('click', function(){
    var nav = $('.nav-wrap');
    nav.animate({
        "top" : "0",
        "bottom" : "0"
    }, 300);
    $('body').addClass('fixed');
});

function closeNavMenu (){
    var nav = $('.nav-wrap');
    nav.animate({
        "top" : "-150%",
        "bottom" : "150%"
    }, 300);
    $('body').removeClass('fixed');    
}

$('.nav-mob-close').on('click', function(){
    closeNavMenu();
});

$('.nav a').on('click', function(){
    closeNavMenu();
});

$(window).resize(function(){
    var nav = $('.nav');
    if($('.page').hasClass('fixed') && window.innerWidth > 992){
        $('.page').removeClass('fixed');
        nav.css({bottom: "150%", top: "-150%"});
    }
});


var buyElements = 16;
if(windowWidth < 480){
    buyElements = 14;
}
if(windowWidth < 992 && windowWidth > 767){
    buyElements = 12;
}

var blogElements = 9;

if(windowWidth < 992 && windowWidth > 767){
    blogElements = 12;
}

var buyItems = $(".buy-grid .item-wrap").length;
$(".buy-grid .item-wrap:not(:lt("+buyElements+"))").hide();
if(buyItems <= buyElements){
    $(".buy #buy-more").hide();
}
var blogItems = $(".news-grid .item-wrap").length;
$(".news-grid .item-wrap:not(:lt("+blogElements+"))").hide();
if(blogItems <= blogElements){
    $(".news #news-more").hide();
}


$(document).ready(function(){
    


    if($('.contacts-map').length > 0){
        initMap();
    }
    

});

$(".buy #buy-more").click(function (e){
	e.preventDefault();
	var items = $(".buy-grid .item-wrap:hidden").length;
	if (items > buyElements) {
		$(".buy-grid .item-wrap:hidden:lt("+buyElements+")").fadeIn(900);
	}else if(items <= buyElements){
		$(".buy-grid .item-wrap:hidden:lt("+buyElements+")").fadeIn(900);
		$(".buy #buy-more").hide();
	}
});

$(".news #news-more").click(function (e){
	e.preventDefault();
	var items = $(".news-grid .item-wrap:hidden").length;
	if (items > blogElements) {
		$(".news-grid .item-wrap:hidden:lt("+blogElements+")").fadeIn(900);
	}else if(items <= blogElements){
		$(".news-grid .item-wrap:hidden:lt("+blogElements+")").fadeIn(900);
		$(".news #news-more").hide();
	}
});

function initMap() {
    var mapId = 'contactsMap';
    var mapsId = "#" + mapId;
    var lat = $(mapsId).data('lat');
    var lng = $(mapsId).data('lng');
    var zoom = $(mapsId).data('zoom');
    var width = window.innerWidth;
    var uluru = {lat: lat, lng: lng};
    var map = new google.maps.Map(document.getElementById(mapId), {
      zoom: zoom,
      center: uluru,
      disableDefaultUI: true,
    });
  
    var icons = "img/icons/place2.png";
  
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      // icon: icons
    });
}



$( ".form-input, .form-textarea" ).each(function( index ) {
    let el = $(this);
    if(el.hasClass("wpcf7-validates-as-required")){
        let placeholder = el.attr('placeholder');
        placeholder += "*";
        el.attr('placeholder', placeholder);
    }
});


$('input[type=tel]').inputmask({
    mask: "+7 (999) 999 99 99",
    placeholder: "-",
    showMaskOnHover: false,
});


var wpcf7Elm = document.querySelector( '.contacts-form' );
        
wpcf7Elm.addEventListener( 'wpcf7mailsent', function( event ) {
    $.fancybox.open('<div class="thanks"><h2>Спасибо!</h2><p>Ваша заявка принята и в скором времени с Вами свяжется наш менеджер!</p></div>');
    setTimeout(function() { 
        $.fancybox.close();
    }, 2000);      
}, false );
wpcf7Elm.addEventListener( 'wpcf7mailfailed', function( event ) {
    $.fancybox.open('<div class="thanks"><h2>Ошибка!</h2><p>Попробуйте заполнить форму повторно!</p></div>');
    setTimeout(function() { 
        $.fancybox.close();
    }, 2000);  
}, false );