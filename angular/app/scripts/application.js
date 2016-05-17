var bookSwitchApp = angular.module('bookSwitchApp', [
  'ui.router',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch'
])
.constant('appConfig', {
  // keep me logged in will last this many days
  cookieExpirationInDays: 14,

  // Quagga barcode capture config
  quagga: {
    inputStream: {
      name: 'Live',
      type: 'LiveStream'
    },
    decoder: {
      readers: ['ean_reader']
    },
    locate: true
  }
});
