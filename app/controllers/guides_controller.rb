class GuidesController < ApplicationController
  include Opinio::Controllers::Helpers

  before_filter :authorize, :except => [:index]
  before_filter :find_guide, :except => [:index]

  def index
    if params[:filter] == "date"
      @guides = Guide.all.sort_by { |g| g.created_at }.reverse
    else
      @guides = Guide.all.sort_by { |g| g.rate_average }.reverse
    end
  end 

  def new
    @guides = Guide.all
  end

  def create
    @guide = Guide.new(params[:guide])
    @guide.avatar = nil if @guide.avatar == "url of image"
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

  def rate
    @guide = Guide.find(params[:id])
    respond_to do |format|
      if @guide.rate(params[:stars], current_user, params[:dimension])
        format.js { render :partial => "rating" }
      else
        format.js { render :partial => "rating" }
      end
    end
  end

  def reload_comments
    @guide = Guide.find(params[:id])
    render "reload_comments", :layout => false
  end 

private
  
  def find_guide
    @guide = Guide.find(params[:id])
  end

end
