bookSwitchApp.factory('ISBNLookup', function($q, $http) {
  return {
    search: function(isbnNumber) {
      var deferred = $q.defer();

      // Google Books API
      $http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbnNumber).then(function(response) {
        if(response.data.totalItems > 0)
          deferred.resolve(response.data.items[0]);
      });

      return deferred.promise;
    }
  }
});
