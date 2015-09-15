Temperature, Humidity Dashboard
===============================

This app provides an API for submitting Temperature and Humidity data collected using a DHT sensor.  The data can then be read from the api and displayed in a chart.

An accompanying Python script is run on a separate Raspberry Pi computer which has a DHT11 sensor connected to it.  The RPi collects a data sample and posts the record to the Rails application.

Setting Up the Web Server
-------------------------

After starting the web server, you need to add a "Sensor" to the database for validating Temperature and Humidity posts.  Start the rails console with `$ rails c`.  Within the console run `>> Sensor.create!`.  Inspect the object by typing `>> Sensor.first` and note the `api_key` that is shown.  

Running the RPi Script
----------------------
The Python script is run with the command
```
$ ./read_and_post.py {sensor_code} {GPIO_pin} {host_name} {sleep_time} {api_key}
```
Use the API key generated above and be sure the RPi can communicate with the server running the Rails Application.
