angular.module('bookSwitchApp').controller('ConversationUpdateController', function(
  $scope,
  $rootScope,
  $state,
  $stateParams,
  $filter,
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
  $scope.authentication_token = SiteData.get('authentication_token');

  // retrieve associations and set up properties
  var conversationGetSuccess = function(response) {
    // find book if referenced
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

    // add date grouping to messages
    messagesAddDateGroups($scope.conversation.messages);

    // inform anyone interested that we read a message
    $rootScope.$broadcast('MessageRead');
  }

  // show errors
  var conversationGetFailure = function(response) {
    $scope.errors = response.data.errors;
  }

  // send a reply
  $scope.update = function() {
    $scope.conversation.$update({
      id: $scope.conversation.id,
      username: $scope.username,
      authentication_token: $scope.authentication_token
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

  // add date grouping to messages
  var messagesAddDateGroups = function(messages) {
    var previousDateGroup = null;

    // loop through conversation messages and conditionally set dateGroup property
    angular.forEach(messages, function(value, key) {
      // set dateGroup to <day, month date, year> format
      var dateGroup = $filter('date')(value.created_at_formatted, 'EEEE, MMMM d, y');

      // only assign dateGroup property if the message was
      // sent on a different day than the previous message
      if(dateGroup !== previousDateGroup) {
        messages[key].dateGroup = dateGroup;
      }

      // set up variable for next message's date comparison
      previousDateGroup = dateGroup;
    });
  }

  // get conversation
  $scope.conversation.$get({
    id: $stateParams.id,
    username: $scope.username,
    authentication_token: $scope.authentication_token
  }, conversationGetSuccess, conversationGetFailure);
});
