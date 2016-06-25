angular.module('bookSwitchApp').factory('User', function(
  $resource
) {
  return $resource('/api/user/:username', null, {
    // account activation link endpoint
    'confirm': {
      method: 'POST',
      url: '/api/user/confirm'
    },
    'update': {
      method: 'PUT'
    },
    'notifications': {
      url: '/api/user/notifications'
    },
    'passwordResetRequest': {
      url: '/api/user/password_reset_request/:usernameEmail'
    },
    'passwordResetUpdate': {
      method: 'POST',
      url: '/api/user/password_reset_update'
    }
  });
});
