$(document).ready(function() {

	//Scroll Options Bar
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$(".top_header").css("background-color", "rgba(80, 79, 72, 0.6)");
		} else {
			$(".top_header").css("background-color", "rgba(80, 79, 72, 1)");
		};
	});


	//Mobile Menu Slide 
	$(".main_mnu_button").click(function() {
		$(".main_mnu ul").slideToggle();
	});

	// Smooth Scrolling
	$('a[href^="#"]').click(function () { 
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;

	if (elementClick == '#top_header') {
		$('body,html').animate({scrollTop: 0}, 1300);
	} else {
		$('body,html').animate({scrollTop: destination}, 1300);
	}
		return false;
	});

	// Slide Animation
	$(".one").animate({right: 10}, 800 );
	$(".two").animate({right: 10}, 1400 );
	$(".three").animate({right: 10}, 2100 );

	$(".merkel").animate({left: 20}, 1200);



	//Main Slider 
	var owl = $(".carousel");
	owl.owlCarousel({
		items : 1,
		itemsDesktop : 1,
		itemsDesktopSmall : 1,
		itemsTablet : 1,
		itemsTabletSmall : 1,
		itemsMobile : 1,
		autoPlay: 5000

	});
	
	$(".next_button").click(function(){
		owl.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl.trigger("owl.prev");
	});

	//Screen Slider
	var owl2 = $(".screen_carousel");
	owl2.owlCarousel({

		items : 4,
		autoPlay: 5000

	});
	
	$(".next_button").click(function(){
		owl2.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl2.trigger("owl.prev");
	});

	//Knopf "nach oben"
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 1200);
		return false;
	});
	
	//Ajax Kontakt Form
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

});