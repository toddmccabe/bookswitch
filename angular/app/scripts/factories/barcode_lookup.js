bookSwitchApp.factory('BarcodeLookup', function($q, $http, appConfig) {
  return {
    search: function(barcodeNumber) {
      var deferred = $q.defer();

      barcodeNumber = (barcodeNumber || '').replace(/[^\w]/g, '');

      for(type in appConfig.barcodeTypes) {
        if(barcodeNumber.length === appConfig.barcodeTypes[type].length)
          $http.get('/api/metadata?' + type + '=' + barcodeNumber).then(deferred.resolve);
      }

      return deferred.promise;
    }
  }
});
