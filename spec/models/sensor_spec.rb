require 'rails_helper'

RSpec.describe Sensor, :type => :model do

  it { is_expected.to have_many :readings }

  describe "Creating a Sensor" do
    
    it "auto-generates an api_key" do
      s = Sensor.create!
      expect(s.api_key).to_not be nil
    end

    it "has different api-keys per sensor" do
      s = [Sensor.create!, Sensor.create!]
      expect(s[0].api_key).to_not eq(s[1].api_key)
    end

  end

end
