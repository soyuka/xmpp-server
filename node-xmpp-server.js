var server = require('./core/server')
  , _ = require('underscore')
  , jf = require('jsonfile')
  , config = jf.readFileSync("./config.json");

  config = _.extend(config, 
  			{
  				root : __dirname,
  				version : {
  					name : "XMPP-server Node.js",
  					version : "0.0.0",
  					os : require('os').platform()
  				}
  			}
  		);

server.run(config, function(server) {
	server.emit("ready", config);
});
