// allow ng-repeat to iterate by number
Number.prototype.toArray = Number.prototype.toArray || function() {
  var value = this.valueOf();
  return new Array(isNaN(value) ? 0 : value);
}

// add array splice helper
Array.prototype.remove = Array.prototype.remove || function(element) {
  var index = this.indexOf(element);

  if(index > -1) {
    this.splice(index, 1);
  }

  return this;
}

// shorthand for returning jQuery's first match or undefined
// http://stackoverflow.com/questions/920236/how-can-i-detect-if-a-selector-returns-null
$.fn.firstOrUndefined = function () {
  return (this.length !== 0) ? this.first() : undefined;
}

// smooth scroll animation
angular.module('bookSwitchApp').run(function(
  BrowserSupport,
  appConfig
) {
  var duration = appConfig.ui.scroll.auto.duration[BrowserSupport.detect.iOS() ? 'iOS' : 'default'];

  $.fn.scrollToSmoothly = function() {
    $('html, body').animate({
      scrollTop: this.offset().top - appConfig.ui.scroll.auto.padding.top
    }, duration);
  }
});
