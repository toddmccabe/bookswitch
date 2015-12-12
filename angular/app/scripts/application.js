'use strict';

/**
 * @ngdoc overview
 * @name bookSwitchApp
 * @description
 * # bookSwitchApp
 *
 * Main module of the application.
 */
var bookSwitchApp = angular.module('bookSwitchApp', [
  'ui.router',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch'
])
.constant('appConfig', {
  'cookieExpirationInDays': 14
});
