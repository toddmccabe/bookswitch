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
      // mask is used to allow the user to click away from the webcam window to close it
      var mask = $('#mask');

      // open/close live camera capture for barcode scan
      var toggleSearchByImage = function() {
        // if preview was open and we aren't
        // attempting to open another instance
        if(closeSearchByImage()) {
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
          },
          mask: mask
        });

        mask.show();

        scan.then(scanSuccess);
      }

      var closeSearchByImage = function() {
        if(BarcodeScanner.isRunning) {
          BarcodeScanner.stop();

          // hide background click mask
          mask.hide();

          // return true if the user closed the current BarcodeScanner instance
          // return false if we're closing a BarcodeScanner to open another
          return BarcodeScanner.scopeID == $scope.$id ? true : false;
        }
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
        // livestream
        scanButton.click(toggleSearchByImage);

        // file upload
        fileInput.change(searchByFile);

        // close preview by clicking anywhere
        mask.click(closeSearchByImage);
      }

      // attach events
      addEventHandlers();
    }
  }
});
