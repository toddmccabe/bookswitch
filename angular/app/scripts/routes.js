bookSwitchApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('application', {
      templateUrl: 'views/layout/application.html'
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
    });
});