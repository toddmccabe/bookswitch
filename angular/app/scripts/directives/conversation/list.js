angular.module('bookSwitchApp').directive('conversationList', function(
  $stateParams,
  Conversation,
  SiteData,
  appConfig
) {
  return {
    scope: {
      page: '='
    },
    templateUrl: 'views/directives/conversation/list.html',
    link: function($scope) {
      $scope.username = SiteData.get('username');
      $scope.isUser = $scope.username === $stateParams.username;
      $scope.firstQueryCompleted = false;

      $scope.getConversations = function() {
        Conversation.query({
          username: $scope.username,
          token: SiteData.get('token'),
          page: $scope.page
        }, function(response) {
          $scope.conversations = response.conversations;
          $scope.conversationTotalCount = response.total_count;
          $scope.scrollToTop();
          $scope.firstQueryCompleted = true;
        });
      };

      $scope.scrollToTop = function() {
        if($scope.firstQueryCompleted) {
          window.scrollTo(0, 0);
        }
      }

      // this calls $scope.getConversations on initialization and pagination
      $scope.$watch('page', function() {
        $scope.getConversations();
      });
    }
  }
});
