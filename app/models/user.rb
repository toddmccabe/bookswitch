class User
  include MongoMapper::Document
  include ActiveModel::Validations

  key :email,     String, :unique => true
  key :username,  String, :required => true, :unique => true
  key :password,  String, :required => true
  key :token,     String, :required => true, :unique => true

  validates :email, :presence => true, :email => true

  many :books

  before_validation :generate_token!

  protected

  def generate_token!
    begin
      self.token = Digest::SHA1.hexdigest([Time.now, rand].join)
    end while self.class.exists?(token: token)
  end
end