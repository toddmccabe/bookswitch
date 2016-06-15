// don't send cookies with XHR requests
angular.module('bookSwitchApp').config(function($httpProvider) {
  $httpProvider.defaults.withCredentials = false;
});
