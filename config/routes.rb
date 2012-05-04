Egocentric::Application.routes.draw do

  opinio_model

  resources :guides do
    opinio
    member do
      get :select
      get :reload_comments
      post :rate
      get :save
    end
  end

  post "avatar" => "users#update_avatar", :as => "avatar"
  post "like" => "guides#like", :as => "like"
  get "welcome" => "guides#welcome", :as => "welcome"
  get "recent" => "guides#recent", :as => "recent"
  get "logout" => "sessions#destroy", :as => "logout"
  get "login" => "sessions#new", :as => "login"
  get "sign_up" => "users#new", :as => "sign_up"

  resources :users
  resources :sessions

  root :to => 'guides#index'
end
