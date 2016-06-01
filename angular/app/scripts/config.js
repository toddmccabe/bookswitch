angular.module('bookSwitchApp').constant('appConfig', {
  // keep me logged in will last this many days
  cookieExpirationInDays: 14,

  // number of results per page
  resultsPerPage: 10,

  // Quagga barcode capture config
  quagga: {
    inputStream: {
      name: 'Live',
      type: 'LiveStream'
    },
    decoder: {
      readers: [
        'ean_reader',
        'upc_reader'
      ]
    },
    locate: true
  },

  barcodeTypes: {
    isbn10: {
      length: 10
    },
    upc: {
      length: 12
    },
    isbn13: {
      length: 13
    },
    ean: {
      length: 13
    }
  }
});
