Rails.application.routes.draw do

  root 'graphs#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :readings
    end
  end

  resources :graphs, only: :index

end
