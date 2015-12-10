bookSwitchApp.controller('BookController', function($scope, Book, $stateParams) {
  // $scope.book = Book.get({id: $stateParams.id});

  Book.get({id: $stateParams.id}, function(book) {
    $scope.book = book;
  })
});