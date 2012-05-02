class Like < ActiveRecord::Base
  belongs_to :comment
  belongs_to :user

  attr_accessible :user, :comment

  after_create :add_activity
  before_destroy :remove_activity

  def add_activity
    Activity.add(self.user, Activity::LIKED_COMMENT, self)
  end 

  def remove_activity
    Activity.find_by_target_id(self.id).delete
  end 
end
