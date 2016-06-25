angular.module('bookSwitchApp').factory('LoginRequired', function(
  $state,
  SiteData
) {
  function stateLoginCheck(
    event,
    attemptedState
  ) {
    var attemptedState = attemptedState || $state.current;

    // if user is attempting to load a logged in-only state and they have no authentication token
    if(attemptedState.loginRequired && !SiteData.get('authentication_token')) {
      event.preventDefault();

      // redirect to login page with attempted url
      $state.go('user.login', {afterURL: location.href});
    }
  }

  return {
    stateLoginCheck: stateLoginCheck
  }
});

// run LoginRequired.stateLoginCheck when view state or session state changes
angular.module('bookSwitchApp').run(function(
  $rootScope,
  LoginRequired
) {
  $rootScope.$on('$stateChangeStart', LoginRequired.stateLoginCheck);
  $rootScope.$on('SessionInvalidated', LoginRequired.stateLoginCheck);
});
