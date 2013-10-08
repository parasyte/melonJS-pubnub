game.PlayScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
      // load a level
		me.levelDirector.loadLevel("map1");
		
		// reset the score
		game.data.score = 0;
		
		// add our HUD to the game world	
		me.game.add(new game.HUD.Container());
		
		// play some music
		me.audio.playTrack("DST-GameForest");

		// Instantiate the Multiplayer object
		game.mp = new Multiplayer(function (x, y) {
		// Create a new player object
		var obj = me.entityPool.newInstanceOf("mainplayer", x, y, {
			spritewidth : 72,
			spriteheight : 98,
			isMP : true
		});

		me.game.add(obj, 4);
		me.game.sort();

		return obj;
		});
	},
	
	/**	
	 *  action to perform on state change
	 */
	onDestroyEvent: function() {	
	
		// remove the HUD from the game world
		me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);
		
		// stop some music
		me.audio.stopTrack("DST-GameForest");
	}
});
