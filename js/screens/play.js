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
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        // play some music
        me.audio.playTrack("dst-gameforest");


        // Instantiate the Multiplayer object
        game.mp = new Multiplayer(function (x, y) {
            // Create a new player object
            var obj = me.pool.pull("mainPlayer", x, y, {
                spritewidth : 72,
                spriteheight : 98,
                isMP : true
            });

            me.game.world.addChild(obj, 4);

            return obj;
        });
    },

    /**
     *  action to perform on state change
     */
    onDestroyEvent: function() {

        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);

        // stop some music
        me.audio.stopTrack("dst-gameforest");
    }
});
