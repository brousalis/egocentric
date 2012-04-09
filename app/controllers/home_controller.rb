class HomeController < ApplicationController
  before_filter :authorize, :except => [:index]
  before_filter :current_user

  def index
  end
end
