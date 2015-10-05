(function () {
  window.SG = window.SG || {};

  var Snake = SG.Snake = function (board) {
    this.dir = "U";
    var origin = [10,10];
    this.segements = [origin];
    this.board = board;
  };

  var Apple = SG.Apple = function (board) {
    this.board = board;
    this.setApple();
  }

  Apple.prototype.setApple = function () {
    var rowIdx = Math.floor(Math.random() * this.board.dim);
    var colIdx = Math.floor(Math.random() * this.board.dim);
    while (this.board.snake.isOccupying([rowIdx, colIdx])) {
      var rowIdx = Math.floor(Math.random() * this.board.dim);
      var colIdx = Math.floor(Math.random() * this.board.dim);
    };

    this.position = [rowIdx, colIdx];
  };

  Snake.DELTAS = {
    "U": [-1,  0],
    "D": [ 1,  0],
    "L": [ 0,  1],
    "R": [ 0, -1]
  };

  Snake.prototype.isOccupying =  function (pos) {
    this.segements.forEach(function (seg) {
      if (isSameCoord(seg, pos)) {
        return true;
      }
    });
    return false;
  }

  Snake.prototype.move = function () {
    var delta = Snake.DELTAS[this.dir];
    this.segements.unshift( plusCoord(this.segements[0], delta) );
    this.segements.pop();
    if (this.eatApple()) {
      this.board.apple.setApple();
    }
  };

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };

  Snake.prototype.head = function () {
    return this.segements[0];
  }

  Snake.prototype.eatApple = function () {
    if (isSameCoord(this.head(), this.board.apple.position)) {
      this.segements.push(this.segements[0]);
      return true;
    } else {
      return false;
    }
  }

  var plusCoord = function (arr1, arr2) {
    return [ arr1[0] + arr2[0],  arr1[1] + arr2[1] ]
  };

  var isSameCoord = function (arr1, arr2) {
    return (arr1[0] == arr2[0] && arr1[1] == arr2[1])
  };

  var isOppositeCoord = function (arr1, arr2) {
    return (arr1[0] == (-1 * arr2[0])) && (arr1[1] == (-1 * arr2[1]));
  };

  var Board = SG.Board = function (dim) {
    this.dim = dim;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  };

  Board.blankGrid = function (dim) {
    var grid = [];

    for (var i = 0; i < dim; i++) {
      var row = [];
      for (var j = 0; j < dim ; j++) {
        row.push('.');
      }
      grid.push(row);
    }

    return grid;
  };

  Board.prototype.render = function () {
    var grid = Board.blankGrid(this.dim);
    this.snake.segements.forEach(function (seg) {
      grid[seg[0]][seg[1]] = "S";
    });
    var appSpot = this.apple.position;
    grid[appSpot[0]][appSpot[1]] = "A";
    return grid;
  };


})();
