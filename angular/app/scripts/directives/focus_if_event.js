angular.module('bookSwitchApp').directive('focusIfEvent', function() {
  return {
    scope: {
      event: '@focusIfEvent'
    },
    link: function($scope, $element) {
      $scope.$on($scope.event, function() {
        $element.focus();
      });
    }
  }
});
