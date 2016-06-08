class MetadataController < ApplicationController
  def show
    @metadata = Metadata.new(metadata_params).find()

    if @metadata
      render
    end
  end

  private

  def metadata_params
    params.permit(:isbn10, :ean, :isbn13, :upc)
  end
end
