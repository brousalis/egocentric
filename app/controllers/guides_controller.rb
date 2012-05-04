class GuidesController < ApplicationController
  include Opinio::Controllers::Helpers

  before_filter :authorize, :only => [:create, :update, :delete, :new, :rate]
  before_filter :find_guide, :except => [:index]

  def index
    if params[:filter] == "rating"
      @guides = Guide.all.sort_by { |g| g.rate_average(false, :rating) }.reverse
    else
      @guides = Guide.find(:all, :order => "created_at DESC")
    end

    @featured = Guide.where(:guide_type => "featured").limit(5)
  end 

  def welcome
    @featured = case
    when params[:welcome] == "egocentric"
      Guide.where(:guide_type => "approved").limit(5)
    when params[:welcome] == "top"
      Guide.first(5).sort_by { |g| g.rate_average(false, :rating)}.reverse
    else
      Guide.where(:guide_type => "featured").limit(5)
    end

    respond_to do |format|
      format.js
    end
  end

  def recent
    respond_to do |format|
      format.js  
    end
  end

  def destroy
    @guide.destroy
    redirect_to "/guides"
  end

  def update
    updates = params[:guide]
    updates['avatar'] = nil if updates['avatar'] == "url of image" || updates['avatar'] == ""
    updates['video'] = nil if updates['video'] == "url of youtube video" || updates['video'] == ""
    @guide.update_attributes(updates)
    Activity.add(current_user, Activity::EDITED_GUIDE, @guide)
    render :json => { "status" => "success",
                       "redirect" => guide_path(@guide)}
  end

  def create
    @guide = Guide.new(params[:guide])
    @guide.avatar = nil if @guide.avatar == "url of image" || @guide.avatar == ""
    @guide.video = nil if @guide.video == "url of youtube video" || @guide.video == ""
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

  def select
    @guide.guide_type = params[:select] ? params[:select] : nil
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
