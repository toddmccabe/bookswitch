bookSwitchApp.factory('Conversation', function($resource) {
  return $resource('/api/conversation/:id', null, {
    'query': {
      isArray: false
    },
    'update': {
      method: 'PUT'
    }
  });
});
