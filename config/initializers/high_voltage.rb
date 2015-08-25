# serve static pages from root
HighVoltage.configure do |config|
  config.route_drawer = HighVoltage::RouteDrawers::Root
  #config.home_page = 'index'
end
