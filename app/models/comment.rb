class Comment < ActiveRecord::Base
  opinio
  has_many :likes
  attr_accessible :likes
end
