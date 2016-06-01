class Metadata
  include ActiveModel::Model
  attr_accessor :lookup_format, :lookup_value

  def initialize(attributes = {})
    # search params for ISBN, EAN, or UPC
    # set format and value to match
    [:isbn, :ean, :upc].each do |format|
      if attributes[format]
        self.lookup_format = format.upcase
        self.lookup_value = attributes[format]
      end
    end
  end

  def find
    response = request.item_lookup(
      query: {
        'SearchIndex' => 'Books',
        'IdType' => lookup_format,
        'ItemId' => lookup_value,
        # request book metadata as well as cover images
        'ResponseGroup' => 'ItemAttributes, Images'
      }
    ).parse

    # convert API hash to OpenStructure for RABL
    Utilities.hashes2ostruct(response)
  end

  private

  def request
    request = Vacuum.new('US', secure: true)
    request.associate_tag = ENV['AWS_ASSOCIATE_TAG']

    request
  end
end
