angular.module('bookSwitchApp').directive('conversationList', function(
  $state,
  $stateParams,
  Conversation,
  SiteData,
  appConfig
) {
  return {
    templateUrl: 'views/directives/conversation/list.html',
    link: function($scope, $element) {
      $scope.username = SiteData.get('username');
      $scope.page = $stateParams.page;
      $scope.resultsAnchor = $element.find('a[name=conversation-list]');

      var query = function() {
        Conversation.query({
          username: $scope.username,
          token: SiteData.get('token'),
          page: $scope.page
        }, function(response) {
          $scope.conversations = response.conversations;
          $scope.conversationTotalCount = response.total_count;

          // automatically scroll to top of results
          scrollToResults($scope.page);
        });
      }

      // scroll to top of results if user changed pages
      var scrollToResults = function(value) {
        if(!value)
          return;

        $($scope.resultsAnchor).scrollToSmoothly();
      }

      // if $scope.page changes, update url and perform query
      var attachWatchHandler = function() {
        $scope.$watch('page', function() {
          $state.go($state.current.name, {
            page: $scope.page
          });
          query();
        });
      }

      attachWatchHandler();
    }
  }
});
