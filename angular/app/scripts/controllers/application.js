angular.module('bookSwitchApp').controller('ApplicationController', function(
  $scope,
  $timeout,
  SiteData,
  BrowserSupport,
  SessionUtilities,
  UserNotifications
) {
  // use timeout to allow all listeners to load
  $timeout(function() {
    // add css classes to document for detecting browser support
    BrowserSupport.addCssClasses();

    // start watcher for validating session
    SessionUtilities.startSessionValidation();

    // start watcher for adding css classes depending on session state
    SessionUtilities.addListenerForCssClasses();

    // start watcher for user notifications polling (new messages etc.)
    UserNotifications.initialize();
  });
});
