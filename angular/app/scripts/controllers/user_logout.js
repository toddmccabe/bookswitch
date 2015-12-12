bookSwitchApp.controller('UserLogoutController', function($cookies) {
  $cookies.remove('token');
  $cookies.remove('username');
});