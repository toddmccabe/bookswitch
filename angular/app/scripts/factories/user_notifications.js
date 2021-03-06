angular.module('bookSwitchApp').factory('UserNotifications', function(
  $rootScope,
  $timeout,
  User,
  SiteData,
  appConfig
) {
  var timeoutPromise;

  var initialize = function() {
    // add event listeners
    $rootScope.$on('SessionValidated', startPolling);
    $rootScope.$on('SessionInvalidated', stopPolling);
    // if a message has been read, update notifications.
    // this is to prevent a delay between reading messages
    // and the new messages icon disappearing
    $rootScope.$on('MessageRead', pollNow);
  }

  // readability alias
  var startPolling = function() {
    poll();
  }

  var poll = function() {
    // query /api/user/notifications for updates
    User.notifications({
      username: SiteData.get('username'),
      authentication_token: SiteData.get('authentication_token')
    },
      updateNotifications
    );

    // poll again in X seconds
    timeoutPromise = $timeout(poll, appConfig.polling.userNotifications * 1000);
  }

  var pollNow = function() {
    // cancel previously scheduled poll
    stopPolling();

    // poll immediately and schedule next poll
    poll();
  }

  var updateNotifications = function(response) {
    var unreadConversations = response.unread_conversations;

    if(unreadConversations !== SiteData.get('unreadConversations')) {
      SiteData.set('unreadConversations', unreadConversations);

      $rootScope.$broadcast('UserNotificationsUnreadConversationsChanged');
    }
  }

  var stopPolling = function() {
    // cancel previously scheduled poll
    $timeout.cancel(timeoutPromise);
  }

  return {
    initialize: initialize
  }
});
