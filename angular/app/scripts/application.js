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

  // number of results per page
  resultsPerPage: 10,

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

// allow ng-repeat to iterate by number
Number.prototype.toArray = Number.prototype.toArray || function() {
  var value = this.valueOf();
  return new Array(isNaN(value) ? 0 : value);
}

// add array splice helper
Array.prototype.remove = Array.prototype.remove || function(element) {
  var index = this.indexOf(element);

  if(index > -1) {
    this.splice(index, 1);
  }

  return this;
}