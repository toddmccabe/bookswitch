bookSwitchApp.controller('BookNewController', function($scope, $state, Book, BarcodeLookup, SiteData) {
  $scope.book = new Book();

  // save book to API
  $scope.create = function() {
    $scope.book.$save({
      username: SiteData.get('username'),
      token: SiteData.get('token')
    }, function(response) {
      $state.go('book.show', {
        id: response.id,
        added: true
      });
    }, function(response) {
      $scope.errors = response.data.errors;
    });
  };

  // copy data from barcode scan -> api -> $scope.book
  $scope.updateFields = function(barcodeLookupResponse) {
    $scope.book = Object.assign($scope.book, barcodeLookupResponse.data.book);

    // used to autofocus price field
    if(barcodeLookupResponse.data.book)
      $scope.$broadcast('barcodeLookupSuccess');
  };

  $scope.$watch('book.isbn', function(value) {
    BarcodeLookup.search(value).then($scope.updateFields)
  });
});
