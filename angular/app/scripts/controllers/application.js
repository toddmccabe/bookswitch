bookSwitchApp.controller('ApplicationController', function($scope, SiteData) {
  $scope.$watch(function() {
    return SiteData.get('username');
  },
  function(value) {
    $scope.username = value;
  });
});
