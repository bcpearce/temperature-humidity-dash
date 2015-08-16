class Reading < ActiveRecord::Base

  before_save :round_measurements

  private
    def round_measurements
      self.temperature = self.temperature.round(1)
      self.humidity = self.humidity.round(1)
    end
end
