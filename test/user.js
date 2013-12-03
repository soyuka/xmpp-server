var should = require('should'), User = require("../lib/user.js"), _ = require('underscore');

var user = {
	jid : 'kaka@localhost',
	password : 's3cr3t',
	username : 'me'
}


describe('User', function(){
  describe('#register()', function(){
    it('should register without error', function(done){
        User.register(user, function(err, node) {
        	user = _.extend(user, node); //adding id to user for later
        	done(err);
        });
    });

    it('should register with error because user exists', function(done){
        User.register(user, function(err, node) {
        	err.should.not.be.empty;
        	done(null);
        });
    });
  });
});


describe('User', function(){
  describe('#authenticate()', function(){
  	it('should authenticate without error', function(done){
        User.authenticate(user, done);
    });

    it('should authenticate with error', function(done){
        User.authenticate(_.extend(user, {password : 'secret'}), function(err) {
        	err.should.not.be.empty;
        	done(null);
        });
    });
  });
});

describe('User', function(){
  describe('#delete()', function(){
    it('should delete user with no error', function(done){
    	var u = new User(user);
        u.delete(done);
    });
  });
});

describe('User', function(){
  describe('#authenticate()', function(){
    it('should authenticate with error because user does not exists', function(done){
        User.authenticate(user, function(err) {
        	err.should.not.be.empty;
        	done(null);
        });
    });
  });
});