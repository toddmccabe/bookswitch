angular.module('bookSwitchApp').directive('alternativeLinks', function(
  $stateParams,
  BarcodeLookup
) {
  return {
    templateUrl: 'views/directives/book/alternative_links.html',
    link: function($scope) {
      $scope.findAlternatives = function(barcodeLookupResponse) {
        $scope.amazon = {
          book: barcodeLookupResponse.data.book
        }
      }

      BarcodeLookup.search($stateParams.query).then($scope.findAlternatives);
    }
  }
});
