var _ = require('underscore'), path = require('path'), fs = require('fs');

module.exports = function(server, config) {
	var modules = _.map(
					fs.readdirSync( __dirname )
				  , function(m) { 
				  		var absolute = path.join( __dirname, m );
				  		return {
				  					dir : absolute, 
				  					name : m, 
				  					stats : fs.statSync( absolute )
				  				} 
				  	}
				  );

	_.each(modules, function(module) {
		if (module.stats.isDirectory())
			require(module.dir)(server, config);
	});
}