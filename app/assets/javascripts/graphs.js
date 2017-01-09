var charts = {};

function loadGraphs() {
    var contexts = $("#charts").find("canvas")
        .map(function() { return this; }).get();

    hours = 12;

    for (i in contexts) {
        drawGraph(parseInt(i)+1, contexts[i], hours);
    }   
};

function drawGraph(sensor_id, context, hours=12) {
    var chart = null;

    var tJSON = $.getJSON(
        "/api/v1/readings.json?hours=" + hours + "&sensor_id=" + sensor_id,
        function(data) {

            //var vizData = [['Time', 'Temperature', 'Humidity']];
            var dataLength = data.length;

            var humidityData = [];
            var temperatureData = [];

            $("#hour_timeframe" + sensor_id).html(" " + hours + " ");

            for (var j = 0; j < dataLength; j++) {
                date = new Date(data[j].created_at);
                temp = parseFloat(data[j].temperature);
                hum = parseFloat(data[j].humidity);
                //vizData.push([date, temp, hum]);
                humidityData.push({x:date, y:hum});
                temperatureData.push({x:date, y:temp});
                //set the latest ones
                if (j == (dataLength-1)) {
                    $("#latest_temperature" + sensor_id)
                        .html("(" + temp + "&#8457)");
                    $("#latest_humidity"+ sensor_id)
                        .html("(" + hum + "%)");
                }
            }

            var ctx = document.getElementById(context.id);
            if (charts[context.id]) {
                charts[context.id].destroy();
            }
            chart = new Chart(ctx, {
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
    charts[context] = chart;
};

window.onload = function() {
    loadGraphs();
}

