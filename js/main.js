jQuery(function($) {
	//页面加载时获取导航参数
	var num=location.search.split("x=")[1];
	console.log(num);
	if(!num){
		num=1;
	}
	$(".navbar-nav").children("li:eq("+(num-1)+")").addClass("active").siblings().removeClass("active");

	//主页面滚动事件
	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 8000
		});
	});


	// accordion
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//初始化WOW 
	new WOW().init();

	// 案例筛选
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// 联系我们表单
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),

			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
		});
	});

	
	//回到顶部
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});	

	//图片展示
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});
	$("ul.navbar-nav").on("click","li a",function(e){
		e.preventDefault();
		$tar=$(e.target);
		var url=$tar.attr("href");
		console.log(url);
		location.href=url;
	})
});