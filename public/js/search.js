$(document).ready(function() {
	$("#searchBtn").on("click", function() {
		var dropFilter
		var userFilter
		dropFilter = $("#drop-down-search").val().trim();
		userFilter = $("#userFilter").val().trim();
		console.log(dropFilter + " " + userFilter)
		$(".individual-result").each(function(index) {
			// var testing = (this).attr("id",dropFilter).val();
			// THIS IS THE QUESTION- how can we targe the h3 w/i a div and get the value
			var divResult = $(this).children('h3#' + dropFilter).html();
			// console.log(testing);
			console.log(divResult);
			console.log(this);
			if (divResult != userFilter) {
				console.log(this);
				$(this).hide();
			}
		})
	})

})