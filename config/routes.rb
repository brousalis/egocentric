Egocentric::Application.routes.draw do
#  resources :categories, :except => [:index, :show]
#  resources :forums, :except => :index do
#    resources :topics, :shallow => true, :except => :index do
#      resources :posts, :shallow => true, :except => [:index, :show]
#    end
#    root :to => 'categories#index', :via => :get
#  end

  opinio_model

  resources :guides do
    opinio
    member do
      post :delete
      get :reload_comments
      post :rate
      get :save
      get :approve
      get :feature
      get :no_type
    end
  end

  post "avatar" => "users#update_avatar", :as => "avatar"
  post "like" => "guides#like", :as => "like"
  get "logout" => "sessions#destroy", :as => "logout"
  get "login" => "sessions#new", :as => "login"
  get "sign_up" => "users#new", :as => "sign_up"

  resources :users
  resources :sessions

  root :to => 'guides#index'
end
