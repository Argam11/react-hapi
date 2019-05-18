import Hapi from 'hapi';
import Inert from 'inert';

const Boom = require('boom');

import AuthRoute from './routes/Auth.jsx';
import Companies from './routes/companies.jsx';

const configJWT = require('./config/jwt');

require('dotenv').config({
	path: __dirname + '/.env'
});

const init = async () => {
	const server = new Hapi.Server({
		port: 8000,
		port: 8000,
		host: 'localhost',
		routes: {
			cors: true,
			validate: {
				failAction: async (request, h, err) => {
					if (process.env.NODE_ENV === 'production') {
						// In prod, log a limited error message and throw the default Bad Request error.
						console.error('ValidationError:', err.message); // Better to use an actual logger here.
						throw Boom.badRequest(`Invalid request payload input`);
					} else {
						// During development, log and respond with the full error.
						throw err;
					}
				}
			}
		}
	});

	// jwt
	await server.register([ require('hapi-auth-jwt2'), Inert ]);
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
		AuthRoute,
		...Companies
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
