$( document ).ready(function() {
        $.ajax({
      url:'/api/users',
      method:'GET'
    }).done(function(data){
          // loop through DB to create rows for all users with their information
          for (var i = 0; i < data[1].length; i++) {
            var rows_area = $("<div class='individual-result well' data-toggle='modal' data-target='#myModal'>");
            rows_area.attr("id", "user_row" + i);
            $(".allRows").append(rows_area);
            $("#user_row" + i).append("<img src = '" + data[1][i].profilePic + "'/>");
            $("#user_row" + i).append("<h3 id='firstname'>" + data[1][i].firstname + "</h3><h3 id='lastname'> " + data[1][i].lastname + "</h3>");
            $("#user_row" + i).append("<h3>Employment status:</h3> <h3 id='status'>" + data[1][i].employment + "</h3>");
            $("#user_row" + i).append("<h3>City:</h3> <h3 id='location'>" + data[1][i].location+ "</h3>");
            $("#user_row" + i).append("<h3>Cohort:</h3> <h3 id='cohort'>" + data[1][i].cohort + "</h3>");
          }

          
          //add logged-in user data to the left panel on dashboard.html  
            $(".user-fullname").html(data[0].firstname + " " + data[0].lastname);
            $(".user-city").html("Location: " + data[0].location);
            $(".user-cohort").html("Graduation: " + data[0].cohort);
            $(".user-linkedin").html("Linkedin Profile: " + data[0].linkedInURL);
            $(".user-profile").html("Profile: " + data[0].portfolioURL);
             $(".profile-image").html("<img src = '" + data[0].profilePic + "' height = 200px width = 200px/>");

        });// done
  });// end of document ready