(function () {
  window.SG = window.SG || {};

  var Snake = SG.Snake = function () {
    this.dir = "U";
    var origin = [10,10];
    this.segements = [origin];
  };

  Snake.DELTAS = {
    "U": [-1,  0],
    "D": [ 1,  0],
    "L": [ 0,  1],
    "R": [ 0, -1]
  };

  Snake.prototype.move = function () {
    var delta = Snake.DELTAS[this.dir];
    this.segements.unshift( plusCoord(this.segements[0], delta) );
    this.segements.pop();
  };

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
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
    this.snake = new Snake();
    // this.apple = new Apple();
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
    debugger
    this.snake.segements.forEach(function (seg) {
      grid[seg[0]][seg[1]] = "S";
    })
  };


})();
