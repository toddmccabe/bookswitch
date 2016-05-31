bookSwitchApp.factory('User', function($resource) {
  return $resource('/api/user/:username', null, {
    'confirm': {
      method: 'POST',
      url: '/api/user/confirm'
    },
    'update': {
      method: 'PUT'
    }
  });
});
