require 'rails_helper'

RSpec.describe Reading, :type => :model do
  it "rounds any reading to 1 decimal place" do
    r = Reading.create(temperature:40.1657, humidity:40.1657)
    expect([r.temperature, r.humidity]).to eq([40.2, 40.2])
  end
end
