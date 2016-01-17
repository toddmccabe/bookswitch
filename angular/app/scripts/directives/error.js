bookSwitchApp.directive('error', function() {
  return {
    scope: {
      errors: '=errors'
    },
    templateUrl: 'views/directives/error.html'
  }
});
