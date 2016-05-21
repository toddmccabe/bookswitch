bookSwitchApp.controller('BookSearchController', function($scope, $state, $stateParams, Book) {
  $scope.query = $stateParams.query;
  $scope.page = $stateParams.page;
  $scope.sort = $stateParams.sort;
  $scope.direction = $stateParams.direction;

  Book.query({
    query: $scope.query,
    page: $scope.page,
    sort: $scope.sort,
    direction: $scope.direction
  }, function(response) {
    $scope.books = response.books;
    $scope.totalCount = response.total_count;
  });

  $scope.$watchGroup(['query', 'page', 'sort', 'direction'], function() {
    $state.go('book.search', {
      query: $scope.query,
      page: $scope.page,
      sort: $scope.sort,
      direction: $scope.direction
    });
  });
});
