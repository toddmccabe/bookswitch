// http://stackoverflow.com/questions/31719285/angular-js-set-cookies-domain-wide-failed
angular.module('bookSwitchApp').config(function($cookiesProvider) {
  // Set $cookies defaults unless we're in development
  // (development ssl certificate will most likely be invalid)
  if(location.host === 'bookswit.ch') {
    $cookiesProvider.defaults.secure = true;
    $cookiesProvider.defaults.domain = '.bookswit.ch';
  }
});
