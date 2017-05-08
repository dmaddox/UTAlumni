$(document).ready(function() {
	$.ajax({
		url: '/api/users',
		method: 'GET'
	}).done(function(data) {
		// loop through DB to create rows for all users with their information
		for (var i = 0; i < data.length; i++) {
			var rows_area = $("<div class='individual-result well row' data-toggle='modal' data-target='#myModal'>");
			rows_area.attr("id", "user_row" + i);
			$(".allRows").append(rows_area);

      //create each row here
        $("#user_row" + i).attr("id", i).append(
          "<div class='col-xs-3 text-center'>" +
            "<img src = '" + data[i].profilePic + "'class='results-image'/>"+
          "</div>"+
          "<div class='col-xs-6 text-center'>"+
            "<span id='firstname'>" + data[i].firstname + "</span><span id='lastname'> " + data[i].lastname + "</span>"+
            "<hr id='results-hr'/>" +
            "<p id='location'>" + data[i].location + "</p>"+
            "<p id='cohort'>" + data[i].cohort + "</p>"+
          "</div>"+
          "<div class='col-xs-3 text-right'>"+
            "<div id='employed'>" +
            	"<span id='employment-text'>Hired</span>"+
              "<i class='fa fa-briefcase fa-2x' aria-hidden='true'></i>"+
            "</div>"+
          "</div>"
        )
		}//end of for loop

		// click event to populate the modal
		$("div.individual-result").on("click", function(){
			var resultId = $(this).attr('id');
			console.log(resultId);
			console.log(data[resultId].firstname);
			$(".modal-name").html("").html(data[resultId].firstname + " " + data[resultId].lastname);
			$(".modal-employer").html("").html(data[resultId].employer);
			$(".modal-cohort").html("").html(data[resultId].cohort);
			$(".modal-email").html("").html(data[resultId].email);
			$(".modal-city").html("").html(data[resultId].location);
			$(".modal-mentor").html("").html(data[resultId].mentor);
			// remember to add icon links when isaac is done with HTML
		})
	}); // done users api call
	$.ajax({
		url: '/api/currentUser',
		method: "GET"
	}).done(function(data) {
		//add logged-in user data to the left panel on dashboard.html  
		$(".user-fullname").html(data.firstname + " " + data.lastname);
		$(".user-city").html("Location: " + data.location);
		$(".user-cohort").html("Graduation: " + data.cohort);
		$(".user-linkedin").html("Linkedin Profile: " + data.linkedInURL);
		$(".user-profile").html("Profile: " + data.portfolioURL);
		$(".profile-image").html("<img src = '" + data.profilePic + "' height = 200px width = 200px/>");
	});



}); // end of document ready