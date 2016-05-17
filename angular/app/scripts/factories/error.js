bookSwitchApp.factory('Error', function() {
  return {
    parse: function(errors) {
      var parsedErrors = [];

      // if errors is a string (single error)
      if(typeof errors == "string") {
        parsedErrors.push(errors);

      // if errors is an array (multiple errors)
      // rails returns errors in both string/array formats
      // todo: ask rails to not be like that
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
