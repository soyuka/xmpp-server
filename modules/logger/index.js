var xmpp = require('node-xmpp');

/**
 * @see  http://xmpp.org/extensions/xep-0160.html
 */
 //client.socket.remoteAddress, client.streamId

module.exports = function(server, config) {
    config = config.log;

    var logger = require('./nlogger'), c = logger.logger("Client", config), s = logger.logger("Server", config);

    // Config contains the configuration for the logger facility!
    // The logger relies purely on events... 
    // From there, we can access and listen to events on all objects linked to that server, including the router, the session manager, the S2S router, the connections... etc.
    server.on("connect", function(client) {
        c.debug("Connected");

        client.on('session-started', function() {
            c.debug("Session-started");
        });

        client.on('authenticate', function(opts) {
            c.debug('Authenticate');
        });

        client.on('auth-success', function(jid) {
            c.debug("Auth-success", jid);
        });

        client.on('auth-failure', function(jid) {
            c.debug("Auth Failure " + jid);
        });

        client.on("register", function(opts, cb) {
            c.debug("Register");
        });

        client.on('registration-success', function(jid) {
            c.debug("Registration Success " + jid);
        });

        client.on('registration-failure', function(jid) {
            c.debug("Registration Failure " + jid);
        });

        client.on('online', function() {
            c.debug("Online " + client.jid);
        });

        client.on('stanza', function(stanza) {
            c.debug("Stanza", stanza);
        });

        client.on('disconnect', function() {
            c.debug("Disconnect");
        });
    });
    
    server.on("s2sReady", function(s2s) {
        s.info("S2S Ready");
        s2s.on("newStream", function(stream) {
            console.log("New Stream");
        });
    });
    
    server.on("c2sRoutersReady", function(router) {
        s.info("C2S Router ready");
       // debug('server', null, "C2S Router Ready");
    });

    server.on("ready", function(config) {
        s.info("Server is now ready on host", config.domain, "and listening on port", config.port);
    })
    
}
