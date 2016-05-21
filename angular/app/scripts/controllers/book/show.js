bookSwitchApp.controller('BookShowController', function($scope, $stateParams, Book, SiteData) {
  $scope.added = $stateParams.added;

  Book.get({id: $stateParams.id}, function(book) {
    $scope.book = book;
    $scope.isOwner = SiteData.get('username') == $scope.book.user_id;
  });
});
