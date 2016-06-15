angular.module('bookSwitchApp').controller('LayoutHeaderController', function(
  $scope,
  $state,
  $stateParams,
  SiteData
) {
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

  // automatically update scope username from SiteData factory
  $scope.$watch(function() {
    return SiteData.get('username');
  },
  function(value) {
    // automatically update $scope.username
    $scope.username = value;
  });
});
