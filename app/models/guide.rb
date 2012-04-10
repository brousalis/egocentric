class Guide < ActiveRecord::Base
  belongs_to :user
  has_many :comments, :dependent => :destroy

  validates_presence_of :user 
  validates_presence_of :body
  validates_presence_of :name
  validates_presence_of :category

  attr_accessible :name, :body, :category, :user, :avatar, :video

  ajaxful_rateable :stars => 5, :dimensions => [:rating]
  opinio_subjectum
end
