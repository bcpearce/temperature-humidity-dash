// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

google.load("visualization", "1", {packages:["corechart"]});
//google.setOnLoadCallback(drawChart);
google.setOnLoadCallback(drawChart);

function drawChart() {

  var tJSON = $.getJSON(
    "/api/v1/readings.json?hours=12",
    function(data) {

      var vizData = [['Time', 'Temperature', 'Humidity']];
      var dataLength = data.length;

      for (var i = 0; i < dataLength; i++) {
        date = new Date(data[i].created_at);
        temp = parseFloat(data[i].temperature);
        hum = parseFloat(data[i].humidity);
        vizData.push([date, temp, hum]);
        //set the latest ones
        if (i == (dataLength-1)) {
          $("#latest_temperature").html("(" + temp + "&#8457)")
          $("#latest_humidity").html("(" + hum + "%)")
        }
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
          0: {title: 'Temperature (Fahrenheit)', minValue:40, maxValue:100},
          1: {title: 'Humidity (%)', minValue:0, maxValue:80}
        },
        backgroundColor: {fill:'#222', stroke:'#aaa'},
        colors: ['yellow', 'blue'],
        areaOpacity: 0.12,
        smoothLine: true
      };

      var chart = new google.visualization.AreaChart(document.getElementById('temp_chart_div'));
      chart.draw(tableData, options);
  });

}
