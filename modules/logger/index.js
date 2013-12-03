var xmpp = require('node-xmpp');

/**
 * @see  http://xmpp.org/extensions/xep-0160.html
 */
 //client.socket.remoteAddress, client.streamId

module.exports = function(server, config) {

    // Config contains the configuration for the logger facility!
    // The logger relies purely on events... 
    // From there, we can access and listen to events on all objects linked to that server, including the router, the session manager, the S2S router, the connections... etc.
    server.on("connect", function(client) {
        server.logger.log("debug", "Connected");

        client.on('session-started', function() {
            server.logger.log("debug", "Session-started");
        });

        client.on('authenticate', function(opts) {
            server.logger.log("debug", 'Authenticate');
        });

        client.on('auth-success', function(jid) {
            server.logger.log("debug", "Auth-success", jid);
        });

        client.on('auth-failure', function(jid) {
            server.logger.log("debug", "Auth Failure " + jid);
        });

        client.on("register", function(opts, cb) {
            server.logger.log("debug", "Register");
        });

        client.on('registration-success', function(jid) {
            server.logger.log("debug", "Registration Success " + jid);
        });

        client.on('registration-failure', function(jid) {
            server.logger.log("debug", "Registration Failure " + jid);
        });

        client.on('online', function() {
            server.logger.log("debug", "Online " + client.jid);
        });

        client.on('stanza', function(stanza) {
            server.logger.log("debug", "Stanza", stanza);
        });

        client.on('disconnect', function() {
            server.logger.log("debug", "Disconnect");
        });
    });
    
    server.on("s2sReady", function(s2s) {
        server.logger.log("debug", "S2S Ready");
        s2s.on("newStream", function(stream) {
            console.log("New Stream");
        });
    });
    
    server.on("c2sRoutersReady", function(router) {
        server.logger.log("debug", "C2S Router ready");
       // debug('server', null, "C2S Router Ready");
    });

    server.on("ready", function(config) {
        server.logger.debug("Server is now ready on host", config.domain, "and listening on port", config.port);
    })
    
}
