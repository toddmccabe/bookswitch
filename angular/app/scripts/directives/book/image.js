angular.module('bookSwitchApp').directive('bookImage', function() {
  return {
    scope: {
      book: '=',
      link: '='
    },
    templateUrl: 'views/directives/book/image.html',
    link: function($scope) {
      $scope.imageFullPath = '';
      $scope.linkParsed = '';

      $scope.formatProperties = function(book) {
        if(typeof(book) == 'undefined')
          return;

        if(book.image) {
          $scope.imageFullPath = '/api/image/' + book.image + '.jpg';
        }
        $scope.linkParsed = $scope.link || $scope.imageFullPath || '';
      }

      $scope.$watch('book', $scope.formatProperties);
    }
  }
});
