bookSwitchApp.factory('User', function($resource) {
  return $resource('/api/user/:id', null, {
    'confirm': {
      method: 'POST',
      url: '/api/user/confirm'
    }
  });
});
