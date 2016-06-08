angular.module('bookSwitchApp').directive('bookList', function(
  $state,
  $stateParams,
  Book,
  SiteData,
  appConfig
) {
  return {
    scope: {
      booksTotalCount: '='
    },
    templateUrl: 'views/directives/book/list.html',
    link: function($scope) {
      // short for $scope.params
      $scope.p = {};
      $scope.books = [];

      $scope.isUser = (SiteData.get('username') && SiteData.get('username') === $stateParams.username);

      // copy url parameters to $scope.p
      ['query', 'page', 'sort', 'direction', 'username'].forEach(function(property) {
        $scope.p[property] = $stateParams[property];
      });

      Book.query($scope.p, function(response) {
        $scope.books = response.books;
        $scope.booksTotalCount = response.total_count;
      });

      $scope.$watch('p', function() {
        $state.go($state.current.name, $scope.p);
      }, true);
    }
  }
});
