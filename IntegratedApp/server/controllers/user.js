import User from '../models/user.js';

//API Endpoints for USER Login, register, and logout
// Exports to routes/user
export const APIregister = async (req, res, next) => {
	try {
		const { email, username, password } = JSON.parse(req.query.user);
		const user = new User({ email, username });
		const regisUser = await User.register(user, password);

		req.login(regisUser, (err) => {
			if (err) return next(err);
		});
		res.json({
			success  : `Welcome to your Investments, ${regisUser.username}!`,
			email    : regisUser.email,
			username : regisUser.username
		});
	} catch (e) {
		res.json({ error: e });
	}
};

export const APIlogin = async (req, res) => {
	try {
		console.log(
			'in User controller: coming from react: query',
			req.query,
			'body',
			req.query.username,
			'params',
			req.query.password
		);
		const { username } = req.query;
		const user = await User.find(username);

		res.json({
			success  : `Welcome to your Investments, ${user.username}!`,
			username : user.username
		});
	} catch (error) {
		res.json({ error });
	}
};

export const APIlogout = async (req, res, next) => {
	req.logout();
	next();
};

//// END API FNs /////////

export const renderRegister = (req, res) => {
	const pageName = 'register';
	res.render('users/register', { pageName });
};

export const register = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const regisUser = await User.register(user, password);
		req.login(regisUser, (err) => {
			if (err) return next(err);
		});
		req.flash('success', `Welcome to your Investments, ${regisUser.username}!`);
		res.redirect('/investments');
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('register');
	}
};

export const renderLogin = (req, res) => {
	const pageName = 'register';
	res.render('users/login', { pageName });
};

export const login = (req, res) => {
	req.flash('success', `Welcome back ${req.body.username}`);
	const redirectUrl = req.session.returnTo || '/investments/home';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

export const logout = (req, res) => {
	req.logout();
	req.flash('success', 'Goodbye! See you again soon!');
	res.redirect('/investments');
};
