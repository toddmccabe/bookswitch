bookSwitchApp.directive('bookPreview', function() {
  return {
    scope: {
      book: '='
    },
    templateUrl: 'views/directives/book/preview.html'
  }
});
