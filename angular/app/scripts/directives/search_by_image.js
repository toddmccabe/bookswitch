angular.module('bookSwitchApp').directive('searchByImage', function(
  BarcodeScanner,
  BrowserSupport
) {
  return {
    scope: {
      target: '='
    },
    templateUrl: 'views/directives/search_by_image.html',
    link: function($scope, $element) {
      var scanButton = $($element).find('a .search-by-image-icon');
      var fileInput = $($element).find('input[type=file]');
      var scanPreview = $($element).find('.search-by-image-preview')[0];
      var scanPreviewDistanceGuide = $(scanPreview).siblings('.search-by-image-preview-distance-guide');

      // open/close live camera capture for barcode scan
      var toggleSearchByImage = function() {
        // toggle logic
        if(BarcodeScanner.isRunning) {
          BarcodeScanner.stop();

          // if the second click was on a seperate implimentation
          // of this directive, close the first and open the second
          if(BarcodeScanner.scopeID == $scope.$id)
            return;
        }

        // initiate barcode detection
        var scan = BarcodeScanner.scanFromStream({
          scanButton: scanButton,
          scanPreview: scanPreview,
          scanPreviewDistanceGuide: scanPreviewDistanceGuide,
          scopeID: $scope.$id,
          inputStream: {
            target: scanPreview
          }
        });

        scan.then(scanSuccess);
      }

      // user has "uploaded" a picture of a barcode
      var searchByFile = function(event) {
        // return if the user opened dialog but didn't select anything
        if(event.target.files.length == 0) {
          return;
        }

        var fileUrl = URL.createObjectURL(event.target.files[0]);

        // initiate barcode detection
        var scan = BarcodeScanner.scanFromFile({src: fileUrl});

        scan.then(scanSuccess, scanFailure);
      }

      // barcode has been detected
      var scanSuccess = function(data) {
        $scope.target = data.codeResult.code;
      }

      // barcode wasn't detected
      var scanFailure = function() {
        alert('Unable to read barcode. Please enter the ISBN manually.');
      }

      var addEventHandlers = function() {
        // Livestream
        scanButton.on('click', toggleSearchByImage);

        // File upload
        fileInput.on('change', searchByFile);
      }

      // attach events
      addEventHandlers();
    }
  }
});
