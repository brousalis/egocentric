class Like < ActiveRecord::Base
  belongs_to :comment
  belongs_to :user
  attr_accessible :user, :comment
end
