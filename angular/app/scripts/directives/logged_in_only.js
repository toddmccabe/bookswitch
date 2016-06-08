angular.module('bookSwitchApp').directive('loggedInOnly', function(
  $state,
  SiteData
) {
  return {
    restrict: 'A',
    link: function($scope, $element) {
      $scope.checkIfLoggedIn = function(event) {
        // if the user isn't logged in
        if(!SiteData.get('token')) {
          event.preventDefault();

          // redirect to login page with attempted url
          $state.go('user.login', {afterURL: event.target.href || location.href});
        }
      }

      $element.on('click', $scope.checkIfLoggedIn);
    }
  }
});
