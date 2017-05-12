$(document).ready(function(){


var totalPeople;
$.ajax({
  url: "/api/stats",
  method:"GET"
}).done(function(info){

  // totalPeople = info.employedTech + info.employedElse + info.studentNum + info.noJob;
  // totalinterview = info.employedTech + info.employedElse + info.studentNum + info.noJob;

 google.charts.load('current', {'packages':['corechart']});
 google.charts.setOnLoadCallback(employDrawChart);
 google.charts.setOnLoadCallback(interviewDrawChart);

  function employDrawChart() {

    var employData = google.visualization.arrayToDataTable([
      ['Employment Status', 'Number of users'],
      ['Employed in tech', info.employedTech],
      ['Employed elsewhere', info.employedElse],
      ['Currently looking', info.noJob],
      ['Student', info.studentNum]
    ]);

    var employOptions = {
      title: 'Employment Rates',
      colors:["#22C0D5", '#F27732','#FF995F', "#D6540B"]
    };

    var chart = new google.visualization.PieChart(document.getElementById('employ-piechart'));

    chart.draw(employData, employOptions);
  } 

  function interviewDrawChart() {

  var interviewData = google.visualization.arrayToDataTable([
    ['Months Job Seeking', 'Number of users'],
    ['0-3 months', info.zeroToThree],
    ['4-7 months', info.fourToSeven],
    ['8-12 months', info.eightToTwelve],
    ['13+ months', info.noJob]
  ]);

  var interviewOptions = {
    title: 'Months Job Seeking',
    colors:["#22C0D5", '#F27732','#FF995F', "#D6540B"]
  };

  var chart = new google.visualization.PieChart(document.getElementById('interview-piechart'));

  chart.draw(interviewData, interviewOptions);
  } 


}); //end of done

}); //end doc ready

