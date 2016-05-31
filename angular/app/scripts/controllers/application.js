bookSwitchApp.controller('ApplicationController', function($scope, $state, SiteData, Session) {
  // automatically update scope username from SiteData factory
  $scope.$watch(function() {
    return SiteData.get('username');
  },
  function(value) {
    // automatically update $scope.username
    $scope.username = value;

    // validate session
    if(value) {
      Session.get({
        id: SiteData.get('token'),
        username: SiteData.get('username')
      }, function() {
        // valid session. do nothing
      }, function() {
        // invalid session. user may have logged off from another browser
        // remove all site data and redirect to login
        SiteData.removeAll();
        $state.go('user.login');
      });
    }
  });
});
