var xmpp = require('node-xmpp');
var ltx = require('ltx');

// XEP-0092: Software Version
// http://xmpp.org/extensions/xep-0092.html

module.exports = function(server, config) {
    config = config.version;
    
    server.on('connect', function(client) {
        client.on('stanza', function(stz) {
            var query = null;
            var stanza = ltx.parse(stz.toString());
            if (stanza.is('iq') && (query = stanza.getChild('query', "jabber:iq:version"))) {
                stanza.attrs.type = "result";
                stanza.attrs.to = stanza.attrs.from;
                delete stanza.attrs.from;

                // Actual version attributes
                if(typeof(config.name) === "undefined") {
                    query.c("name").t(defaults.name);
                }
                else {
                    query.c("name").t(config.name);
                }

                if(typeof(config.version) === "undefined") {
                    query.c("version").t(defaults.version);
                }
                else {
                    query.c("version").t(config.version);
                }

                if(typeof(config.os) === "undefined") {
                    query.c("os").t(defaults.os);
                }
                else {
                    query.c("os").t(config.os);
                }
                client.send(stanza);
            }
        });
    });
}

