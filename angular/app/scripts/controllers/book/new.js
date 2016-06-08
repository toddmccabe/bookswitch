angular.module('bookSwitchApp').controller('BookNewController', function(
  $scope,
  $state,
  Book,
  BarcodeLookup,
  SiteData
) {
  $scope.book = new Book();

  // load and remove previously entered ISBN
  if(SiteData.get('lastIsbnEntered')) {
    $scope.book.isbn10 = SiteData.get('lastIsbnEntered');
    SiteData.remove('lastIsbnEntered');
  }

  // save book to API
  $scope.create = function() {
    // if the user isn't logged in, save the ISBN they
    // entered for when they return after registering
    if(!SiteData.get('username')) {
      SiteData.set('lastIsbnEntered', $scope.book.isbn10);
    }

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
    $scope.book = angular.merge($scope.book, barcodeLookupResponse.data.book);

    // used to autofocus price field
    if(barcodeLookupResponse.data.book)
      $scope.$broadcast('barcodeLookupSuccess');
  };

  $scope.$watch('book.isbn10', function(value) {
    BarcodeLookup.search(value).then($scope.updateFields);
  });
});
