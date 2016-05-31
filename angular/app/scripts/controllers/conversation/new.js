bookSwitchApp.controller('ConversationNewController', function($scope, $state, $stateParams, Conversation, Book, SiteData) {
  $scope.conversation = new Conversation();

  // add references to sender, recipient
  $scope.conversation.username = SiteData.get('username');
  $scope.conversation.token = SiteData.get('token');
  $scope.conversation.toUsername = $stateParams.to;

  // add optional reference to book
  if($stateParams.book) {
    Book.get({id: $stateParams.book}, function(response) {
      $scope.book = response;
      $scope.conversation.bookId = $scope.book.id;
    });
  }

  $scope.create = function() {
    $scope.conversation.$save({}, function(response) {
      $state.go('conversation.update', {
        id: response.id,
        sent: true
      });
    }, function(response) {
      $scope.errors = response.data.errors;
    });
  }
});
