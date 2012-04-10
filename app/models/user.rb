class User < ActiveRecord::Base
  attr_accessible :username, :email, :password, :password_confirmation, :avatar
  
  attr_accessor :password
  before_save :encrypt_password
  
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email
  validates_presence_of :username, :on => :create
  validates_uniqueness_of :email
  validates_uniqueness_of :username

  has_many :guides
  has_many :comments
  has_many :likes

  ajaxful_rater

   def already_likes?(comment)
    self.likes.find(:all, :conditions => ['comment_id= ?', comment.id]).size > 0
  end
 
  def authenticate(username, password)
    user = User.find_by_username(username)
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end
  
  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end
end
