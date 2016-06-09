angular.module('bookSwitchApp').factory('AjaxCustomsEventInterceptor', function(
  $rootScope,
  $q
) {
  return {
    request: function(config) {
      $rootScope.$broadcast('AjaxStarted');

      return config;
    },

   requestError: function(rejection) {
      $rootScope.$broadcast('AjaxFinished');

      return $q.reject(rejection);
    },

    response: function(response) {
      $rootScope.$broadcast('AjaxFinished');

      return response;
    },

   responseError: function(rejection) {
      $rootScope.$broadcast('AjaxFinished');

      return $q.reject(rejection);
    }
  };
});

// add to httpProvider interceptor stack
angular.module('bookSwitchApp').config(function(
  $httpProvider
) {
  $httpProvider.interceptors.push('AjaxCustomsEventInterceptor');
});
