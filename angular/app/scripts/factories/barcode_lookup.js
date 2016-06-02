bookSwitchApp.factory('BarcodeLookup', function($q, $http, appConfig) {
  return {
    search: function(barcodeNumber) {
      var deferred = $q.defer();

      // standardize barcode number for lookup endpoint
      barcodeNumber = (barcodeNumber || '').replace(/[^a-zA-Z0-9]/g, '');

      for(type in appConfig.barcodeTypes) {
        if(barcodeNumber.length === appConfig.barcodeTypes[type].length)
          $http.get('/api/metadata?' + type + '=' + barcodeNumber).then(deferred.resolve);
      }

      return deferred.promise;
    }
  }
});
