angular.module('bookSwitchApp').factory('Session', function(
  $resource
) {
  return $resource('/api/session/:id');
});
