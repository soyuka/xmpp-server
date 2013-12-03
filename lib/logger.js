//Logger is not definitive, waiting for node-xmpp-server logger :)
module.exports = function(config) {
	var level  = !config.log ? 6 : config.log
	  , logger = require('caterpillar').createLogger({level : level})
	  , filter = require('caterpillar-filter').createFilter()
	  , human  = require('caterpillar-human').createHuman();

	// Pipe logger output to filter, then filter output to stdout
	logger.pipe(filter).pipe(human).pipe(process.stdout);

	return _.extend(logger, {
		debug : function() {
			var args = __slice.call(arguments);
		    args.unshift('debug');
		    return this.log.apply(this, args);
		},
		error : function() {
			var args = __slice.call(arguments);
		    args.unshift('error');
		    return this.log.apply(this, args);
		},
		warn : function() {
			var args = __slice.call(arguments);
		    args.unshift('warn');
		    return this.log.apply(this, args);
		},
		info : function() {
			var args = __slice.call(arguments);
		    args.unshift('info');
		    return this.log.apply(this, args);
		}
	});

};