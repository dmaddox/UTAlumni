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

             $("#user_row" + i).append("<img src =" + "'" + data[1][i].profilePic + "'" + ">");
            $("#user_row" + i).append("<h2>" + data[1][i].firstname + " " + data[1][i].lastname + "</h2>");
            $("#user_row" + i).append("<h3>Employment status: " + data[1][i].employment + "</h4>");
            $("#user_row" + i).append("<h3>City: " + data[1][i].location+ "</h4>");
            $("#user_row" + i).append("<h3>Cohort: " + data[1][i].cohort + "</h4>");
          }
        });// done
	});// end of document ready