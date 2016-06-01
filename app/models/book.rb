class Book
  include MongoMapper::Document

  key :title,   String, :required => true
  key :author,  String, :required => true
  key :isbn,    String, :required => true
  key :price,   Float,  :required => true
  key :image,   String, :default => ''

  validates :user, :presence => true

  belongs_to :user

  attr_accessible :title, :author, :isbn, :price

  before_validation :capitalize_fields!, :format_isbn!

  # capitalize the first letter of title and author
  # these should always be capitalized but it fixes
  # mongodb's inability to sort case-insensitive
  def capitalize_fields!
    [:title, :author].each do |param|
      if !self[param].blank?
        self[param][0] = self[param][0].capitalize
      end
    end
  end

  # todo: only allow numbers and a trailing 'X' in the ISBN
  def format_isbn!
    if !self.isbn.blank?
      self.isbn = self.isbn.gsub(/\D/, '')
    end
  end

  def username
    user.username
  end
end
