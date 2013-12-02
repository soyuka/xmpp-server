var User = require('./user');


module.exports = function(server, config) {

    //On Connect event. When a client connects.
    server.on("connect", function(client) {

        client.on("authenticate", function(opts, cb) {
            User.find(opts.jid, function(user) {
                if (user && user.attrs.password === opts.password)
                    cb();
                else
                    cb(new Error("Authentication failure"));
            });
        });

        // Allows the developer to register the jid against anything they want
        client.on("register", function(opts, cb) {
            User.register(opts.jid, opts.password, {
                success: function(user) {
                    cb();
                },
                error: function(error) {
                    var err = new Error(error);
                    err.code = 409;
                    err.type = "cancel";
                    cb(err);
                }
            });
        });
    });

    // On Disconnect event. When a client disconnects
    server.on("disconnect", function(client) {
    	console.log(client,"logout");
    });
}