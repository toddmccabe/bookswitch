bookSwitchApp.controller('ApplicationController', function($scope, $cookies) {
  $scope.$watch(function() {
    return $cookies.get('username');
  },
  function(value) {
    $scope.user = value;
  })
});