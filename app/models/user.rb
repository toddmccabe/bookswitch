class User
  include MongoMapper::Document
  include ActiveModel::Validations

  key :email,     String,   :unique => true
  key :username,  String,   :required => true, :unique => true
  # todo: encrypt all passwords
  key :password,  String,   :required => true
  key :token,     String,   :unique => true
  # active used for indefinitely closing an account
  key :active,    Boolean,  :default => true
  # confirmed determines if the user has clicked the link sent to them after signing up
  key :confirmed, Boolean,  :default => false

  validates :email, :presence => true, :email => true

  many :books

  before_create :generate_token!

  def generate_token!
    begin
      self.token = Digest::SHA1.hexdigest([Time.now, rand].join)
    end while self.class.exists?(token: token)
  end
end
