bookSwitchApp.factory('Error', function() {
  return {
    parse: function(errors) {
      var parsedErrors = [];

      angular.forEach(errors, function(errorsArray, key) {
        angular.forEach(errorsArray, function(error) {
          key = key.replace('_', ' ');

          this.push(key + ' ' + error);
        }, parsedErrors);
      });

      return parsedErrors;
    }
  }
});
