bookSwitchApp.controller('BookNewController', function($scope, $state, Book, ISBNLookup, SiteData) {
  $scope.book = new Book();

  // if we enter an ISBN, attempt to lookup book details
  $scope.$watch('book.isbn', function(value) {
    // remove common dashes, spaces etc.
    var isbnAlphaNumeric = value && value.replace(/[^\w]/g, '') || '';

    // ISBN should now be in alphanumeric 10/13 character format
    if(isbnAlphaNumeric.length == 10 || isbnAlphaNumeric.length == 13) {
      // get ISBN lookup promise
      var lookup = ISBNLookup.search(isbnAlphaNumeric);

      lookup.then(function(response) {
        // API verbosity
        console.log('book info: ');
        console.log(response);

        // update $scope.book
        $scope.book.title = response.volumeInfo.title;
        $scope.book.author = response.volumeInfo.authors.join(', ');

        // inform anyone interested that the ISBN lookup was successful
        $scope.$broadcast('isbnLookupSuccess');
      });
    }
  });

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
});
