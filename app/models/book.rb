class Book
  include MongoMapper::Document

  belongs_to :user

  key :title,   String, :required => true
  key :author,  String, :required => true
  key :price,   Float,  :required => true
  key :image,   String
  key :isbn10,  String
  key :isbn13,  String
  key :upc,     String

  attr_accessible :title,
                  :author,
                  :price,
                  :image,
                  :isbn10,
                  :isbn13,
                  :upc

  before_save :capitalize_fields!,
              :standardize_product_ids!

  validates :user, :presence => true

  timestamps!

  def username
    user.username
  end

  # capitalize the first letter of title and author
  # these should always be capitalized but it fixes
  # mongodb's inability to sort case-insensitive
  def capitalize_fields!
    [:title, :author].each do |param|
      self[param][0] = self[param][0].capitalize
    end
  end

  # standardize to optimize searches
  # only alphanumeric values allowed
  def standardize_product_ids!
    [:isbn10, :isbn13, :upc].each do |product_id_format|
      standardize_product_id!(product_id_format)
    end
  end

  def standardize_product_id!(product_id_format)
    if self[product_id_format]
      self[product_id_format].gsub!(/[^a-zA-Z0-9]/, '')
    end
  end
end
