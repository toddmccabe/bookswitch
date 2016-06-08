angular.module('bookSwitchApp').directive('error', function(
  Error
) {
  return {
    scope: {
      errors: '='
    },
    templateUrl: 'views/directives/error.html',
    controller: function($scope) {
      $scope.$watch('errors', function(errors) {
        $scope.parsedErrors = Error.parse($scope.errors);
      });
    }
  }
});
