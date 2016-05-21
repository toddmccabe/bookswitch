bookSwitchApp.controller('ApplicationController', function($scope, SiteData) {
  // automatically update scope username from SiteData factory
  $scope.$watch(function() {
    return SiteData.get('username');
  },
  function(value) {
    $scope.username = value;
  });
});
