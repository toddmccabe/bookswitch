angular.module('bookSwitchApp').directive('sortLink', function() {
  return {
    scope: {
      label: '@',
      property: '@',
      sort: '=',
      page: '=',
      direction: '='
    },
    templateUrl: 'views/directives/sort_link.html',
    controller: function($scope) {
      $scope.updateSort = function() {
        // if sort hasn't changed, reverse sort direction
        if($scope.sort == $scope.property) {
          $scope.direction = $scope.direction == undefined ? 'desc' : null;
        } else {
          // set direction to default if sort has changed
          $scope.direction = null;
        }

        $scope.sort = $scope.property;

        // always set the page number to default (1) when doing a new sort
        $scope.page = null;
      }
    }
  }
});
