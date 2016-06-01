class MetadataController < ApplicationController
  def show
    @metadata = Metadata.new(metadata_params).find()

    render
  end

  private

  def metadata_params
    params.permit(:isbn, :ean, :upc)
  end
end
