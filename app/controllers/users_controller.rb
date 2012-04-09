class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    @user.role = "member"
    if @user.save
      session[:user_id] = @user.id
      render :json => { "status" => "success",
                        "redirect" => "/"}
    else
      render :json => { "status" => "failure",
                        "errors" => @user.errors.full_messages}
    end
  end
end
