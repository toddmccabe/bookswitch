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
      # disable image data until it can be saved and referenced locally
      # :image => book.LargeImage.URL,
      :isbn10 => book.ItemAttributes.ISBN,
      :isbn13 => StdNum::ISBN.convert_to_13(book.ItemAttributes.ISBN),
      :upc => book.ItemAttributes.UPC,
      :link => book.DetailPageURL
    }
  end
end
