class Api::V1::ReadingsController < Api::ApiController

  respond_to :json

  skip_before_filter :verify_authenticity_token
  before_action :authenticate, only: :create

  def show
    @reading = Reading.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @reading }
    end
  end

  def index
    h = params[:hours].to_f
    h ||= 12
    @readings = Reading.where('created_at >= ?', h.hours.ago).order(:created_at)
    respond_to do |format|
      format.html
      format.json { render json: @readings }
    end
  end

  def create
    @reading = Reading.new(reading_params)
    if @reading.save
      respond_to do |format|
        format.json { render json: :show, status: :created, location: api_v1_reading_url(@reading) }
      end
    end
  end

  private

    def reading_params
      params.require(:reading).permit(:temperature, :humidity)
    end

end
