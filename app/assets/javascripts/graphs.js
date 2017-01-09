
window.onload = function() {

    var contexts = $("#charts").find("canvas")
        .map(function() { return this.id; }).get();

    hours = 12;

    for (i in contexts) {
        drawGraph(parseInt(i)+1, contexts[i], hours);
    }
        
};

function drawGraph(sensor_id, context, hours=12) {
    var tJSON = $.getJSON(
        "/api/v1/readings.json?hours=" + hours + "&sensor_id=" + sensor_id,
        function(data) {

            //var vizData = [['Time', 'Temperature', 'Humidity']];
            var dataLength = data.length;

            var humidityData = [];
            var temperatureData = [];

            for (var j = 0; j < dataLength; j++) {
                date = new Date(data[j].created_at);
                temp = parseFloat(data[j].temperature);
                hum = parseFloat(data[j].humidity);
                //vizData.push([date, temp, hum]);
                humidityData.push({x:date, y:hum});
                temperatureData.push({x:date, y:temp});
                //set the latest ones
                if (j == (dataLength-1)) {
                    $("#latest_temperature").html("(" + temp + "&#8457)")
                    $("#latest_humidity").html("(" + hum + "%)")
                }
            }

            var ctx = document.getElementById(context);
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Temperature',
                        yAxisID: "y-axis-0",
                        data: temperatureData,
                        borderColor: "rgba(200,200,0,0.8)",
                        backgroundColor: "rgba(200,200,0,0.2)"
                    }, {
                        label: 'Humidity',
                        yAxisID: "y-axis-1",
                        data: humidityData,
                        borderColor: "rgba(0,0,200,0.8)",
                        backgroundColor: "rgba(0,0,200,0.2)"
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                displayFormats: {
                                    hour: 'MMM D, hA'
                                }
                            }
                        }],
                        yAxes: [{
                            position: "left",
                            "id": "y-axis-0",
                            ticks: {
                                suggestedMin: 0,
                                stepSize: 10,
                                suggestedMax: 100
                            }
                        }, {
                            position: "right",
                            "id": "y-axis-1",
                            ticks: {
                                suggestedMin: 0,
                                stepSize: 10,
                                suggestedMax: 100
                            }
                        }]
                    }
                }
            });
        });
};

//resize height of graphs based on width
$(window).resize(function() {
    $('canvas').height($('canvas').width() / 2.0);
});