(function () {
  window.SG = window.SG || {}

  var View = SG.View = function ($el) {
    this.$el = $el;
    this.board = new SG.Board(20);
    window.setInterval(this.step.bind(this), 1000);

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  View.keyCodes = {
    38: "U",
    40: "D",
    37: "L",
    39: "R"
  }

  View.prototype.handleKeyEvent = function (e) {
    var dir = this.keyCodes[e.keyCode];
    if (dir) {
      this.board.snake.turn(dir);
    } else {
      // valid key not pressed
    }
  }

  View.prototype.step = function () {
    this.board.snake.move();
    this.board.render();
  }

  View.prototype.render =  function () {
    this.$el.html(this.board.render());
  }


})();
