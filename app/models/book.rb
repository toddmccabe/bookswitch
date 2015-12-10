class Book
  include MongoMapper::Document

  key :title,   String, :required => true
  key :author,  String, :required => true
  key :isbn,    String, :required => true
  key :price,   Float,  :required => true
  key :image,   String, :default => ''

  validates :user, :presence => true

  belongs_to :user
end