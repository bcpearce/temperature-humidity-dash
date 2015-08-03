# serve static pages from root
HighVoltage.configure do |config|
  config.route_drawer = HighVoltage::RouteDrawers::Root
end
