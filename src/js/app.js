var checkers = angular.module('ang-tetris', []);

checkers.directive('checkersBoard', function() {
  return {
    retrict: 'EA',
    compile: function(element, attributes) {

      var linkFunction = function($scope, element, attributes) {
        element.html('Hi');
      }
      return linkFunction;
    }
  }
});
