$(document).ready(function() {
	$.ajax({
		url: '/api/users',
		method: 'GET'
	}).done(function(data) {
		// loop through DB to create rows for all users with their information
		for (var i = 0; i < data.length; i++) {
			var rows_area = $("<div class='individual-result well' data-toggle='modal' data-target='#myModal'>");
			rows_area.attr("id", "user_row" + i);
			$(".allRows").append(rows_area);
			$("#user_row" + i).append("<img src = '" + data[i].profilePic + "'/>");
			$("#user_row" + i).append("<h3 id='firstname'>" + data[i].firstname + "</h3><h3 id='lastname'> " + data[i].lastname + "</h3>");
			$("#user_row" + i).append("<h3>Employment status:</h3> <h3 id='status'>" + data[i].employment + "</h3>");
			$("#user_row" + i).append("<h3>City:</h3> <h3 id='location'>" + data[i].location + "</h3>");
			$("#user_row" + i).append("<h3>Cohort:</h3> <h3 id='cohort'>" + data[i].cohort + "</h3>");
		}



	}); // done
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
	})

}); // end of document ready