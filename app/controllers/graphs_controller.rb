class GraphsController < ApplicationController

	def index
		@hours = params[:hours]
		@hours ||= 12
		gon.hours = @hours
	end

end
