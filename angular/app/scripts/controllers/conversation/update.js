angular.module('bookSwitchApp').controller('ConversationUpdateController', function(
  $scope,
  $state,
  $stateParams,
  Conversation,
  Book,
  User,
  SiteData
) {
  $scope.sent = $stateParams.sent;
  $scope.conversation = new Conversation();
  $scope.userInactive = false;
  $scope.bookUnavailable = false;
  $scope.username = SiteData.get('username');
  $scope.token = SiteData.get('token');

  $scope.conversation.$get({
    id: $stateParams.id,
    username: $scope.username,
    token: $scope.token
  }, function(response) {
    if(response.book.id) {
      Book.get({id: response.book.id}, function(response) {
        $scope.book = response;
      }, function() {
        $scope.bookUnavailable = true;
      });
    }

    // check to see if the other user has deactivated their account
    User.get({
      username: response.usernames.remove($scope.username)[0]
    }, function() {
      // active account
    }, function() {
      // inactive account
      $scope.userInactive = true;
    });
  }, function(response){
    $scope.errors = response.data.errors;
  });

  $scope.update = function() {
    $scope.conversation.$update({
      id: $scope.conversation.id,
      username: $scope.username,
      token: $scope.token
    }, function(response) {
      $state.go('conversation.update', {
        id: response.id,
        sent: true
      }, {
        reload: true
      });
    }, function(response) {
      $scope.errors = response.data.errors;
    });
  }
});
