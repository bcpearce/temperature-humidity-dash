Temperature, Humidity Dashboard
===============================

This app provides an API for submitting Temperature and Humidity data collected using a DHT sensor.  The data can then be read from the api and displayed in a chart.

An accompanying Python script is run on a separate Raspberry Pi computer which has a DHT11 sensor connected to it.  The RPi collects a data sample and posts the record to the Rails application.
