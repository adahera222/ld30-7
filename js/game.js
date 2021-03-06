
/* Game namespace */
var game = {

  "onload" : function () {
    // Initialize the video.
    if (!me.video.init("screen", 1024, 768, true, 'auto')) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
      window.onReady(function () {
      me.plugin.register.defer(debugPanel, "debug");
      });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
  },



  // Run on game resources loaded.
  "loaded" : function () {
    me.event.subscribe(me.event.STATE_PAUSE, (function() {
      if(game.timer) game.timer.pause();
      this.pauseChildTimers(me.game.world);
    }).bind(this));

    me.event.subscribe(me.event.STATE_RESUME, (function () {
      if(game.timer) game.timer.resume();
      this.resumeChildTimers(me.game.world);
    }).bind(this))

    me.entityPool.add('car', game.Car, true);

    this.texture = new me.TextureAtlas(me.loader.getJSON('images'), me.loader.getImage('images'));


    me.state.set(me.state.MENU, new game.TitleScreen());
    this.playScreen = new game.PlayScreen();
    me.state.set(me.state.PLAY, this.playScreen);
    me.state.set(me.state.GAME_END, new game.EndScreen());

    // Start the game.
    me.state.change(me.state.MENU);
  },

  pauseChildTimers : function(container) {
    for(var i = 0; i < container.children.length; i++) {
      var child = container.children[i];
      if(child.timer !== null && typeof child.timer !== 'undefined') {
        child.timer.pause();
      }
      if(child.children !== null && typeof child.children === 'object') {
        this.pauseChildTimers(child);
      }
    }
  },

  resumeChildTimers : function(container) {
    for(var i = 0; i < container.children.length; i++) {
      var child = container.children[i];
      if(child.timer !== null && typeof child.timer !== 'undefined') {
        child.timer.resume();
      }
      if(child.children !== null && typeof child.children === 'object') {
        this.resumeChildTimers(child);
      }
    }
  }
};


game.math = {
  getYIntercept : function(p1, slope) {
    return p1.y - slope * p1.x;
  },

  slope : function(p1, p2) {
    return (p2.y - p1.y) / (p2.x - p1.x);
  },

  xFromSlope : function(y, slope, b) {
    return (y - b) / slope;
  },

  yFromSlope : function(x, slope, b) {
    return slope * x + b;
  }
};