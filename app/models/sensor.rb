class Sensor < ActiveRecord::Base

  has_many :readings

  before_create do |doc|
    doc.api_key = doc.generate_api_key
  end

  def generate_api_key
    loop do
      token = SecureRandom.base64.tr('+/=', 'Qrt')
      break token unless Sensor.exists?(api_key: token)
    end
  end

end
