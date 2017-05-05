$(document).ready(function() {
	$("#searchBtn").on("click", function() {
		var dropFilter
		var userFilter
		dropFilter = $("#drop-down-search").val().trim();
		userFilter = $("#userFilter").val().trim();
		console.log(dropFilter + " " + userFilter)
		$(".individual-result").each(function(index) {
			// var testing = (this).attr("id",dropFilter).val();
			var divResult = $(this +'> h3#'+dropFilter );
			// .attr("id", dropFilter).val();
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