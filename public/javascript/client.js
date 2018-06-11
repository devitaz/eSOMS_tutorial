///////////////////////////////////////////////////////////////////////////////////////////////////
//			Pre-Load Page
///////////////////////////////////////////////////////////////////////////////////////////////////

//	Listener
$(document).ready(function() {
    //	Initial site Load Screen
	setTimeout(function(){
        $('body').addClass('loaded');
    }, 1000);
});

///////////////////////////////////////////////////////////////////////////////////////////////////
//			Anchor Transitions 
///////////////////////////////////////////////////////////////////////////////////////////////////

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////
//			Scroll-to-Top Button 
///////////////////////////////////////////////////////////////////////////////////////////////////

//	Shows 'scroll-to-top' button after scolling beyond 400 pixels
$(function(){
	$(document).on( 'scroll', function() {
		if ($(window).scrollTop() > 1000) {
			$('.scroll-top-wrapper').addClass('show');
		} else 
			$('.scroll-top-wrapper').removeClass('show');
	});
	$('.scroll-top-wrapper').on('click', scrollToTop);
});
function scrollToTop() {
	verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	element = $('body');
	offset = element.offset();
	offsetTop = offset.top;
	$('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
}
///////////////////////////////////////////////////////////////////////////////////////////////////
//			Next/Previous Page Buttons 
///////////////////////////////////////////////////////////////////////////////////////////////////

//	Functions change previous/next page arrows when mouse hovers over them
function hover_arrow_left(element) {
    element.setAttribute('src', 'img/nav_arrow_left2.png');
}
function unhover_arrow_left(element) {
    element.setAttribute('src', 'img/nav_arrow_left.png');
}
function hover_arrow_right(element) {
    element.setAttribute('src', 'img/nav_arrow_right2.png');
}
function unhover_arrow_right(element) {
    element.setAttribute('src', 'img/nav_arrow_right.png');
}
///////////////////////////////////////////////////////////////////////////////////////////////////
//			Acronym Modal 
///////////////////////////////////////////////////////////////////////////////////////////////////

//	makes modal fade-in on button click
$('.show').click(function(){
	var op = 0.1;  	// initial opacity
    document.getElementById('modal').style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        document.getElementById('modal').style.opacity = op;
        document.getElementById('modal').style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.15;
    }, 10);	
	$('#modal').draggable();   	// makes modal movable
});
//	makes modal fade-out on button click
$(".close").click(function(){
	var op = 1;	   // initial opacity
	var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            document.getElementById('modal').style.display = 'none';
        }
        document.getElementById('modal').style.opacity = op;
		document.getElementById('modal').style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.2;
	}, 50);
});
//	Page 1: Changes modal table values
function getPage1() {
	document.getElementById("td1a").innerHTML = "AFlw";
	document.getElementById("td1b").innerHTML = "Air Flow";
	document.getElementById("td2a").innerHTML = "Ann";
	document.getElementById("td2b").innerHTML = "Annulus";
	document.getElementById("td3a").innerHTML = "Bkr/Bkrs";
	document.getElementById("td3b").innerHTML = "Breaker/Breakers";
	document.getElementById("td4a").innerHTML = "Chng";
	document.getElementById("td4b").innerHTML = "Change";
	document.getElementById("td5a").innerHTML = "Cld";
	document.getElementById("td5b").innerHTML = "Closed";
	document.getElementById("td6a").innerHTML = "Cntl";
	document.getElementById("td6b").innerHTML = "Control";
	document.getElementById("td7a").innerHTML = "dP";
	document.getElementById("td7b").innerHTML = "Differential Pressure";
	document.getElementById("td8a").innerHTML = "Dr";
	document.getElementById("td8b").innerHTML = "Drop";
}
//	Page 2: Changes modal table values
function getPage2() {
	document.getElementById("td1a").innerHTML = "Drs";
	document.getElementById("td1b").innerHTML = "Doors";
	document.getElementById("td2a").innerHTML = "Ex";
	document.getElementById("td2b").innerHTML = "Exchange";
	document.getElementById("td3a").innerHTML = "Exh";
	document.getElementById("td3b").innerHTML = "Exhauster";
	document.getElementById("td4a").innerHTML = "Ext";
	document.getElementById("td4b").innerHTML = "Exterior";
	document.getElementById("td5a").innerHTML = "Fnc";
	document.getElementById("td5b").innerHTML = "Fence";
	document.getElementById("td6a").innerHTML = "Gg";
	document.getElementById("td6b").innerHTML = "Gauge";
	document.getElementById("td7a").innerHTML = "Gts";
	document.getElementById("td7b").innerHTML = "Gates";
	document.getElementById("td8a").innerHTML = "Hr";
	document.getElementById("td8b").innerHTML = "Heater";
}
//	Page 3: Changes modal table values
function getPage3() {
	document.getElementById("td1a").innerHTML = "In";
	document.getElementById("td1b").innerHTML = "Inlet";
	document.getElementById("td2a").innerHTML = "Iso";
	document.getElementById("td2b").innerHTML = "Isolation";
	document.getElementById("td3a").innerHTML = "Lvl";
	document.getElementById("td3b").innerHTML = "Level";
	document.getElementById("td4a").innerHTML = "Lck";
	document.getElementById("td4b").innerHTML = "Locked";
	document.getElementById("td5a").innerHTML = "Mst";
	document.getElementById("td5b").innerHTML = "Moisture";
	document.getElementById("td6a").innerHTML = "P";
	document.getElementById("td6b").innerHTML = "Pressure";
	document.getElementById("td7a").innerHTML = "Per";
	document.getElementById("td7b").innerHTML = "Perimeter";
	document.getElementById("td8a").innerHTML = "Plt";
	document.getElementById("td8b").innerHTML = "Plate";
}
//	Page 4: Changes modal table values
function getPage4() {
	document.getElementById("td1a").innerHTML = "Pre-Fltr";
	document.getElementById("td1b").innerHTML = "Pre-Filter";
	document.getElementById("td2a").innerHTML = "Pri";
	document.getElementById("td2b").innerHTML = "Primary";
	document.getElementById("td3a").innerHTML = "Rd";
	document.getElementById("td3b").innerHTML = "Reading";
	document.getElementById("td4a").innerHTML = "Sep";
	document.getElementById("td4b").innerHTML = "Separator";
	document.getElementById("td5a").innerHTML = "SP";
	document.getElementById("td5b").innerHTML = "Seal Pot";
	document.getElementById("td6a").innerHTML = "St";
	document.getElementById("td6b").innerHTML = "Station";
	document.getElementById("td7a").innerHTML = "T";
	document.getElementById("td7b").innerHTML = "Temperature";
	document.getElementById("td8a").innerHTML = "TK";
	document.getElementById("td8b").innerHTML = "Tank";
}
//	Page 5: Changes modal table values
function getPage5() {
	document.getElementById("td1a").innerHTML = "Trlr";
	document.getElementById("td1b").innerHTML = "Trailer";
	document.getElementById("td2a").innerHTML = "V";
	document.getElementById("td2b").innerHTML = "Valve";
	document.getElementById("td3a").innerHTML = "Vac";
	document.getElementById("td3b").innerHTML = "Vacuum";
	document.getElementById("td4a").innerHTML = "&nbsp;";
	document.getElementById("td4b").innerHTML = "&nbsp;";
	document.getElementById("td5a").innerHTML = "&nbsp;";
	document.getElementById("td5b").innerHTML = "&nbsp;";
	document.getElementById("td6a").innerHTML = "&nbsp;";
	document.getElementById("td6b").innerHTML = "&nbsp;";
	document.getElementById("td7a").innerHTML = "&nbsp;";
	document.getElementById("td7b").innerHTML = "&nbsp;";
	document.getElementById("td8a").innerHTML = "&nbsp;";
	document.getElementById("td8b").innerHTML = "&nbsp;";
}
function getNext(page) {
	switch(page) {
		case 1:
			return getPage1()
		case 2:
			return getPage2()
		case 3:
			return getPage3()
		case 4:
			return getPage4()
		case 5:
			return getPage5()
	}
}
//	Actions for change page buttons located on modal
$('#prev-btn').click(function(){
	var currentPage = parseInt(document.getElementById('pagenum').value, 10);
	var nextPage = currentPage - 1;
	if(currentPage > 1) {
		document.getElementById('pagenum').value = nextPage;
		getNext(nextPage);
	}	
});
$('#next-btn').click(function(){
	var currentPage = parseInt(document.getElementById('pagenum').value, 10);
	var nextPage = currentPage + 1;
	console.log("current: " + currentPage + "\nnext: " + nextPage);
	if(currentPage < 5) {
		document.getElementById('pagenum').value = nextPage;
		getNext(nextPage);
	}
});
$('#btn1').click(function(){
	getPage1();
	document.getElementById('pagenum').value = '1';
});
$('#btn2').click(function(){
	getPage2();
	document.getElementById('pagenum').value = '2';
});
$('#btn3').click(function(){
	getPage3();
	document.getElementById('pagenum').value = '3';
});
$('#btn4').click(function(){
	getPage4();
	document.getElementById('pagenum').value = '4';
});
$('#btn5').click(function(){
	getPage5();
	document.getElementById('pagenum').value = '5';
});