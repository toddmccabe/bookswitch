class User
  include MongoMapper::Document
  include ActiveModel::Validations

  key :email,     String
  key :password,  String, :required => true

  validates :email, :presence => true, :email => true

  many :books
end