import { investmentsSchema } from './schemas.js'; //Joi schema for linking databases
import AppError from './utils/appError.js'; //Error handler for text input
import Ticker from './models/stocks.js'; //Ticker Model
import User from './models/user.js'; // user Model
import { updateTickers, makeTics } from './public/js/ticDataFetch.js'; //js functions for updating tics

//check to see if user is logged in
export const isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash('error', 'You must be signed in to do that!');
		return res.redirect('/login');
	}
	next();
};

//make sure form data is valid data
export const validateInput = (req, res, next) => {
	const { error } = investmentsSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

//check to see if user created the tickers being displayed
export const isAuthor = async (req, res, next) => {
	const { id } = req.params;
	const userId = req.user._id;
	const ticker = await Ticker.findById(id);
	if (!ticker.creator.equals(userId)) {
		req.flash('error', 'You do NOT have permission to do that!');
		res.redirect(`/investments/${id}`);
	}
	next();
};

//check to see if user is an admin
export const isAdmin = async (req, res, next) => {
	const { _id } = req.user;
	const user = await User.findById(_id);
	if (!user.isAdmin) {
		req.session.returnTo = req.originalUrl;
		req.flash('error', 'You do NOT have permission to do that!');
		return res.redirect(`/investments`);
	}
	next();
};

//trys to get path of route
//currently not in use
export const pathName = async (req, res, next) => {
	const pathName = req.path.replace(/\//g, 'status');
	next();
};

//Original fn to test connection from Node
export const bgUpdate = async (req, res, next) => {
	try {
		Promise.all(
			[
				// getTics() this does not seem to be calling anything?
			]
		)
			.then(async (tickers) => {
				return (ticker = await updateTickers(tickers));
			})
			.then(async (ticker) => {
				console.log('tickers returned from promise land');
			});
	} catch (e) {
		console.log('Error in Middleware');
		console.log(e);
	}
	next();
};
