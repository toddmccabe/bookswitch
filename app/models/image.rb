require 'open-uri'

class Image
  include MongoMapper::Document

  key :data, Binary, :required => true

  # only provide the id if image was saved to database
  def id
    super unless invalid?
  end

  private

  def initialize(url)
    begin
      self[:data] = open(url).read
      save
    rescue
      # not an issue if url is invalid
    end
  end
end
