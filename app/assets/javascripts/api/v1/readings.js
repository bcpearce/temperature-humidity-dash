// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {

  var tJSON = $.getJSON( "/api/v1/readings.json", function(data) {

    var vizData = [['Time', 'Temperature', 'Humidity']];
    var dataLength = data.length;

    if (dataLength <= 0) {
      return
    }

    for (var i = 0; i < dataLength; i++) {
      date = new Date(data[i].datetime);
      temp = parseFloat(data[i].temperature);
      hum = parseFloat(data[i].humidity);
      vizData.push([date, temp, hum]);
    }

    var tableData = google.visualization.arrayToDataTable(vizData);

    var options = {
      title: ['Temperature (F)', 'Humdity (%)'],
      titleTextStyle: {color: 'white'},
      hAxis: {title: 'Time',  titleTextStyle: {color: '#FFF'},
              textStyle: {color: '#666'}},
      vAxis: {textStyle: {color: '#666'},
              titleTextStyle: {color: '#FFF'}},
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1}
      },
      vAxes: {
        0: {title: 'Temps (Fahrenheit)'},
        1: {title: 'Humidity (%)'}
      },
      backgroundColor: {fill:'#222', stroke:'#aaa'},
      colors: ['yellow', 'blue'],
      areaOpacity: 0.12
    };

    var chart = new google.visualization.AreaChart(document.getElementById('temp_chart_div'));
    chart.draw(tableData, options);
  });

}
