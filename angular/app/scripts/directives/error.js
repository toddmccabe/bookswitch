bookSwitchApp.directive('error', function() {
  return {
    scope: {
      errors: '='
    },
    templateUrl: 'views/directives/error.html'
  }
});
