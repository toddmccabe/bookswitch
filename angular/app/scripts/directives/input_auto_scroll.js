angular.module('bookSwitchApp').directive('input', function(
  appConfig
) {
  return {
    restrict: 'E',
    link: function($scope, $element) {
      // auto-scroll to either the input's label or the input
      var elementToScrollTo = $('label[for=' + $element.attr('id') + ']').firstOrUndefined() || $element;

      var scrollToElement = function() {
        $(elementToScrollTo).scrollToSmoothly();
      }

      var attachEvents = function() {
        $element.focus(scrollToElement);
        $element.keyup(scrollToElement);
      }

      // attach events
      attachEvents();
    }
  }
});
