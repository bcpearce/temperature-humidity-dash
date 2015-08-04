// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {

  var tJSON = $.getJSON( "/api/v1/readings.json", function(data) {
    var vizData = [['Time', 'Temperature']];
    var dataLength = data.length

    for (var i = 0; i < dataLength; i++) {
      date = new Date(data[i].datetime);
      temp = parseFloat(data[i].temperature)
      vizData.push([date, temp]);
    }

    var tableData = google.visualization.arrayToDataTable(vizData);

    var options = {
      title: 'Temperature',
      hAxis: {title: 'Time',  titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 40}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('temp_chart_div'));
    chart.draw(tableData, options);
  });

}
