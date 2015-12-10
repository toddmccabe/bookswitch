bookSwitchApp.factory('Book', function($resource) {
  return $resource('/api/book/:id');
})