$( document ).ready(function() {
				$.ajax({
			url:'/api/users',
			method:'GET'
		}).done(function(data){
          for (var i = 0; i < data[1].length; i++) {
            var rows_area = $("<div>");
            rows_area.addClass("row_area");
            rows_area.attr("id", "user_row" + i);
            $(".individual-result").append(rows_area);

            $("#user_row" + i).append("<h2>" + data[i].firstname + " " + data[i].lastname + "</h2>");
            $("#user_row" + i).append("<h3>Employment status: " + data[i].employment + "</h4>");
            $("#user_row" + i).append("<h3>City: " + data[i].location+ "</h4>");
            $("#user_row" + i).append("<h3>Cohort: " + data[i].cohort + "</h4>");
          }
        });// done
	});// end of document ready