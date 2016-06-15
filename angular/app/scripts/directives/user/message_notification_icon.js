angular.module('bookSwitchApp').directive('messageNotificationIcon', function(
  SiteData
) {
  return {
    templateUrl: 'views/directives/user/message_notification_icon.html',
    controller: function($scope, $element) {
      // element is hidden by default
      $element.hide();

      // show/hide notification icon when unreadConversations count changes
      var unreadConversationsChanged = function() {
        var unreadConversations = SiteData.get('unreadConversations');

        if(unreadConversations === undefined) {
          return;
        }

        if(parseInt(unreadConversations) > 0) {
          $element.show();
        } else {
          $element.hide();
        }
      }

      // add event listener
      $scope.$on('UserNotificationsUnreadConversationsChanged', unreadConversationsChanged);
    }
  }
});
