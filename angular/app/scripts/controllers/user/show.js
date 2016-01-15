bookSwitchApp.controller('UserShowController', function($scope, $stateParams, User) {
  User.get({id: $stateParams.id}, function(user) {
    $scope.user = user;
  })
});
