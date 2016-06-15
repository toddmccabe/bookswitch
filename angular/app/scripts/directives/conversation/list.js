angular.module('bookSwitchApp').directive('conversationList', function(
  $state,
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
      $scope.page = $stateParams.page;

      Conversation.query({
        username: $scope.username,
        token: SiteData.get('token'),
        page: $scope.page
      }, function(response) {
        $scope.conversations = response.conversations;
        $scope.conversationTotalCount = response.total_count;
      });

      // if $scope.page changes, go to that page
      $scope.$watch('page', function() {
        $state.go($state.current.name, {
          page: $scope.page
        });
      }, true);
    }
  }
});
