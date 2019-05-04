import Hapi from 'hapi';

import AuthRoute from './routes/Auth.jsx';
const configJWT = require('./config/jwt');

const init = async () => {
	const server = new Hapi.Server({
		port: 8000,
		host: 'localhost',
		routes: {
			cors: true
		}
	});

	// jwt
	await server.register(require('hapi-auth-jwt2'));
	server.auth.strategy('jwt', 'jwt', configJWT);
	server.auth.default('jwt');

	server.route([
		{
			method: 'GET',
			path: '/',
			config: { auth: false },
			handler: function(request, h) {
				return 'Home page!';
			}
		},
		AuthRoute
	]);
	await server.start();
	return server;
};

init()
	.then((server) => {
		console.log('Server running at:', server.info.uri);
	})
	.catch((error) => {
		console.log(error);
	});
