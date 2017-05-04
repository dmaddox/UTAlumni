$( document ).ready(function() {
				$.ajax({
			url:'/api/users',
			method:'GET'
		}).done(function(data){
           for (var i = 0; i < data[1].length; i++) {
            var rows_area = $("<div class='individual-result well' data-toggle='modal' data-target='#myModal'>");
            //rows_area.addClass("row_area");
            rows_area.attr("id", "user_row" + i);
            $(".allRows").append(rows_area);

             $("#user_row" + i).append("<img src = '" + data[1][i].profilePic + "'/>");
            $("#user_row" + i).append("<h2>" + data[1][i].firstname + " " + data[1][i].lastname + "</h2>");
            $("#user_row" + i).append("<h3>Employment status: " + data[1][i].employment + "</h3>");
            $("#user_row" + i).append("<h3>City: " + data[1][i].location+ "</h3>");
            $("#user_row" + i).append("<h3>Cohort: " + data[1][i].cohort + "</h3>");
          }

          for (var i = 0; i < 1; i++){
           
            $(".user-fullname").html(data[0].firstname + " " + data[0].lastname);
            $(".user-city").html("").html(data[0].location);
            $(".user-cohort").html("").html(data[0].cohort);
            $(".user-linkedin").html("").html(data[0].linkedInURL);
            $(".user-profile").html("").html(data[0].profileURL);
             $(".profile-image").attr(src,"'" + data[0].profilePic + "'");
          }

        });// done
	});// end of document ready