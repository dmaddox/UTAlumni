$( document ).ready(function() {
        $.ajax({
      url:'/api/currentUser',
      method:'GET'
    }).done(function(data){
        
          //add logged-in user data to the left panel on dashboard.html  
            $(".edit-fullname").html(data.firstname + " " + data.lastname);
            $(".edit-city").html(data.location);
            $(".edit-status").html(data.status);
            $(".edit-employer").html(data.employer);
            $(".edit-salary").html(data.salary);
            $(".edit-interview-time").html(data.interview_time);
            $(".edit-cohort").html(data.cohort);
            $(".edit-email").html(data.email);
            $(".edit-linkedin").html(data.linkedInURL);
            $(".edit-profile").html(data.portfolioURL);
            $(".edit-mentor").html(data.portfolioURL);
            $(".profile-image").attr("src", data.profilePic);

        });// done
  });// end of document ready