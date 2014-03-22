/**
 * tracer.use must be called after all middleware but before router.
 */
exports.use = function(app, config) {
	
	console.log('Loading Express tracer midleware');
	
	app.use(function(req, res, next) {
		
		console.log('------ Tracer : Request for  ' + req.path);
		console.log('------ Tracer : Params ' + req.params);
		console.log('------ Tracer : Body ' + JSON.stringify(req.body));
		console.log('------ Tracer : Cookies ' + JSON.stringify(req.cookies));
		console.log('------ Tracer : Session ' + JSON.stringify(req.session));

		next();
	});
};