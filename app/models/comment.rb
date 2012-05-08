class Comment < ActiveRecord::Base
  opinio
  has_many :likes
  attr_accessible :likes
  after_create :add_activity
  before_destroy :remove_activity

  def add_activity
    type = self.commentable.type == Guide ? Activity::POSTED_COMMENT : Activity::REPLIED_COMMENT
    Activity.add(self.owner, type, self)
  end

  def remove_activity
    Activity.find_by_target_id(self.id).delete
  end
end
