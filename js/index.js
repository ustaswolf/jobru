$(function(){
	$('input, textarea').placeholder();
	
    $('.userpic').fileapi({
        url: 'http://rubaxa.org/FileAPI/server/ctrl.php',
        autoUpload: true,
        accept: 'image/*',
        multiple: false,
        maxSize: FileAPI.MB*10, // max file size
        imageSize: {
        	minWidth: 80, 
        	minHeight: 80 
        },
		elements: {
			active: { 
				show: '.js-upload', 
				hide: '.js-browse' 
			},
			preview: {
				el: '.js-preview',
				width: 80,
				height: 80
			},
			progress: '.js-progress'
		},
		onSelect: function (evt, ui){
			var file = ui.files[0];
			if( file ){
				$('#popup').modal({
					closeOnEsc: false,
					closeOnOverlayClick: false,
					onOpen: function (overlay){
						$(overlay).on('click', '.js-upload', function (){
							$.modal().close();
							$('.userpic').fileapi('upload');
						});
						$('.js-img', overlay).cropper({
							file: file,
							bgColor: '#fff',
							maxSize: [$(window).width()-100, $(window).height()-100],
							minSize: [80, 80],
							selection: '90%',
							aspectRatio: 1,
							onSelect: function (coords){
								$('.userpic').fileapi('crop', file, coords);
							}
						});
					}
				}).open();
			}
		}
    });

	var year = document.getElementById('year');
	var month = document.getElementById('month');
	var day = document.getElementById('day');

	function appendYears(){
		var curYear = new Date().getFullYear();
		for (var i = 1981; i <= curYear; i++){
			year.options[year.options.length] = new Option(i,i);
		}
	}
	appendYears();

    function daysInMonth(month,year) {
		var dd = new Date(year, month, 0);
		return dd.getDate();
	}
	
	function setDayDrop() {
		var y = year.options[year.selectedIndex].value;
		var m = month.options[month.selectedIndex].value;
		var d = day.options[day.selectedIndex].value;
		if (d == ' ') {
			var days = (y == ' ' || m == ' ') ? 31 : daysInMonth(m,y);
			day.options.length = 0;
			day.options[day.options.length] = new Option(' ',' ');
			for (var i = 1; i <= days; i++){
				day.options[day.options.length] = new Option(i,i);
			}
		}
	}

	year.onchange = setDayDrop;
	month.onchange = setDayDrop;

	$(".js-city").autoComplete({items: ["москва", "питер", "aстрахань", "владивосток"]});
	$(".js-metro").autoComplete({items: ["комсомольская", "выхино", "пушкинская", "aвиамоторная", "сокол", "аэропорт"]});
    $(".styled-select select").customSelect();
    $(".js-add-patronymic").click(function(){
    	$(this).hide();
    	var $patronymic = $(".js-patronymic");
    	$patronymic.slideDown('fast', function(){
    		$(this).find("input").focus();
    	});
    	return false;
    });

    $(".js-add-phone").click(function(){
    	var $phones = $(".js-phones");

    	var $phone = $('<input style="display:none" type="text" class="rounded-input" placeholder="Телефон"/>');
    	$phone.appendTo($phones);
    	$phone.slideDown("fast", function(){
    		$(this).focus();
    	});
    	return false;
    });

    $(".js-finish").click(function(){
    	alert("todo :)");
    	return false;
    });
});