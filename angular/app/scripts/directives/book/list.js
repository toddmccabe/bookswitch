angular.module('bookSwitchApp').directive('bookList', function(
  $state,
  $stateParams,
  Book,
  SiteData,
  appConfig
) {
  return {
    scope: {
      booksTotalCount: '=?'
    },
    templateUrl: 'views/directives/book/list.html',
    link: function($scope, $element) {
      // short for $scope.params
      $scope.p = {};
      $scope.books = [];
      $scope.resultsAnchor = $element.find('a[name=book-list]');

      // is the current user viewing their own books?
      $scope.isUser = (SiteData.get('username') && SiteData.get('username') === $stateParams.username);

      // copy url parameters to $scope.p
      var updateParams = function() {
        ['query',
         'page',
         'sort',
         'direction',
         'username'].forEach(function(property) {

          $scope.p[property] = $stateParams[property];
        });
      }

      // retrieve books
      var query = function() {
        Book.query($scope.p, function(response) {
          $scope.books = response.books;
          $scope.booksTotalCount = response.total_count;

          // automatically scroll to top of results
          scrollToResults($scope.p.page);
        });
      }

      // scroll to top of results if user changed pages
      var scrollToResults = function(value) {
        if(!value)
          return;

        $($scope.resultsAnchor).scrollToSmoothly();
      }

      var addWatchHandlers = function() {
        // if $state.params changes, copy values to $scope.p
        $scope.$watchCollection(function(){
            return $state.params;
        }, updateParams);

        // if $scope.p changes, update url and perform query
        $scope.$watch('p', function() {
          $state.go($state.current.name, $scope.p);
          query();
        }, true);
      }

      // attach watchers
      addWatchHandlers();
    }
  }
});
