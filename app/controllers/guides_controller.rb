class GuidesController < ApplicationController

  before_filter :authorize, :except => [:index]
  before_filter :find_guide

  def index
  end 

  def new
    @guides = Guide.all
  end

  def create
    @guide = Guide.new(params[:guide])
    @guide.user = current_user
    if @guide.save
      render :json => { "status" => "success",
                        "redirect" => "/guides/#{@guide.id}"}
    else
      render :json => { "status" => "failure",
                        "errors" => @guide.errors.full_messages}
    end
  end 

private
  
  def find_guide
    @guide = Guide.find(params[:id]) if params[:id]
  end
end
