var currentFieldset;
var nextFieldset;
var previousFieldset;
var animating;
var left;
var opacity;
var scale;
var emailOK = false;
var passwordOK = false;
var locationOK = true;
var password = $('#pass');
var confirmPass = $("#confirmP");
var email = $("#email");
var city = $("#city");
var emailArray = [];
var submitForm = false;

 $(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        e.preventDefault();
        return false;
    }
});


//check password for length and if they match
function passwordCheck(){
	if (password.val() != confirmPass.val())	 {
   	$('#password-error').text("*Passwords must match!");
   	password.addClass("input-error");
    } else if (password.val().length < 6) {
    	$('#password-error').text("*Must enter a password longer than 5 characters!");
    	password.addClass("input-error");
    } else {
    	passwordOK = true;
    }
}
//check email for correct length and if it has a @ and . value
function emailCheck(){
	//email validation
	if (email.val().length < 5) {
    	$("#email-error").text("*Please submit a valid email!");
    	emailOK = false;
    }
  //email must include an @ character
	if (emailArray.includes('@') && emailArray.includes('.')) {
		emailOK = true;
	} else {
		$("#email-error").text("*Please submit a valid email!");
		emailOK = false;
	}
}




$(".next").click(function(){
	//turn email into an array to check of @ character
	emailArray = $("#email").val().split('');
	animating = true;
	currentFieldset = $(this).parent();
	nextFieldset = $(this).parent().next();
	currentFieldset.find('input[type="text"],input[type="password"], select').each(function () {
    if ($(this).val() == "") {
        $(this).addClass('input-error');
        emailOK = false;
        animating = false;
    } else {
        $(this).removeClass('input-error');
    }
  });

	passwordCheck();
	emailCheck();

	if(emailOK && passwordOK && animating && $(".input-value").val()){
// shows next progress step
	// if(animating) return false;
		$("#progress-bar li").eq($("fieldset").index(nextFieldset)).addClass("active");

	// show next field set
	nextFieldset.show();


	// animate current fieldset as it's opacity is changed to 0
	currentFieldset.animate({opacity: 0}, {
		step: function(now, mx){

			scale = 1 - (1 - now)* 0.2;

			left= (now * 50) + "%";

			opacity = 1 - now;
			currentFieldset.css({
				'transform':
				'scale('+ scale +')',
				'position': 'absolute'
			});
			nextFieldset.css({'left': left, 
				'opacity': opacity});
  		},
	  	duration: 800,
	  	complete: function(){
	  		// hide current fieldset
	  		currentFieldset.hide();
	  		// set animating to false
	  		animating = false;
  		}
  	});
  }
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;

	currentFieldset = $(this).parent();
	previousFieldset = $(this).parent().prev();
	// shows next progress step
	$("#progress-bar li").eq($("fieldset").index(currentFieldset)).removeClass("active");

	// show next field set
	previousFieldset.show();

	// animate current fieldset as it's opacity is changed to 0
	currentFieldset.animate({opacity: 0},{
		step: function(now, mx){

			scale = 0.8 + (1 - now) * 0.2;

			left = ((1-now) * 50) + "%";

			opacity = 1 - now;

			currentFieldset.css({'left': left});
			previousFieldset.css({'transform':
			'scale(' + scale + ')', 'opacity': opacity});	
		},
		duration: 800,
		complete: function(){
			// hide current field
			currentFieldset.hide();
			// set animating to false
			animating = false;
		}
	});
}); 

// smooth scroll 
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});