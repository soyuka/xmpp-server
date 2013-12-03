var db = require("seraph")("http://localhost:7474"), _ = require('underscore');

/**
 * User Model
 * @param {Object} user
 * @see event "register" node-XMPP
 */
var User = function(user) {
    this.jid = user.jid;
    this.id = user.id;
    this.attrs = {
        username : user.username,
        password : user.password //md5 TODO implementation
    }
};

User.prototype.delete = function(done) {
    db.delete(this.id, done);
};


User.prototype.save = function(done) {

    var self = this,
        user = _.extend(this.attrs, {jid : this.jid});

    db.save(user, function(err, node) {
        self.id = node.id;
        done(err, node);
    });

};

 /**
 * Register
 * @param  {Object}   user (username, password, jid, Client)
 * @return  {Function} cb   (err)
 */
User.register = function(user, done) {
    db.find({jid : user.jid}, function(err, nodes) {
        if(nodes.length)
            done("There is already a user with that jid");
        else {
            user = new User(user);
            user.save(done);
        }
    });
    
};

User.authenticate = function(user, done) {
    db.find({jid : user.jid}, function(err, nodes) {
        if(err)
            done(err);
        else if (nodes.length == 1 && user.password === nodes[0].password)
            done(null);
        else
            done("Authentication failure");
    });
}; 

module.exports = User;