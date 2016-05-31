bookSwitchApp.controller('ConversationUpdateController', function($scope, $state, $stateParams, Conversation, Book, User, SiteData) {
  $scope.sent = $stateParams.sent;
  $scope.conversation = new Conversation();
  $scope.inactiveUser = false;

  $scope.conversation.$get({
    id: $stateParams.id,
    username: SiteData.get('username'),
    token: SiteData.get('token')
  }, function(response) {
    if(response.book) {
      $scope.book = new Book();
      $scope.book.$get({id: response.book.id});
    }

    // check to see if the other user has deactivated their account
    User.get({
      username: response.usernames.remove(SiteData.get('username'))[0]
    }, function() {
      // active account
    }, function() {
      // inactive account
      $scope.inactiveUser = true;
    });
  }, function(response){
    $scope.errors = response.data.errors;
  });

  $scope.update = function() {
    $scope.conversation.$update({
      id: $scope.conversation.id,
      username: SiteData.get('username'),
      token: SiteData.get('token')
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
