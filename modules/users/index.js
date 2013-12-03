
module.exports = function(server, config) {
    var User = require(config.root + '/lib/redis-user');

    //On Connect event. When a client connects.
    server.on("connect", function(client) {

        client.on("authenticate", User.authenticate);

        client.on("register", User.register);
    });

    // On Disconnect event. When a client disconnects
    server.on("disconnect", function(client) {
    	console.log(client,"logout");
    });
}