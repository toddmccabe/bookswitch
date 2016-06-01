object @metadata.ItemLookupResponse.Items

code :data do |response|
  if response.Item
    # Amazon returns an object for single matches, and an array for multiple
    book = response.Item.is_a?(Array) ? response.Item.first : response.Item

    {
      :title => book.ItemAttributes.Title,
      :author => [book.ItemAttributes.Author].join(', '),
      # todo: Amazon is returning ISBN10 and no ISBN13
      # return ISBN13 as well if it was provided
      :isbn => book.ItemAttributes.ISBN,
      :ean => book.ItemAttributes.EAN,
      :upc => book.ItemAttributes.UPC,
      :link => book.DetailPageURL,
      :image => book.LargeImage.URL
    }
  end
end
