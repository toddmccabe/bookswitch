bookSwitchApp.factory('Error', function() {
  return {
    parse: function(errors) {
      var parsedErrors = [];

      // if errors is a string (single error)
      if(typeof errors == "string") {
        parsedErrors.push(errors);

      // if errors is an array (multiple errors)
      } else {
        angular.forEach(errors, function(errorsArray, key) {
          angular.forEach(errorsArray, function(error) {
            key = key.replace('_', ' ');

            this.push(key + ' ' + error);
          }, parsedErrors);
        });
      }


      return parsedErrors;
    }
  }
});
