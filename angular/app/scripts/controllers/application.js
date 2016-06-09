angular.module('bookSwitchApp').controller('ApplicationController', function(
  $scope,
  $state,
  SiteData,
  Session,
  BrowserSupport
) {
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
        // remove all site data
        SiteData.removeAll();
      });
    }
  });

  // add css classes to document for detecting browser support
  BrowserSupport.addCssClasses();
});
