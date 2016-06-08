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
    }
  });
});
