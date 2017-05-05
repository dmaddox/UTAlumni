$( document ).ready(function() {
        $.ajax({
      url:'/api/currentUser',
      method:'GET'
    }).done(function(data){
        
          //add logged-in user data to the left panel on dashboard.html  
            $(".edit-fullname").html(data[0].firstname + " " + data[0].lastname);
            $(".edit-city").html(data[0].location);
            $(".edit-status").html(data[0].status);
            $(".edit-employer").html(data[0].employer);
            $(".edit-salary").html(data[0].salary);
            $(".edit-interview-time").html(data[0].interview_time);
            $(".edit-cohort").html(data[0].cohort);
            $(".edit-email").html(data[0].email);
            $(".edit-linkedin").html(data[0].linkedInURL);
            $(".edit-profile").html(data[0].portfolioURL);
            $(".edit-mentor").html(data[0].portfolioURL);
            $(".profile-image").attr("src", data[0].profilePic);

        });// done
  });// end of document ready