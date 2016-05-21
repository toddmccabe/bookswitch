bookSwitchApp.directive('bookList', function(appConfig) {
  return {
    scope: {
      books: '=',
      totalCount: '=',
      page: '=',
      sort: '='
    },
    templateUrl: 'views/directives/book/list.html',
    link: function($scope) {
      $scope.totalPages = 0;

      // watch $scope.books as it's initially undefined
      $scope.$watch('books', function(books = []) {
        $scope.totalPages = Math.ceil($scope.totalCount / appConfig.resultsPerPage);
      });

      // assure the page number requested is within range
      $scope.setPage = function(newPage) {
        if(newPage > 0 && newPage <= $scope.totalPages)
          $scope.page = newPage;
      }
    }
  }
});
