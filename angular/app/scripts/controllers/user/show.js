bookSwitchApp.controller('UserShowController', function($scope, $state, $stateParams, User, Book, SiteData) {
  $scope.username = $stateParams.id;
  $scope.updated = $stateParams.updated;
  $scope.page = $stateParams.page;
  $scope.sort = $stateParams.sort;
  $scope.direction = $stateParams.direction;

  User.get({id: $scope.username}, function(user) {
    $scope.user = user;
    $scope.isUser = $scope.user.username === SiteData.get('username');
  }, function() {
    // otherwise show error
    $scope.errors = 'That user could not be found.';
  });

  Book.query({
    username: $scope.username,
    page: $scope.page,
    sort: $scope.sort,
    direction: $scope.direction
  }, function(response) {
    $scope.books = response.books;
    $scope.totalCount = response.total_count;
  });

  $scope.$watchGroup(['page', 'sort', 'direction'], function() {
    $state.go('user.show', {
      username: $scope.username,
      page: $scope.page,
      sort: $scope.sort,
      direction: $scope.direction
    });
  });
});
