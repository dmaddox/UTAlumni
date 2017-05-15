//when the document is ready, we will populate the dashboard with information
$(document).ready(function() {
	$.ajax({
		url: '/api/users',
		method: 'GET'
	}).done(function(data) {
		// loop through DB to create rows for all users with their information
		for (var i = 0; i < data.length; i++) {
			var rows_area = $("<div class='individual-result row' data-toggle='modal' data-target='#myModal'>");
			rows_area.attr("id", "user_row" + i);
			$("#results-section").append(rows_area);

			//dynamically create each row here, including the picture, name, location, and cohort
			$("#user_row" + i).attr("id", i).append(

				"<div class='col-xs-3 text-center'>" +
				"<img src = '" + data[i].profilePic + "'class='results-image'/>" +
				"</div>" +
				"<div class='col-xs-7' id='searchDiv'>" +
				"<span id='firstname'>" + data[i].firstname + "</span><span id='lastname'> " + data[i].lastname + "</span>" +
				"<h4 id='results-company"+i+"'>Google</h4>" +
				"<hr id='results-hr'/>" +
				"<p id='location'>" + "<span id='city'>" + data[i].city + "</span>,<span id='state'> " + data[i].state + "</span>" +
				"<p id='cohort'>" + data[i].cohort + "</p>" +
				"</div>" +
				"<div class='col-xs-2 text-right' id='employmentStatus"+i+"' data-employ=" + data[i].status + ">" +
				"</div>")
			if (data[i].status === "employed-tech") {
				$("#employmentStatus"+i).html("<div class='text-center' id='employed'>" +
					"<i class='fa fa-briefcase fa-2x' aria-hidden='true'></i>" +
					"<p id='employment-text'>Hired in tech</p>" +
					"</div>")
				$("#results-company"+i).html(data[i].employer)
			} 
			else if (data[i].status === "employed-else") {
				$("#employmentStatus"+i).html("<div id='employed'>" +
					"<i class='fa fa-briefcase fa-2x' aria-hidden='true'></i>" +
					"<p id='employment-text'>Hired outside of tech</p>" +
					"</div>")
				$("#results-company"+i).html(data[i].employer)
			}else {
				$("#results-company"+i).empty();
			}
		} //end of for loop

		// click event to populate the modal
		$("div.individual-result").on("click", function() {
			var resultId = $(this).attr('id');
			$(".modal-profile-image").attr("src", "").attr("src", data[resultId].profilePic);
			$(".modal-name").html("").html(data[resultId].firstname + " " + data[resultId].lastname);
			$(".modal-employer").html("").html(data[resultId].employer);
			$(".modal-city").html("").html(data[resultId].city + ", " + data[resultId].state);

			$(".modal-employ-status").html("").html(data[resultId].status);
			$(".modal-salary").html("").html(data[resultId].first_salary);
			$(".modal-job-seeking").html("").html(data[resultId].interview_time);
			$(".modal-cohort").html("").html(data[resultId].cohort);

			$(".modal-email").html("").html(data[resultId].email);
			$(".modal-linkedin").html("").html("<a href = '"+ data[resultId].linkedInURL+  "'>"+ data[resultId].linkedInURL + "</a>");
			$(".modal-personal-site").html("").html("<a href = '"+ data[resultId].portfolioURL+  "'>"+ data[resultId].portfolioURL+ "</a>");
			$(".modal-mentor").html("").html(data[resultId].mentor);
			$(".modal-about").html("").html(data[resultId].about);
		})
	}); // done users api call
	$.ajax({
		url: '/api/currentUser',
		method: "GET"
	}).done(function(data) {
		//add logged-in user data to the left panel on the dashboard 
		$(".user-fullname").html(data.firstname + " " + data.lastname);
		$(".user-city").html(data.city + ", " + data.state);
		$(".user-cohort").html(data.cohort);
		$(".user-linkedin").html(data.linkedInURL);
		$(".user-profile").html(data.portfolioURL);
		$(".profile-image").attr("src", data.profilePic);

		//fill in here
		$(".user-status").html(data.status);
		$(".user-employer").html("Employer: " + data.employer);
		$(".user-salary").html("First salary post bootcamp: " + data.first_salary);
		$(".user-interview-time").html("Time job-seeking after bootcamp: " + data.interview_time);
		$(".user-mentor").html("Open to mentor: " + data.mentor);
		$(".nav-pic").attr("src", data.profilePic);

	});

}); // end of document ready