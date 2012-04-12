class Guide < ActiveRecord::Base
  belongs_to :user
  has_many :comments, :dependent => :destroy

  validates_presence_of :user 
  validates_presence_of :body
  validates_presence_of :name
  validates_presence_of :category
  validates_uniqueness_of :name

  attr_accessible :name, :body, :category, :user, :avatar, :video

  ajaxful_rateable :stars => 5, :dimensions => [:rating]
  opinio_subjectum

  def all_comments
    self.comments.collect { |c| [c] + c.comments }.flatten
  end

  def more_from_category
    Guide.find_all_by_category(self.category, :limit => 3, :conditions => ["id != ?", self.id])
  end

  def self.all_categories
    Guide.select(:category).group(:category).collect { |g| g.category }
  end
end
