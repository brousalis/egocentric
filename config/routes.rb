Egocentric::Application.routes.draw do
  resources :guides do
    resources :comments
  end

  get "logout" => "sessions#destroy", :as => "logout"
  get "login" => "sessions#new", :as => "login"
  get "sign_up" => "users#new", :as => "sign_up"

  resources :users
  resources :sessions

  root :to => 'home#index'
end
