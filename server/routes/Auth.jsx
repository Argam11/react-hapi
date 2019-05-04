const auth = require('../controllers/Auth.jsx');

module.exports = {
	method: 'POST',
	path: '/login',
	config: {
		auth: false
	},
	handler: async function(request, h) {
		return auth(request, h);
	}
};
