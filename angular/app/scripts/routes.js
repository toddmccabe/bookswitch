bookSwitchApp.config(function($stateProvider, $urlRouterProvider) {
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
    .state('book.show', {
      url: '/book/:id',
      controller: 'BookController',
      templateUrl: 'views/book/show.html'
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
      url: '/user/login?confirmed',
      controller: 'UserLoginController',
      templateUrl: 'views/user/login.html'
    })
    .state('user.logout', {
      url: '/user/logout',
      controller: 'UserLogoutController',
      templateUrl: 'views/user/logout.html'
    })
    .state('user.show', {
      url: '/user/:id',
      controller: 'UserShowController',
      templateUrl: 'views/user/show.html'
    });
});
