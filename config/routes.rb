Rails.application.routes.draw do

  root 'sensors#index'

  get '/sensors/:id',   to: 'sensors#show'
  get '/sensors',       to: 'sensors#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :readings
    end
  end

  resources :graphs, only: :index

end
