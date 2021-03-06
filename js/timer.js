game.Timer = Object.extend({
  init : function() {
    this.elapsed = 0;
    this.pauseStartTime = null;
    this.last = me.timer.getTime();
    this.delta = 0;
  },

  deltaAsSeconds : function() {
    return this.delta / 1000;
  },

  pause : function() {
    this.pauseStartTime = me.timer.getTime();
  },

  reset : function() {
    this.last = me.timer.getTime();
    this.delta = 0;
    this.elapsed = 0;
  },

  resume : function() {
    this.pauseStartTime = null;
    this.last = me.timer.getTime();
  },

  update : function() {
    var n = me.timer.getTime();
    this.elapsed += n - this.last;
    this.delta = n - this.last;
    this.last = n;
  }
});