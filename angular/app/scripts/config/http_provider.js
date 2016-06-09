angular.module('bookSwitchApp').config(function($httpProvider) {
  $httpProvider.defaults.withCredentials = false;
});
