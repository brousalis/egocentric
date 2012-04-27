class GuidesController < ApplicationController
  include Opinio::Controllers::Helpers

  before_filter :authorize, :only => [:create, :update, :delete, :new, :rate]
  before_filter :find_guide, :except => [:index]
  before_filter :back

  def index
    if params[:filter] == "rating"
      @guides = Guide.all.sort_by { |g| g.rate_average(false, :rating) }.reverse
    else
      @guides = Guide.all.sort_by { |g| g.created_at }.reverse
    end
  end 

  def new
    @guides = Guide.all
  end

  def delete
    @guide.destroy
    render :json => { "status" => "success",
                      "redirect" => "/guides"}
  end

  def update
    @guide.avatar = nil if @guide.avatar == "url of image" || @guide.avatar == ""
    @guide.video = nil if @guide.video == "url of youtube video" || @guide.video = "" 
    @guide.update_attributes(params[:guide])
    render :json => { "status" => "success",
                       "redirect" => guide_path(@guide)}
  end

  def create
    @guide = Guide.new(params[:guide])
    @guide.avatar = nil if @guide.avatar == "url of image" || @guide.avatar == ""
    @guide.video = nil if @guide.video == "url of youtube video" || @guide.video = ""
    @guide.user = current_user
    if @guide.save
      render :json => { "status" => "success",
                        "redirect" => "/guides/#{@guide.id}"}
    else
      render :json => { "status" => "failure",
                        "errors" => @guide.errors.full_messages}
    end
  end 

  def like
    @comment = Comment.find(params[:comment_id]) if params[:comment_id]
    if current_user.already_likes?(@comment)
      @like = @comment.likes.find_by_user_id(current_user.id)
      @like.destroy
      render :json => { "status" => "failure", "count" => @comment.likes.count }
    else
      @like = Like.create(:comment => @comment, :user => current_user)
      if @like
        render :json => { "status" => "success", "count" => @comment.likes.count }
      else
        render :json => { "status" => "failure" }
      end
    end
  end

  def approve
    @guide.guide_type = "approved"
    @guide.save
    redirect_to "/guides"
  end

  def feature
    @guide.guide_type = "featured"
    @guide.save
    redirect_to "/guides"
  end

  def no_type
    @guide.guide_type = nil
    @guide.save
    redirect_to "/guides"
  end

  def rate
    @guide = Guide.find(params[:id])
    @guide.rate(params[:stars], current_user, params[:dimension])
    respond_to do |format|
      format.js 
    end
  end

  def reload_comments
    @guide = Guide.find(params[:id])
    render "reload_comments", :layout => false
  end 

private
  
  def find_guide
    @guide = Guide.find(params[:id]) if params[:id]
  end

end
