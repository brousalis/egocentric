class Guide < ActiveRecord::Base
  belongs_to :user
  has_many :comments, :dependent => :destroy

  validates_presence_of :user 
  validates_presence_of :name
  validates_presence_of :category
  validates_uniqueness_of :name

  attr_accessible :name, :body, :category, :user, :avatar, :video, :guide_type

  ajaxful_rateable :stars => 5, :dimensions => [:rating]
  opinio_subjectum

  after_create :add_activity

  def is_egocentric?
    true if self.user.role == "egocentric"
  end

  def is_featured?
    true if self.guide_type == "featured"
  end

  def add_activity
    Activity.add(self.user, Activity::POSTED_GUIDE, self)
  end  

  def all_comments
    self.comments.collect { |c| [c] + c.comments }.flatten
  end

  def more_from_category
    Guide.find_all_by_category(self.category, :limit => 4, :conditions => ["id != ?", self.id])
  end

  def self.all_categories
    Guide.select(:category).group(:category).collect { |g| g.category }
  end
end
