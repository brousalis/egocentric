class Comment < ActiveRecord::Base
  opinio
  has_many :likes
  attr_accessible :likes
  after_create :add_activity

  def add_activity
    Activity.add(self.owner, Activity::POSTED_COMMENT, self)
  end
end
