angular.module('bookSwitchApp').factory('Book', function(
  $resource
) {
  return $resource('/api/book/:id', null, {
    'query': {
      isArray: false
    },
    'update': {
      method: 'PUT'
    }
  });
});
