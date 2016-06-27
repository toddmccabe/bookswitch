angular.module('bookSwitchApp').factory('ApplicationState', function() {
  var addListenerForCssClasses = function() {
    $(document).ready(addCssClassReady);
  }

  var addCssClassReady = function() {
    $('html').addClass('loaded');
  }

  return {
    addListenerForCssClasses: addListenerForCssClasses
  }
});
