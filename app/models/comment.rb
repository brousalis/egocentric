class Comment < ActiveRecord::Base
  belongs_to :guide
  belongs_to :user
  has_many :likes

  validates_presence_of :body
  validates_presence_of :user

  attr_accessible :body, :guide, :user

  def like(user)
    self.likes.create(:user => user) unless self.likes.find_by_user_id(user.id)
  end
end
