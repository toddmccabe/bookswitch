bookSwitchApp.factory('BarcodeScanner', function($q, appConfig) {
  var preview;

  return {
    isRunning: false,

    scan: function(config) {
      var deferred = $q.defer(),
          _this = this;

      // save preview to variable
      preview = config.scanPreview;

      // initialize and start Quagga
      Quagga.init({
        inputStream : {
          name : appConfig.quagga.inputStream.name,
          type : appConfig.quagga.inputStream.type,
          target: config.scanPreview
        },
        decoder : {
          readers : appConfig.quagga.decoder.readers
        },
        locate: appConfig.quagga.locate
      }, function(error) {
        if(error) {
          alert(error);
          return;
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();
        _this.isRunning = true;
      });

      Quagga.onDetected(function(data) {
        _this.stop();
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
      // remove canvas/video elements as Quagga does not do this by default
      $(preview).empty();

      this.isRunning = false;
    }
  }
});
