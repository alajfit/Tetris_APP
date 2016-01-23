var checkers = angular.module('ang-tetris', []);

checkers.service('builder', function() { // Used to build elements of the board
  // used to build the preview table
  this.previewTable = function(pt_height, pt_width) {
    var pT = document.createElement('div');
        pT.className += 'preview-table';
    for(var x=0; x<pt_height; x++) {
      var row = document.createElement('div');
          row.className += 'preview-table__row'
      for(var y=0; y<pt_width; y++) {
        var cell = document.createElement('div');
            cell.className +='preview-table__row__cell';
            row.appendChild(cell);
      }
      pT.appendChild(row);
    }
    return pT;
  };
  // used to build the actual checkers board
  this.checkersTable = function(board_height, board_width) {
    var checkers_board = document.createElement('div');
        checkers_board.className += 'checkers';
    for(var x=0; x<board_height; x++) {
      var row = document.createElement('div');
          row.className += 'checkers__board-row';
      for(var y=0; y<board_width; y++) {
        var cell = document.createElement('div');
            cell.className += 'checkers__board-row__cell';
            cell.className += ' r'+x+'.c'+y; // row number and cell number
        row.appendChild(cell);
      }
      checkers_board.appendChild(row);
    }
    return checkers_board;
  };
  // This is used for the array to display and keep count of pieces in play
  this.boardArray = function(defaultValue, rows, columns) {
    var x = new Array();
    for(var y=0; y<rows; y++) {
      x[y] = [];
      for(var z=0; z<columns; z++) {
        x[y][z] = defaultValue;
      }
    }
    return x;
  };
  this.pieces = function() {
    var p = [
        [[0,0,0,0],   //
         [0,1,1,0],   // **
         [0,1,1,0],   // **
         [0,0,0,0]], //
        [[0,1,0,0],   // *
         [0,1,0,0],   // *
         [0,1,0,0],   // *
         [0,1,0,0]], // *
        [[0,0,0,0],   //
         [1,1,1,0],   // ***
         [0,1,0,0],   //  *
         [0,0,0,0]], //
        [[0,0,0,0],   //
         [0,1,1,0],   //  **
         [1,1,0,0],   // **
         [0,0,0,0]], //
        [[0,0,0,0],   //
         [0,1,1,0],   // **
         [0,0,1,1],   //  **
         [0,1,0,0]], //
        [[0,1,0,0],   // *
         [0,1,0,0],   // *
         [0,1,1,0],   // **
         [0,0,0,0]], //
        [[0,0,1,0],   //  *
         [0,0,1,0],   //  *
         [0,1,1,0],   // **
         [0,0,0,0]] //
    ];
  }
});

checkers.service('inputService', ['$rootScope', function($rootScope) {
  var down = false; this.getDown = function() { return down; }; // Letter U - KeyCode 85
  var rotate = false; this.getRotate = function() { return rotate; }; // Letter O - KeyCode 79
  var left = false; this.getLeft = function() { return left; }; // Letter I - KeyCode 73
  var right = false; this.getRight = function() { return right; }; // Letter P - KeyCode 80


  document.addEventListener('keydown', function(event) { // changes the values above for keys pressed
    switch(event.keyCode) {
        case 85: down = true; break;
        case 79: rotate = true; break;
        case 73: left = true; break;
        case 80: right = true; break;
    }
    $rootScope.$apply();
  }, true);

  document.addEventListener('keyup', function(event) {
    switch(event.keyCode) {
        case 85: down = false; break;
        case 79: rotate = false; break;
        case 73: left = false; break;
        case 80: right = false; break;
    }
    $rootScope.$apply();
  }, true);
}]);

checkers.service('gameService', ['builder', function(builder) {
    var board = [],
        pieces = [],
        activePiece = [],
        nextPiece = [];

    this.start = function() {
      console.log('Starting the Game');
      board = builder.boardArray(0, 20, 10);
      console.log('New board collected');
      pieces = builder.pieces();
      console.log('All the pieces are gathered');
    }
}]);

checkers.directive('checkersBoard', ['builder', function(builder) {
  var board_height = 20, board_width = 10;
  return {
    restrict: 'EA',
    compile: function(element, attributes) {
      var checkers_board = builder.checkersTable(board_height, board_width);

      var linkFunction = function($scope, element, attributes) {
        element.append(checkers_board);
      }
      return linkFunction;
    }
  }
}]);

checkers.directive('checkersPreview', ['builder', function(builder) {
  var preview_height = 4, preview_width = 8;
  return {
    restrict: 'EA',
    compile: function(element, attributes) {
      var buildPT = builder.previewTable(preview_height, preview_width);

      var linkFunction = function($scope, element, attributes) {
        element.append(buildPT);
      }
      return linkFunction;
    }
  }
}]);

checkers.controller('buttonController', ['$scope', 'inputService', function($scope, inputService) {
    $scope.input = inputService;
    $scope.$watch('input.getDown()', function(change) {
        change === true ? $scope.downColor = 'red' : $scope.downColor = 'black';
    }, false);
    $scope.$watch('input.getRotate()', function(change) {
        change === true ? $scope.rotateColor = 'red' : $scope.rotateColor = 'black';
    }, false);
    $scope.$watch('input.getLeft()', function(change) {
        change === true ? $scope.leftColor = 'red' : $scope.leftColor = 'black';
    }, false);
    $scope.$watch('input.getRight()', function(change) {
        change === true ? $scope.rightColor = 'red' : $scope.rightColor = 'black';
    }, false);
}]);

checkers.run(['gameService', function(gameService) {
    gameService.start();
}]);
