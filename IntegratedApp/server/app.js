//do not send the env file if going to production
// if (process.env.NODE_ENV !== 'production') {
// 	require('./.env').config();
// }

//some code for possible update of relative paths
// import {fileURLToPath} from 'url'
// import {dirname} from 'path'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

import express from 'express'; // back end web application framework for Node.js
import path from 'path'; //provides utilities for working with file and directory paths
import mongoose from 'mongoose'; //enable easy use of mongoDB
import cors from 'cors'; //enable CORS with various options for api calls
import methodOverride from 'method-override'; //middleware function to override the req. method property with a new value
import ejsMate from 'ejs-mate'; //Hangle the ejs rendering of our pages
import flash from 'connect-flash'; //flash update for screen updates
import session from 'express-session'; //browser cookie storage and enable flash
import MongoStore from 'connect-mongo'; //For connecting databases for deployment
import cookieParser from 'cookie-parser'; //browser cookie generage and reading
import passport from 'passport'; //progam to help with user auth
import LocalStrategy from 'passport-local'; //email and password login on local machine
import mongoSanitize from 'express-mongo-sanitize'; //package to block mongo injection secuirty issues
import helmet from 'helmet'; //helps secure app from easy security leaks

import AppError from './utils/appError.js'; //Error wrapper for dealing with errors thrown by the routes
import User from './models/user.js'; //user model
import * as investmentRoutes from './routes/investments.js'; //seperate out the routes to a different file
import * as userRoutes from './routes/user.js'; //seperate out the User routes to a different file

//mongoose connection to server and setup
//local host: 'mongodb://localhost:27017/ticker' or mongo database url
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/ticker';
mongoose.connect(dbUrl, {
	useNewUrlParser    : true,
	useCreateIndex     : true,
	useUnifiedTopology : true,
	useFindAndModify   : false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
	console.log('Database connected');
});

//setup the express app
const app = express();

app.engine('ejs', ejsMate); //how to render the html pages
app.set('view engine', 'ejs');
const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views')); //shortens path routing names

app.use(express.urlencoded({ extended: true })); //parse body
app.use(methodOverride('_method')); //enables sending to put routes via POST
app.use(express.static(path.join(__dirname, 'public'))); //Public Directory - Error - validate forms says good when blocked

const secret = process.env.SECRET || 'makearealsecretlater';

app.use(
	session({
		name              : 'cryptotickers',
		secret,
		resave            : false,
		saveUninitialized : true,
		store             : MongoStore.create({
			mongoUrl   : dbUrl,
			touchAfter : 24 * 3600 // time period in seconds
		})
	})
); //connect and save users on mongo atlas via heroku

app.use(flash()); //Provide way to send alerts to users via middleware
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize()); //make sure users can't easily send malicious code via scripts in input
app.use(
	cors({
		credentials : true
	})
); //enable calls to the APIs
app.options('*', cors()); //heading setting that allows Access-Control-Allow-Origin server access

//whitelist apis and links
const scriptSrcUrls = [
	'https://stackpath.bootstrapcdn.com/',
	'https://kit.fontawesome.com/',
	'https://cdnjs.cloudflare.com/',
	'https://cdn.jsdelivr.net',
	'https://cdn.jsdelivr.net/npm/ccxt@1.48.25/dist/ccxt.browser.js',
	'https://unpkg.com/axios/dist/axios.min.js',
	'https://code.jquery.com/jquery-3.3.1.slim.min.js'
];
const styleSrcUrls = [
	'https://kit-free.fontawesome.com/',
	'https://stackpath.bootstrapcdn.com/',
	'https://fonts.googleapis.com/',
	'https://use.fontawesome.com/',
	'https://cdn.jsdelivr.net'
];
const connectSrcUrls = [];
const fontSrcUrls = [];
app.use(
	helmet.contentSecurityPolicy({
		directives : {
			defaultSrc : [],
			connectSrc : [
				"'self'",
				...connectSrcUrls
			],
			scriptSrc  : [
				"'unsafe-inline'",
				"'self'",
				...scriptSrcUrls
			],
			styleSrc   : [
				"'self'",
				"'unsafe-inline'",
				...styleSrcUrls
			],
			workerSrc  : [
				"'self'",
				'blob:'
			],
			objectSrc  : [],
			imgSrc     : [
				"'self'",
				'blob:',
				'data:',
				// 'https://res.cloudinary.com/douqbebwk/', //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
				'https://images.unsplash.com/'
			],
			fontSrc    : [
				"'self'",
				...fontSrcUrls
			]
		}
	})
);

//Auth user for entire sessions
app.use(passport.initialize());
app.use(passport.session()); //store user info to keep them logged in
passport.use(new LocalStrategy(User.authenticate())); //is user password and email combo valid

passport.serializeUser(User.serializeUser()); //how to store and unstore user's sessions
passport.deserializeUser(User.deserializeUser());

//Flash create middleware to use the flash alert
app.use((req, res, next) => {
	res.locals.updateTics = false;
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

//Route Paths
app.use('/investments', investmentRoutes); //use the investments routes
app.use('/', userRoutes); //use the user routes
// app.use('/crypto', cryptoRoutes); //use the crypto routes

//home page route
app.get('/', (req, res) => {
	res.render('home');
});

//error handling wrapper for each of the routes
app.all('*', (req, res, next) => {
	next(new AppError('Page not found', 404));
});

//handle errors from app
app.use((err, req, res, next) => {
	console.log(err);
	const { status = 500 } = err;
	if (!err.message) err.message = `Something went wrong: Please go back and try again.`;
	res.status(status).render('error', { err });
});

//App connection route
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
