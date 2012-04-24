require 'uri'
require 'net/http'

class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def update_avatar
    success = false
    url = URI.parse(params[:avatar])

    Net::HTTP.start(url.host, url.port) do |http|
      response = http.head(url.path)
      case response
      when Net::HTTPSuccess, Net::HTTPRedirection
        case response.content_type
        when "image/png", "image/gif", "image/jpeg"
          success = true
        else
          success = false
        end
      else
        success = false
      end
    end

    if success
      current_user.update_attributes(:avatar => params[:avatar])
      render :json => { "status" => "success" }
    else
      render :json => { "status" => "fail" }
    end
  end

  def update
    current_user.update_attributes(params[:user])
    current_user.save
    redirect_to request.env["HTTP_REFERER"]
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
