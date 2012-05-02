class Activity < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  belongs_to :user
  belongs_to :target, :polymorphic => true
  
  default_scope :order => 'activities.created_at DESC', :limit => 10
  
  POSTED_GUIDE= 1 
  RATED_GUIDE = 2
  POSTED_COMMENT = 3
  LIKED_COMMENT = 4
  EDITED_GUIDE = 5

  def to_words
    target = self.target
    action = case
    when self.activity_type == Activity::POSTED_GUIDE
      shorten(target)
    when self.activity_type == Activity::RATED_GUIDE
      shorten_rating(target)
    when self.activity_type == Activity::POSTED_COMMENT
      "posted a <a href='#{Rails.application.routes.url_helpers.guide_path(target.commentable)}'>comment</a>"
    when self.activity_type == Activity::LIKED_COMMENT
      "liked a <a href='#{Rails.application.routes.url_helpers.guide_path(target.comment.commentable)}'>comment</a>"
    when self.activity_type == Activity::EDITED_GUIDE
      shorten(target, "edited")
    end
    "<span class='username'>#{self.user.username}</span> <span class='action'>#{action}</span> <a class='time' href='#' rel='tooltip' title='#{time_ago_in_words(self.created_at).sub("minutes","mins")} ago'><i class='icon icon-white icon-time'></i></a>"
  end
  
  def self.add(user, activity_type, target, created_at = nil)
    return false if user.blank? or activity_type.blank? or target.blank?
    activity = Activity.new(:user => user, :activity_type => activity_type, :target => target)
    activity.created_at = created_at if created_at
    activity.save!
  end

private

  def shorten_rating(target)
    guide = Rails.application.routes.url_helpers.guide_path(target.rateable) 
    name = target.rateable.name
    text = "rated <a href='#{guide}'>#{name}</a> a #{target.stars}"
    if text.length >= 46
      if target.rater.username.length > 12
        name = truncate(name, 16) 
      else
        name = truncate(name, 23)
      end
      if target.rater.username.length >= 14
        name = truncate(name, 12)
      end
    end
    "rated <a href='#{guide}'>#{name}</a>"
  end  

  def shorten(text, action = "added")
    guide = Rails.application.routes.url_helpers.guide_path(target) 
    name = target.name
    action = "added" unless action == "edited"
    text = "#{action} <a href='#{guide}'>#{name}</a>"
    if text.length >= 28
      if target.user.username.length > 12
        name = truncate(name, 16) 
      else
        name = truncate(name, 22)
      end
    end 
    "#{action} <a href='#{guide}'>#{name}</a>"
  end

  def truncate(string, length = 10)
    string.size > length ? string[0,length] + "&hellip;" : string
  end  
end
