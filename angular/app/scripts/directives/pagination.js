angular.module('bookSwitchApp').directive('pagination', function(
  appConfig
) {
  return {
    scope: {
      results: '=',
      resultsTotalCount: '=',
      page: '='
    },
    templateUrl: 'views/directives/pagination.html',
    link: function($scope, $element) {
      $scope.totalPages = 0;

      var initialize = function() {
        $scope.totalPages = Math.ceil($scope.resultsTotalCount / appConfig.resultsPerPage);
      }

      $scope.changePage = function(delta) {
        var page = parseInt($scope.page) || 1;

        page += delta;

        if(page < 1 || page > $scope.totalPages)
          return;

        $scope.page = page;
      }

      $scope.$watch('results', initialize);
    }
  }
});
