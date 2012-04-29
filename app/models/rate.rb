class Rate < ActiveRecord::Base
  belongs_to :rater, :class_name => "User"
  belongs_to :rateable, :polymorphic => true
  validates_numericality_of :stars, :minimum => 1
  
  attr_accessible :rate, :dimension
  after_create :add_activity

  def add_activity
    Activity.add(self.rater, Activity::RATED_GUIDE, self)
  end 
end
