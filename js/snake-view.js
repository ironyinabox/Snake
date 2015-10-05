(function () {
  window.SG = window.SG || {}

  var View = SG.View = function ($el) {
    this.$el = $el;
    this.board = new SG.Board(15);
    window.setInterval(this.step.bind(this), 120);

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  View.keyCodes = {
    38: "U",
    40: "D",
    39: "L",
    37: "R"
  }

  View.prototype.handleKeyEvent = function (e) {
    var dir = View.keyCodes[e.keyCode];
    if (dir) {
      this.board.snake.turn(dir);
    } else {
      // valid key not pressed
    }
  }

  View.prototype.step = function () {
    this.board.snake.move();
    this.render();
  }

  View.prototype.render =  function () {
    var that = this;
    this.$el.html('');
    this.board.render().forEach(function (row) {
      var $ul = $('<ul>')
      row.forEach(function (el) {
        var $li = $('<li>', {
          'class': el
        })
        $ul.append($li)
      })
      that.$el.append($ul);
      // that.$el.append(row.join(" "));
      // that.$el.append("\n");
    })
  }


})();
