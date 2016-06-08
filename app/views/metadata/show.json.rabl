object @metadata.ItemLookupResponse.Items

code :book do |response|
  if response.Item
    # Amazon returns an object for single matches, and an array for multiple
    book = response.Item.is_a?(Array) ?
           response.Item.first :
           response.Item

    {
      :title => book.ItemAttributes.Title,
      :author => [book.ItemAttributes.Author].join(', '),
      :image => Image.new(book.LargeImage.URL).id,
      :isbn10 => book.ItemAttributes.ISBN,
      :isbn13 => StdNum::ISBN.convert_to_13(book.ItemAttributes.ISBN),
      :upc => book.ItemAttributes.UPC,
      :amazon => {
        :link => book.DetailPageURL,
        :price => {
          :new => book.OfferSummary.LowestNewPrice.FormattedPrice,
          :used => book.OfferSummary.LowestUsedPrice.FormattedPrice
        }
      }
    }
  end
end
