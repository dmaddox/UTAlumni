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
      colors:["#22C0D5", "#E79454", "#D3752D", "#FFBA85"],
      fontSize: 16,
      fontName: "Helvetica",
      legend: {position: "top", maxLines: 5, alignment: "start", textStyle: {fontSize: 16}},
      titleTextStyle : {fontSize: 18, bold: true},
      chartArea: {top: 60}
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
    colors:["#22C0D5", "#E79454", "#D3752D", "#FFBA85"],
    fontSize: 16,
    fontName: "Helvetica",
    legend: {position: "top", maxLines: 5, alignment: "start", textStyle: {fontSize: 16}},
    titleTextStyle : {fontSize: 18, bold: true},
    chartArea: {top: 60}
  };

  var chart = new google.visualization.PieChart(document.getElementById('interview-piechart'));

  chart.draw(interviewData, interviewOptions);
  } 

  $(window).on("resize", function () {
      interviewDrawChart();
      employDrawChart();
  });

}); //end of done

}); //end doc ready