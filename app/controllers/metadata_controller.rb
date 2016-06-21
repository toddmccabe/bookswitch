class MetadataController < ApplicationController
  def show
    @metadata = Metadata.new(metadata_params).find()

    if @metadata.ItemLookupResponse.Items.Item
      render
    else
      head 418
    end
  end

  private

  def metadata_params
    params.permit(:isbn10, :ean, :isbn13, :upc)
  end
end
