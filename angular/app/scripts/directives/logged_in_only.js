angular.module('bookSwitchApp').directive('loggedInOnly', function($state, SiteData) {
  return {
    restrict: 'A',
    link: function($scope, $element) {
      // if the user is not logged in
      if(!SiteData.get('token')) {
        $element.on('click', function(event) {
          event.preventDefault();

          // redirect to login page with attempted url
          $state.go('user.login', {
            afterURL: event.target.href
          });
        });
      }
    }
  }
});
