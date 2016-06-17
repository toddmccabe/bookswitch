angular.module('bookSwitchApp').factory('BarcodeScanner', function(
  $q,
  BrowserSupport,
  appConfig
) {
  var preview;
  var previewDistanceGuide;

  return {
    isRunning: false,
    scopeID: null,
    config: {},

    // returns QuaggaJS config object based on browser support
    getConfig: function() {
      var inputStream = BrowserSupport.detect.getUserMedia() ?
                        appConfig.quagga.inputStream.getUserMediaSupported :
                        appConfig.quagga.inputStream.getUserMediaNotSupported;

      return {
        inputStream: inputStream,
        decoder: {
          readers: appConfig.quagga.decoder.readers
        },
        locate: appConfig.quagga.locate
      }
    },

    // search for a barcode from camera stream
    scanFromStream: function(config) {
      var deferred = $q.defer(),
          _this = this;

      preview = config.scanPreview;
      previewDistanceGuide = config.scanPreviewDistanceGuide;
      mask = config.mask;
      _this.scopeID = config.scopeID;

      // merge parameters into config
      config = angular.merge(config, this.getConfig());

      // initialize and start Quagga
      Quagga.init(config, function(error) {
        if(error) {
          alert('Unable to access your camera. Please enter the ISBN manually.');
          console.log(error);
          return;
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();
        _this.isRunning = true;

        // resize distance guide to match camera preview
        previewDistanceGuide.height($(preview).find('canvas').height());
        previewDistanceGuide.width($(preview).find('canvas').width());

        // display distance guide
        previewDistanceGuide.show();
      });

      Quagga.onDetected(function(data) {
        _this.stop();

        // remove leading 0 to fix UPC format
        data.codeResult.code = data.codeResult.code.replace(/^0/, '');

        deferred.resolve(data);
      });

      // draw detection box(es) on camera stream
      Quagga.onProcessed(function(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result && result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(function (box) {
            return box !== result.box;
          }).forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "red", lineWidth: 2});
          });
        }
      });

      return deferred.promise;
    },

    stop: function() {
      Quagga.stop();

      // hide distance guide
      previewDistanceGuide.hide();

      // remove canvas/video elements as Quagga does not do this by default
      $(preview).empty();

      // hide background click mask
      mask.hide();

      this.isRunning = false;
    },

    // search for a barcode from file upload select
    scanFromFile: function(config) {
      var deferred = $q.defer();

      config = angular.merge(config, this.getConfig());

      Quagga.decodeSingle(config, function(data) {
        if(data) {
          deferred.resolve(data);
        } else {
          deferred.reject();
        }
      });

      return deferred.promise;
    }
  }
});
