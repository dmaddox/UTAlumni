
var currentFieldset;
var nextFieldset;
var previousFieldset;
var animating;
var emailOK = false;
var passwordOK = false;
var password = $('#pass');
var confirmPass = $("#confirmP");
var email = $("#email");
var location = ("#location");
var emailArray = [];


//check password for length and if they match
function passwordCheck(){
	if (password.val() != confirmPass.val())	 {
   	$('#password-error').text("*Passwords must match!");
   	password.addClass("input-error");
    } else if (password.val().length < 5) {
    	$('#password-error').text("*Must enter a password longer than 5 characters!");
    	password.addClass("input-error");
    } else {
    	passwordOK = true;
    }
}
//check email for correct length and if it has a @ value
function emailCheck(){
	if (email.val().length < 5) {
    	$("#email-error").text("*longer that 5 words");
    	emailOK = false;
    }
	if (emailArray.includes('@')) {
		emailOK = true;
	} else {
		$("#email-error").text("*Please include a @ email");
		emailOK = false;
	}
}




$(".next").click(function(){
	emailArray = $("#email").val().split('');
	animating = true;
	currentFieldset = $(this).parent();
	nextFieldset = $(this).parent().next();
	currentFieldset.find('input[type="text"],input[type="password"], select').each(function () {
    if ($(this).val() == "") {
        $(this).addClass('input-error');
        emailOK = false;
    }else {
        $(this).removeClass('input-error');
    }
  });

	passwordCheck();
	emailCheck();
    
	if(emailOK && passwordOK){
// shows next progress step
	// if(animating) return false;
		$("#progress-bar li").eq($("fieldset").index(nextFieldset)).addClass("active");

	// show next field set
	nextFieldset.show();


		// hide current
		currentFieldset.animate({
 			opacity: 0
  	}, 800, function() {
	    currentFieldset.hide();
	    animating = false;
			}
		)
		nextFieldset.animate({
 			opacity: 1
  	}, 800, function() {
	    currentFieldset.hide();
	    animating = false;
			}
		)
	}
});



$(".previous").click(function(){
	if(animating) return false;
	animating = true;

	currentFieldset = $(this).parent();
	previousFieldset = $(this).parent().prev();
	// shows next progress step
	$("#progress-bar li").eq($("fieldset").index(previousFieldset)).removeClass("active");

	// show next field set
	previousFieldset.show();


	// hide current
	currentFieldset.animate({
	 opacity: 0
	  }, 800, function() {
		    currentFieldset.hide();
		    animating = false;
		})
	previousFieldset.animate({
	 opacity: 1
	  }, 800, function() {
		    currentFieldset.hide();
		    animating = false;
		}
	)
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
