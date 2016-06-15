angular.module('bookSwitchApp').constant('appConfig', {
  // keep me logged in will last this many days
  cookieExpirationInDays: 14,

  // number of results per page
  resultsPerPage: 10,

  // how many seconds to wait before polling resources
  polling: {
    userNotifications: 15
  },

  // Quagga barcode capture config
  quagga: {
    inputStream: {
      // most browsers, including android
      getUserMediaSupported: {
        name: 'Live',
        type: 'LiveStream'
      },

      // iOS
      getUserMediaNotSupported: {
        size: 800
      }
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
    isbn13: {
      length: 13
    },
    upc: {
      length: 12
    }
  }
});
