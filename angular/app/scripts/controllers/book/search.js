bookSwitchApp.controller('BookSearchController', function($scope, $state, $stateParams, Book) {
  $scope.query = $stateParams.query;
  $scope.page = $stateParams.page || 1;
  $scope.sort = $stateParams.sort;

  Book.query({
    query: $scope.query,
    page: $scope.page,
    sort: $scope.sort
  }, function(response) {
    $scope.books = response.books;
    $scope.totalCount = response.total_count;
  });

  $scope.$watchGroup(['query', 'page', 'sort'], function(newValues, oldValues) {
    for(var i = 0; i < newValues.length; i++) {
      if(newValues[i] !== oldValues[i]) {
        $state.go('book.search', {
          query: $scope.query,
          page: $scope.page,
          sort: $scope.sort
        });
      }
    }
  });
});
