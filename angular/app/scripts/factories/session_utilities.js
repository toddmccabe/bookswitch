angular.module('bookSwitchApp').factory('SessionUtilities', function(
  $rootScope,
  SiteData,
  Session
) {
  // has the session been validated?
  var sessionValidated = false;

  // validate session if username and authentication token are present
  var startSessionValidation = function() {
    $rootScope.$watch(function() {
      return SiteData.get('username');
    },
    function(value) {
      // if username is present, attempt to authenticate
      if(value) {
        Session.get({
          id: SiteData.get('authentication_token'),
          username: value
        }, function() {
          // valid session
          sessionValidated = true;
          $rootScope.$broadcast('SessionValidated');
        }, function() {
          // invalid session. user may have logged off from
          // another browser. remove all site data.
          SiteData.removeAll();

          $rootScope.$broadcast('SessionInvalidated');
        });

      // session data was validated but has since been removed
      } else if(sessionValidated) {
        $rootScope.$broadcast('SessionInvalidated');
      }
    });
  }

  var addListenerForCssClasses = function() {
    $rootScope.$on('SessionValidated', addCssClassLoggedIn);
    $rootScope.$on('SessionInvalidated', removeCssClassLoggedIn);
  }

  var addCssClassLoggedIn = function() {
    $('html').addClass('logged-in');
  }

  var removeCssClassLoggedIn = function() {
    $('html').removeClass('logged-in');
  }

  return {
    startSessionValidation: startSessionValidation,
    addListenerForCssClasses: addListenerForCssClasses
  }
});
