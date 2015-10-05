(function () {
  window.SG = window.SG || {};

  var Snake = SG.Snake = function (board) {
    this.dir = "U";
    this.turning = false;
    var origin = [10,10];
    this.segements = [origin];
    this.board = board;
    this.growing = false;
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

  Snake.prototype.isOccupying = function (pos) {
    this.segements.forEach(function (seg) {
      if (isSameCoord(seg, pos)) {
        return true;
      }
    });
    return false;
  }

  Snake.prototype.move = function () {
    var delta = Snake.DELTAS[this.dir];
    var next = plusCoord(this.segements[0], delta);
    if (!this.isInBounds(next)) {
      this.segements = [];
      alert("You lose! Refresh to play again");
      return;
    } else {
      this.segements.unshift(next);
    };

    this.turning = false;

    if (this.eatApple()) {
      this.board.apple.setApple();
    };

    if (this.growing) {
      this.growing = false;
    } else {
      this.segements.pop();
    };

    if (this.eatDeath()) {
      this.segements = [];
      alert("You lose! Refresh to play again");
    };
  };

  Snake.prototype.turn = function (dir) {
    if (this.turning) { return }
    if (this.validTurn(dir)) {
      this.turning = true;
      this.dir = dir;
    }
  };

  Snake.prototype.validTurn =  function (dir) {
    return (this.dir === "U" || this.dir === "D") && (dir === "R" || dir === "L") ||
      (this.dir === "L" || this.dir === "R") && (dir === "U" || dir === "D")
  };

  Snake.prototype.head = function () {
    return this.segements[0];
  };

  Snake.prototype.eatApple = function () {
    if (isSameCoord(this.head(), this.board.apple.position)) {
      this.growing = true;
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.eatDeath = function () {
    var head = this.head();
    for (var i = 1; i < this.segements.length; i++) {
      if (isSameCoord(head, this.segements[i])) {
        return true;
      }
    }
   return false;
  };

  Snake.prototype.isInBounds = function (pos) {
    return (pos[0] >= 0) && (pos[0] < this.board.dim) &&
     (pos[1] >= 0) && (pos[1] < this.board.dim);
  };

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
