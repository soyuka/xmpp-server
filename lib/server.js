var xmpp        = require('node-xmpp');

exports.run = function(config, ready) {
    var server = new xmpp.C2SServer(config);

    var Router = require('./router')(server, config);
    
    /** Modules **/
	var Modules = require('../modules')(server, config);

    // This is a callback to trigger when the server is ready. That's very useful when running a server in some other code.
    // We may want to make sure this is the right place for it in the future as C2S and S2S may not be abll ready.

    ready(server);
}