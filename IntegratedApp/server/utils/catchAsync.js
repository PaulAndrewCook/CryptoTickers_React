//middleware to catch any async function errors thrown and send to error page

export default (func) => {
	return (req, res, next) => {
		func(req, res, next).catch(next);
	};
};
