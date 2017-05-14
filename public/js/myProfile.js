$( document ).ready(function() {

        $.ajax({
      url:'/api/currentUser',
      method:'GET'
    }).done(function(data){
        
          //add logged-in user data to the left panel on dashboard.html  
            $(".edit-fullname").html(data.firstname + " " + data.lastname);
            $(".edit-location").html(data.location);
            $(".edit-about").html(data.about);
            $(".edit-status").html(data.status);
            console.log(data.status)
            $(".edit-employer").html(data.employer);
            $(".edit-salary").html(data.first_salary);
            $(".edit-interview-time").html(data.interview_time);
            $(".edit-cohort").html(data.cohort);
            $(".edit-email").html(data.email);
            $(".edit-linkedin").html(data.linkedInURL);
            $(".edit-portfolioURL").html(data.portfolioURL);
            $(".edit-mentor").html(data.mentor);
            $(".profile-image").attr("src", data.profilePic);
            $(".nav-pic").attr("src", data.profilePic);

        });// done
  });// end of document ready

$(".edit").on("click", function() {
        $.ajax({
      url:'/api/currentUser',
      method:'GET'
    }).done(function(data){
        
          //add logged-in user data to the left panel on dashboard.html  
            $(".firstname").val(data.firstname);
            $(".lastname").val(data.lastname);
            $(".city").val(data.city);
            $(".state").val(data.state);
            $(".about").val(data.about);
            $(".status").val(data.status);
            $(".employer").val(data.employer);
            $(".first_salary").val(data.first_salary);
            $(".interview_time").val(data.interview_time);
            $(".linkedInURL").val(data.linkedInURL);
            $(".portfolioURL").val(data.portfolioURL);
            $(".mentor").val(data.mentor);
            $(".profilePic").val(data.profilePic);

    });// done


// -------------  Update available characters on the profile 'about' edit section ------------// 

function updateCountdown() {
    // 280 is the max message length
    var remaining = 280 - $('#message-countdown').val().length;
    $('#text-count-down').text(remaining + ' characters remaining.');
};
updateCountdown();
$('#message-countdown').on("input", updateCountdown);


// -------------   -------------   -------------     -------------    -------------  ------------// 


});// end of 'edit' click function

