class User
  include MongoMapper::Document
  include ActiveModel::Validations

  key :email,     String,   :unique => true
  key :username,  String,   :required => true, :unique => true
  key :password,  String,   :required => true
  key :token,     String,   :unique => true
  # active determines if the user account is deactivated
  key :active,    Boolean,  :default => true
  # confirmed determines if the user has clicked the link sent to them after signing up
  key :confirmed, Boolean,  :default => false

  validates :email, :presence => true, :email => true

  many :books

  before_create :generate_token!

  protected

  def generate_token!
    begin
      self.token = Digest::SHA1.hexdigest([Time.now, rand].join)
    end while self.class.exists?(token: token)
  end
end
