angular.module('bookSwitchApp').factory('LoginRequired', function(
  $state,
  SiteData
) {
  function stateLoginCheck(
    event,
    toState
  ) {
    // if user is attempting to load a logged in-only state and they have no token
    if(toState.loginRequired && !SiteData.get('token')) {
      event.preventDefault();

      // redirect to login page with attempted url
      $state.go('user.login', {afterURL: location.href});
    }
  }

  return {
    stateLoginCheck: stateLoginCheck
  }
});

// run LoginRequired.stateLoginCheck when state changes
angular.module('bookSwitchApp').run(function(
  $rootScope,
  LoginRequired
) {
  $rootScope.$on('$stateChangeStart', LoginRequired.stateLoginCheck);
});
