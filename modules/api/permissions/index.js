const rolesModel = require('../users/rolesModel');

var assignPermission = (req, res, next) => {
	if (req.session.user) {
		rolesModel.findOne({"role": req.session.user.role})
		.then(result => {
			req.permissions = result.permissions;
			next();
		});
	}
	else {
		rolesModel.findOne({"role": "guest"})
		.then(result => {
			req.permissions = result.permissions;
			next();
		});
	}
};

module.exports = {
	assignPermission
};