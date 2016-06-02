angular.module('bookSwitchApp').factory('BrowserSupport', function() {
  return {
    detect: {
      // does the browser support getUserMedia?
      getUserMedia: function() {
        return typeof(navigator.getUserMedia ||
                      navigator.msGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.webkitGetUserMedia) != "undefined";
      }
    },

    // add classes to html element based on feature detection
    // example: <html class="get-user-media-supported"> or
    //          <html class="get-user-media-not-supported">
    addCssClasses: function() {
      var classes = [];

      for(var property in this.detect) {
        var className = this.featureToClass(property, this.detect[property]);
        classes.push(className);
      }

      $('html').addClass(classes.join(' '));
    },

    featureToClass: function(name, featureFunction) {
      var suffix = featureFunction() ? 'supported' : 'not-supported';
      var className = [name, suffix].join('-');
      // convert camel case to dashes
      className = className.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

      return className;
    }
  }
});
