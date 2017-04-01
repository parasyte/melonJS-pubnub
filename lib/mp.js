var Multiplayer = me.Object.extend({
    init : function (new_player) {
        this.pubnub = new PubNub({
            publish_key   : "pub-c-738e5365-daf9-46f1-b8ce-d1689952487e",
            subscribe_key : "sub-c-498f9a6c-1676-11e7-aca9-02ee2ddab7fe"
        });

        this.new_player = new_player;

        // Record my UUID, so I don't process my own messages
        this.UUID = PubNub.generateUUID();

        // Listen for incoming messages
        this.pubnub.addListener({
            message : this.handleMessage.bind(this)
        });

        this.pubnub.subscribe({
            channels : [ "melonJS-pubnub" ]
        });
    },

    handleMessage : function (msg) {
        // Did I send this message?
        if (msg.UUID === this.UUID)
            return;

        // Get a reference to the object for the player that sent this message
        var obj = me.game.world.getChildByName(msg.UUID);
        if (obj.length) {
            obj = obj[0];
        }
        else {
            obj = this.new_player(50, 50);
            obj.name = msg.UUID;
        }

        // Route message
        switch (msg.action) {
        case "update":
            // Position update
            obj.body.pos.setV(msg.pos);
            obj.body.vel.setV(msg.vel);
            break;

        // TODO: Define more actions here
        }
    },

    sendMessage : function (msg) {
        msg.UUID = this.UUID;

        this.pubnub.publish({
            channel : "melonJS-pubnub",
            message : msg
        });
    }
});
