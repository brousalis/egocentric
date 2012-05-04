class SessionsController < ApplicationController

  def create
    @user = User.find_by_username(params[:username])
    if @user && @user.authenticate(params[:username], params[:password])
      session[:user_id] = @user.id
      success = true
    end
    respond_to do |format|
      format.json {
        if success
          render :json => {"redirect" => request.env["HTTP_REFERER"], "user" => @user, "status" => "success"}
        else
          render :json => {"status" => "failure", "errors" => "Username or password incorrect"}
       end
      }
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end
end
