bookSwitchApp.controller('LayoutHeaderController', function($scope, $state, $stateParams) {
  $scope.searchQuery = $stateParams.query;

  // if $scope.searchQuery changes from user input, or as
  // a restult of ISBN barcode scan, go to book search results
  $scope.$watch('searchQuery', function(searchQuery) {
    if(searchQuery !== undefined)
      $scope.search();
  });

  $scope.search = function() {
    $state.go('book.search', {
      query: $scope.searchQuery,
      page: null
    });
  };
});
