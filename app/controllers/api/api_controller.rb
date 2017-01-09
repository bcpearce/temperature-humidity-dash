class Api::ApiController < ApplicationController

  private

  def authenticate
    @sensor = get_api_key

    unless @sensor
      head status: :unauthorized
      return false
    end
  end

  def get_api_key
    api_key = request.headers['X-Api-Key']
    @sensor = Sensor.where(api_key: api_key).first if api_key
  end

end
