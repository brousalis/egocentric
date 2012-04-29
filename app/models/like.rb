class Like < ActiveRecord::Base
  belongs_to :comment
  belongs_to :user
  attr_accessible :user, :comment
  after_create :add_activity

  def add_activity
    Activity.add(self.user, Activity::LIKED_COMMENT, self)
  end 
end
