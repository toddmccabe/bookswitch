class User
  include MongoMapper::Document
  include ActiveModel::Validations

  key :email,             String
  key :username,          String,   :required => true
  key :password,          String,   :required => true
  key :token,             String,   :unique => true
  # active used for indefinitely closing an account
  key :active,            Boolean,  :default => true
  # confirmed determines if the user has clicked the link sent to them after signing up
  key :confirmed,         Boolean,  :default => false
  key :message_ids,       Array
  key :conversation_ids,  Array
  key :salt,              String

  validates :email, :presence => true, :email => true
  validates_uniqueness_of :email, :case_sensitive => false
  validates_uniqueness_of :username, :case_sensitive => false

  many :books
  many :messages, :in => :message_ids
  many :conversations, :in => :conversation_ids

  attr_accessible :email, :username, :password, :active

  before_create :encrypt_password!, :generate_token!

  # automatically activate/deactivate user's books
  def active=(value)
    value == true ? books.each(&:activate!) : books.each(&:deactivate!)
    super
  end

  def self.find_from_token(params)
    User.find_by_username_and_token(params[:username], params[:token])
  end

  def self.find_from_any_case_username(username)
    User.where(:username => { :$regex => /^#{username}$/i }).first
  end

  def encrypt_password!
    self.salt = SecureRandom.base64(8)
    self.password = Digest::SHA2.hexdigest(self.salt + self.password)
  end

  def generate_token!
    begin
      self.token = Digest::SHA1.hexdigest([Time.now, rand].join)
    end while self.class.exists?(token: token)
  end
end
