class Metadata
  include ActiveModel::Model

  attr_accessor :lookup_format,
                :lookup_value

  def initialize(attributes = {})
    # search params for ISBN, EAN, or UPC
    # set format and value to match
    [:isbn10, :upc, :isbn13, :ean].each do |format|
      if attributes[format]
        self.lookup_value = attributes[format]

        # merge isbn10/13 for API standard
        format = :isbn if [:isbn10, :isbn13].include?(format)

        self.lookup_format = format.upcase
      end
    end
  end

  def find
    begin
      response = request.item_lookup(
        query: {
          'SearchIndex' => 'Books',
          'IdType' => lookup_format,
          'ItemId' => lookup_value,
          # request book metadata as well as cover images
          'ResponseGroup' => 'ItemAttributes, Images'
        }
      ).parse
    rescue Excon::Errors::BadRequest => e
      Rails.logger.debug e.response.body
    end

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
