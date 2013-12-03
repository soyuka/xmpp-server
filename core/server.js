var xmpp        = require('node-xmpp');


exports.run = function(config, ready) {
    var server = new xmpp.C2SServer(config);

    //server.registerSaslMechanism('DIGEST-MD5'); // XOAuth2, XFacebookPlatform, External, Anonymous

    var Router = require('./router')(server, config);
    
    /** Modules **/
	var Modules = require('../modules')(server, config);

    //Waiting for a proper logger, atm using this
    server.logger = require(config.root + '/lib/logger')(config);

    ready(server);
}