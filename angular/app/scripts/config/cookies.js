// http://stackoverflow.com/questions/31719285/angular-js-set-cookies-domain-wide-failed
angular.module('bookSwitchApp').config(function($cookiesProvider) {
  // Set $cookies defaults
  $cookiesProvider.defaults.secure = true;
  $cookiesProvider.defaults.domain = '.bookswit.ch';
});
