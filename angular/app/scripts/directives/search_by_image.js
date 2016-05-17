bookSwitchApp.directive('searchByImage', function(BarcodeScanner) {
  return {
    scope: {
      target: '='
    },
    templateUrl: 'views/directives/search_by_image.html',
    link: function(scope, element) {
      var scanButton = $(element).find('.search-by-image-icon');

      scanButton.on('click', function() {
        if(BarcodeScanner.isRunning) {
          BarcodeScanner.stop();
          return;
        }

        var scan = BarcodeScanner.scan({
          scanButton: scanButton,
          scanPreview: $(element).find('.search-by-image-preview')[0]
        });

        scan.then(function(data) {
          scope.target = data.codeResult.code;
        });
      });
    }
  }
});
