game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    game.scene = new game.BrotherScene();

    // add our HUD to the game world
    me.game.add(new game.HUD.Container());
  },


  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    // remove the HUD from the game world
    me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);
  }
});