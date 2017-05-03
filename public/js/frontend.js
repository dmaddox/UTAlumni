// Form jQuery

var currentFieldset;
var nextFieldset;
var previousFieldset;
var animating;


$(".next").click(function()){
	if(animating) return false;
	animating = true;

	currentFieldset = $(this).parent();
	nextFieldset = $(this).next();
// shows next progress step
	$("#progress-bar li").eq($("fieldset").index("next-fieldset")).addClass("active");

// show next field set
nextFieldset.show();

// hide current
currentFieldset.animate({ opacity: 0 }, {
	step: function(now, mx) {
	    scale = 1 - (1 - now) * 0.2;

	    left = (now * 50) + % ;

	    opacity = 1 - now;

	    currentFieldset.css({
	        'transform': scale('+scale+'),
	        'position': 'absolute'
	    });
	    nextFieldset.css({ 'left': left, 'opacity': opacity });
	},
	duration: 800,
	complete: function() {
	    currentFieldset.hide();
	    animating = false;
	},
	easing: 'easeInOutBack'
	});

});

$(".previous").click(function()){
	if(animating) return false;
	animating = true;

	currentFieldset = $(this).parent();
	previousF = $(this).next();
// shows previous progress step
	$("#progress-bar li").eq($("fieldset").index("next-fieldset")).removeClass("active");

// show next field set
previousFieldset.show();

// hide current
currentFieldset.animate({ opacity: 0 }, {
	step: function(now, mx) {
	    scale = 0.8 + (1 - now) * 0.2;

	    left = ((1-now) * 50) + % ;

	    opacity = 1 - now;

	    currentFieldset.css({
	        'left': left
	    });
	   	previousFieldset.css({ 'transform': scale('+scale+'), 'opacity': opacity });
	},
	duration: 800,
	complete: function() {
	    currentFieldset.hide();
	    animating = false;
	},
	easing: 'easeInOutBack'
	});

});
$('#submit').click(function(){
	return false;
})
