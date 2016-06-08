angular.module('bookSwitchApp').config(function(
  $stateProvider,
  $urlRouterProvider
) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('application', {
      templateUrl: 'views/layout/application.html',
      controller: 'ApplicationController'
    })
    .state('home', {
      url: '/',
      parent: 'application',
      templateUrl: 'views/home.html'
    })
    .state('book', {
      parent: 'application',
      templateUrl: 'views/layout/yield.html'
    })
    .state('book.new', {
      url: '/book/new',
      controller: 'BookNewController',
      templateUrl: 'views/book/new.html'
    })
    .state('book.search', {
      url: '/book/search?query&page&sort&direction',
      controller: 'BookSearchController',
      templateUrl: 'views/book/search.html'
    })
    .state('book.show', {
      url: '/book/:id?added&updated',
      controller: 'BookShowController',
      templateUrl: 'views/book/show.html'
    })
    .state('book.update', {
      url: '/book/update/:id',
      controller: 'BookUpdateController',
      templateUrl: 'views/book/update.html'
    })
    .state('book.destroy', {
      url: '/book/destroy/:id?removed',
      controller: 'BookDestroyController',
      templateUrl: 'views/book/destroy.html'
    })
    .state('user', {
      parent: 'application',
      templateUrl: 'views/layout/yield.html'
    })
    .state('user.new', {
      url: '/user/new',
      controller: 'UserNewController',
      templateUrl: 'views/user/new.html'
    })
    .state('user.confirm', {
      url: '/user/confirm/:token',
      controller: 'UserConfirmController',
      templateUrl: 'views/user/confirm.html'
    })
    .state('user.login', {
      url: '/user/login?confirmed&afterURL',
      controller: 'UserLoginController',
      templateUrl: 'views/user/login.html'
    })
    .state('user.logout', {
      url: '/user/logout?deactivated',
      controller: 'UserLogoutController',
      templateUrl: 'views/user/logout.html'
    })
    .state('user.show', {
      url: '/user/:username?updated&page&sort&direction',
      controller: 'UserShowController',
      templateUrl: 'views/user/show.html'
    })
    .state('user.update', {
      url: '/user/update/:username',
      controller: 'UserUpdateController',
      templateUrl: 'views/user/update.html'
    })
    .state('user.deactivate', {
      url: '/user/deactivate/:username',
      controller: 'UserDeactivateController',
      templateUrl: 'views/user/deactivate.html'
    })
    .state('conversation', {
      parent: 'application',
      templateUrl: 'views/layout/yield.html'
    })
    .state('conversation.new', {
      url: '/conversation/new/?to&book',
      controller: 'ConversationNewController',
      templateUrl: 'views/conversation/new.html'
    })
    .state('conversation.update', {
      url: '/conversation/update/:id?sent',
      controller: 'ConversationUpdateController',
      templateUrl: 'views/conversation/update.html'
    });
});
