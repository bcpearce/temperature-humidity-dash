require 'rails_helper'

RSpec.describe Api::V1::ReadingsController, :type => :controller do

  params = { reading: { temperature:80.0, humidity:40.0 } }
  params2 = { reading: { temperature:79.0, humidity:39.0 } }

  describe 'readings#create' do

    before do
      request.env["HTTP_ACCEPT"] = 'application/json'
    end

    #test passes, but method may be invalid
    context "invalid auth" do
      it "responds with 401:unauthorized" do
        post :create, @params, 'X-Api-Key' => "helloworld"
        expect(response).to have_http_status(:unauthorized)
      end
    end

    #function works, but testing is not valid
    context "valid auth" do
      xit "responds with 201:created" do
        @sensor = Sensor.create!
        request['X-Api-Key'] = @sensor.api_key
        post :create, @params, 'X-Api-Key' => @sensor.api_key
        expect(response).to have_http_status(:created)
      end
    end

  end

  describe 'readings#index' do

    before do
      request.env["HTTP_ACCEPT"] = 'application/json'
      @sensors = [Sensor.create!, Sensor.create!]
      @readings = Reading.create(
        [params[:reading].merge(sensor_id: @sensors[0].id), 
        params2[:reading].merge(sensor_id: @sensors[1].id)])
    end

    context "no sensor specified" do
      it "returns successfully without params" do 
        get :index, format: :json
        expect(response).to have_http_status(:success)
      end
    end

    context "hours specified" do 
      before do 
        get :index, format: :json, hours: 12
      end

      it "returns all readings" do 
        expect(response).to have_http_status(:success)
      end

      it "returns two readings" do
        expect expect(JSON.parse(response.body).length).to eq(2)
      end
    end

    context "hours and sensor specified" do 
      before do 
        get :index, format: :json, hours:12, sensor_id:@sensors[0].id
      end 
      
      it "returns one reading" do 
        expect(JSON.parse(response.body).length).to eq(1)
      end

      it "returns only readings from sensor 1" do 
        expect(JSON.parse(response.body)[0]['sensor_id']).to eq(@sensors[0].id)
      end
    end
  end

end
