angular.module('bookSwitchApp').directive('bookList', function(
  $state,
  $stateParams,
  Book,
  appConfig
) {
  return {
    scope: true,
    templateUrl: 'views/directives/book/list.html',
    link: function($scope) {
      // p is short for $scope.params
      $scope.p = {};

      // copy url parameters to $scope.p
      ['query', 'page', 'sort', 'direction', 'username'].forEach(function(property) {
        $scope.p[property] = $stateParams[property];
      });

      Book.query($scope.p, function(response) {
        $scope.books = response.books;
        $scope.bookCount = response.total_count;
        $scope.totalPages = Math.ceil($scope.bookCount / appConfig.resultsPerPage);
      });

      $scope.$watch('p', function() {
        $state.go($state.current.name, $scope.p);
      }, true);

      // assure the page number requested is within range
      $scope.setPage = function(pageNumber) {
        if(pageNumber > 0 && pageNumber <= $scope.totalPages)
          $scope.p.page = pageNumber;
      }

      // increment/decrement page number
      $scope.changePage = function(modifier) {
        var page = parseInt($scope.p.page) || 1;
        $scope.setPage(page + modifier);
      }
    }
  }
});
