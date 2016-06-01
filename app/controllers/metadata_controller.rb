class MetadataController < ApplicationController
  # todo: rate limit API calls
  # todo: copy image to local and return new url
  def show
    @metadata = Metadata.new(metadata_params).find()

    render
  end

  private

  def metadata_params
    # todo: combine these with symbols in model
    params.permit(:isbn10, :ean, :isbn13, :upc)
  end
end
