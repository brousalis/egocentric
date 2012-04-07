class HomeController < ApplicationController
  before_filter :authorize, :except => [:index]
  def index
    @user = current_user || User.new
  end
end
