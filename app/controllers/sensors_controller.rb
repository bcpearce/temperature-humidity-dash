class SensorsController < ApplicationController

    def index
        @sensors = Sensor.all
        respond_to do |format|
          format.html
        end
    end

    def show
        @sensor = Sensor.find(:id)
    end
end
