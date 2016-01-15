bookSwitchApp.controller('BookShowController', function($scope, Book, $stateParams) {
  Book.get({id: $stateParams.id}, function(book) {
    $scope.book = book;
  })
});
