angular.module('bookSwitchApp').factory('SessionUtilities', function(
  $rootScope,
  SiteData,
  Session
) {
  // has the session been validated?
  var sessionValidated = false;
  
  // validate session if username and token are present
  var startSessionValidation = function() {
    $rootScope.$watch(function() {
      return SiteData.get('username');
    },
    function(value) {
      if(value) {
        // validate session
        Session.get({
          id: SiteData.get('token'),
          username: value
        }, function() {
          // valid session
          sessionValidated = true;
          $rootScope.$broadcast('SessionValidated');
        }, function() {
          // invalid session. user may have logged off from another browser
          // remove all site data
          SiteData.removeAll();
        });

      // session was previously validated,
      // but session data is now blank
      } else if(sessionValidated) {
        $rootScope.$broadcast('SessionInvalidated');
      }
    });
  }

  return {
    startSessionValidation: startSessionValidation
  }
});
