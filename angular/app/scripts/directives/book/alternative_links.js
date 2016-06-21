angular.module('bookSwitchApp').directive('alternativeLinks', function(
  $stateParams,
  BarcodeLookup
) {
  return {
    templateUrl: 'views/directives/book/alternative_links.html',
    link: function($scope) {
      // search for possible barcode number matches
      var search = function(value) {
        var request = BarcodeLookup.search(value);

        request.then(showAlternatives, hideAlternatives);
      }

      // display alternative buying options
      var showAlternatives = function(barcodeLookupResponse) {
        $scope.alternatives = {
          amazon: {
            book: barcodeLookupResponse.data.book
          }
        }
      }

      // hide alternative buying options
      var hideAlternatives = function() {
        delete $scope.alternatives;
      }

      // if query changes, perform search
      var addWatchHandler = function() {
        $scope.$watch(function(){
          return $stateParams.query
        }, search);
      }

      // attach watcher
      addWatchHandler();
    }
  }
});
