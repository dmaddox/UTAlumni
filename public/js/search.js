$(document).ready(function() {
	$("#drop-down-search").on("change", function() {
		var dropFilter
		dropFilter = $("#drop-down-search").val().trim();
		console.log(dropFilter)
		if (dropFilter === "cohort") {
			console.log("caught chenge to cohort");
			$("#userFilter").html('<p>Worked</p>');

			// ('<select id="userFilter" class="form-control selectpicker" data-style="btn-primary"><option value="Fall Full Time 2016">Fall Full Time 2016</option><option value="Fall Part Time 2016">Fall Part Time 2016</option><option value="Spring Full Time 2017">Spring Full Time 2017</option><option value="Spring Part Time 2017">Spring Part Time 2017</option><option value="Fall Full Time 2017">Fall Full Time 2017</option></select>')

		} else {
			console.log("hit the else");
			$("#userFilter").html('<input id="userFilter" type="text" class=" form-control" placeholder="Search"/>')
		}
	})



	$("#searchBtn").on("click", function() {
		var dropFilter;
		var userFilter;
		dropFilter = $("#drop-down-search").val().trim();
		userFilter = $("#userFilter").val().trim();
		console.log(dropFilter + " " + userFilter)
		if (dropFilter === "") {

		} else {
			$(".individual-result").each(function(index) {
				// var testing = (this).attr("id",dropFilter).val();
				// THIS IS THE QUESTION- how can we targe the h3 w/i a div and get the value
				var divResult = $(this).children("#searchDiv").children('#' + dropFilter).html().trim();

				// console.log(testing);
				console.log(divResult);
				console.log(this);
				if (divResult.toLowerCase() !== userFilter.toLowerCase()) {
					$(this).hide();
				} else {
					$(this).show();
				}
			})
		}
	})
})