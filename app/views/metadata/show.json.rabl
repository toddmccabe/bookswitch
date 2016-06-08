object @metadata.ItemLookupResponse.Items

code :book do |response|
  if response.Item
    # Amazon returns an object for single matches, and an array for multiple
    book = response.Item.is_a?(Array) ?
           response.Item.first :
           response.Item

    if lowest_new_price = book.OfferSummary.LowestNewPrice
      price_new = lowest_new_price.FormattedPrice
    end

    if lowest_used_price = book.OfferSummary.LowestUsedPrice
      price_used = lowest_used_price.FormattedPrice
    end

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
          :new => price_new,
          :used => price_used
        }
      }
    }
  end
end
