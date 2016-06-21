angular.module('bookSwitchApp').factory('BarcodeLookup', function(
  $q,
  $http,
  appConfig
) {
  return {
    search: function(barcodeNumber) {
      var deferred = $q.defer(),
          possibleMatch = false;

      // standardize barcode number for lookup endpoint
      barcodeNumber = (barcodeNumber || '').replace(/[^a-zA-Z0-9]/g, '');

      for(type in appConfig.barcodeTypes) {
        if(barcodeNumber.length === appConfig.barcodeTypes[type].length) {
          possibleMatch = true;

          var request = $http.get('/api/metadata?' + type + '=' + barcodeNumber);

          request.then(deferred.resolve, deferred.reject);
        }
      }

      // if the provided number doesn't match any
      // supported barcode formats, reject promise
      if(!possibleMatch)
        deferred.reject();

      return deferred.promise;
    }
  }
});
