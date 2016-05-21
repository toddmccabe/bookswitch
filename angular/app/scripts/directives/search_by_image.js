bookSwitchApp.directive('searchByImage', function(BarcodeScanner) {
  return {
    scope: {
      target: '='
    },
    templateUrl: 'views/directives/search_by_image.html',
    link: function($scope, $element) {
      var scanButton = $($element).find('.search-by-image-icon');

      scanButton.on('click', function() {
        // if they click the button a second time, close the barcode scan
        if(BarcodeScanner.isRunning) {
          BarcodeScanner.stop();

          // if the second click was on a seperate implimentation
          // of this directive, close the first and open the second
          if(BarcodeScanner.scopeID == $scope.$id)
            return;
        }

        var scan = BarcodeScanner.scan({
          scanButton: scanButton,
          scanPreview: $($element).find('.search-by-image-preview')[0],
          scopeID: $scope.$id
        });

        scan.then(function(data) {
          $scope.target = data.codeResult.code;
        });
      });
    }
  }
});
