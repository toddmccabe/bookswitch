bookSwitchApp.directive('conversationList', function(Conversation, SiteData, appConfig) {
  return {
    scope: true,
    templateUrl: 'views/directives/conversation/list.html',
    link: function($scope) {
      $scope.username = SiteData.get('username');
      $scope.page = 1;

      $scope.getConversations = function() {
        Conversation.query({
          username: SiteData.get('username'),
          token: SiteData.get('token'),
          page: $scope.page
        }, function(response) {
          $scope.conversations = response.conversations;
          $scope.conversationCount = response.total_count;
          $scope.totalPages = Math.ceil($scope.conversationCount / appConfig.resultsPerPage);
        });
      };

      // assure the page number requested is within range
      $scope.setPage = function(newPage) {
        if(newPage > 0 && newPage <= $scope.totalPages)
          $scope.page = newPage;
      }

      // increment/decrement page number
      $scope.changePage = function(modifier) {
        var page = $scope.page || 1;
        $scope.setPage(page + modifier);
      }

      // this calls $scope.getConversations on initialization and pagination
      $scope.$watch('page', function() {
        $scope.getConversations();
      });
    }
  }
});
