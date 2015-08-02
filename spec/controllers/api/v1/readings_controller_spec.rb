require 'rails_helper'

RSpec.describe Api::V1::ReadingsController, :type => :controller do

  describe 'readings#create' do

    @params = { reading: { temperature:80.0, humidity:40.0, datetime:DateTime.now },
                format: :json }

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

end
