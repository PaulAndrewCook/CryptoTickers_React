import Ticker from '../models/stocks.js'; //Ticker Model
import Markets from '../models/markets.js'; //markets Model
import User from '../models/user.js'; //user model
import { updateTickers, makeTics, indexTics } from '../public/js/ticDataFetch.js'; //js functions for updating tics
import { marketFetch } from '../public/js/marketFetch.js'; //js functions for updating market data
import ccxt from 'ccxt'; //crypto api
import { DateTime } from 'luxon';
import flash from 'connect-flash'; //flash update for screen updates

import pkg from 'joi';
const { boolean } = pkg;

////////// API Endpoints ////////////////

//Main route for displaying default tickers
//Find default tics, send to DOM, update DOM with new API call
export const APIindex = async (req, res) => {
	const ticker = await indexTics();
	Promise.all([
		updateTickers(ticker)
	]).then(async (ticker) => {
		res.json({ tickers: ticker.flat(1), user: null });
	});
};

//Create new ticker from NONuser selection
export const APIcreateNewTicker = async (req, res) => {
	// console.log('in API controller: coming from react: query', req.query, 'body', req.body, 'params', req.params);

	const tic = JSON.parse(req.query.ticker);
	const { user } = JSON.parse(req.query.user);
	const symbol = tic.symbol;

	const currency = [
		{ exchange: 'binance', symbol: symbol, crypto: true }
	];

	// const userId = '606bdf2554204c4a7270a8bc';
	const userId = user ? user._id : '606bdf2554204c4a7270a8bc';

	const { ticker } = await makeTics(userId, currency);

	Promise.all([
		updateTickers(ticker)
	]).then(async (ticker) => {
		console.log('in API controller: Coming Back: ticker', ticker);
		res.json(ticker.flat(1));
	});
};

//Find all current tickers and update the data - is called from React
export const APIupdateTics = async (req, res) => {
	var tickers = [];
	// console.log('in API controller: coming from react: query', req.query.tickers, 'length', req.query.tickers.length);
	for (var i = 0; i < req.query.tickers.length; i++) {
		tickers.push(JSON.parse(req.query.tickers[i]));
	}

	Promise.all([
		updateTickers(tickers)
	]).then(async (ticker) => {
		res.json(ticker.flat(1));
	});
};

//Edit and update current tic with by having user select new info
export const APIeditTicker = async (req, res) => {
	// console.log('in API controller: coming from react: query', req.query, 'body', req.body, 'params', req.params);
	const id = req.query.id;
	const symbol = req.query.ticker;
	// const { id } = req.params; //Deconsturcting params
	const currency = [
		{ exchange: 'binance', symbol: symbol, crypto: true }
	];
	const ticker = await Ticker.findByIdAndUpdate(id, { $set: { symbol: symbol } }, { new: true });

	Promise.all([
		updateTickers(ticker)
	]).then(async (ticker) => {
		res.json(ticker.flat(1));
	});
};

//Personalized page for displaying user tickers
//find user (required), find user's tickers, send tickers to DOM, update DOM
export const APIhome = async (req, res) => {
	const { username } = req.query;
	console.log('in apihome', username);
	const [
		user
	] = await User.find({ username: username });
	var ticker = await Ticker.find({ creator: user._id });

	if (ticker && !ticker.length) {
		ticker = await indexTics();
	}
	Promise.all([
		updateTickers(ticker)
	]).then(async (ticker) => {
		res.json({ user, tickers: ticker.flat(1) });
	});
};

//delete a ticker and stay on same page
//find desired ticker to delete, remove from user's model and ticker model
export const APIdeleteTicker = async (req, res) => {
	const id = req.query.id;
	const userId = req.query.userId;
	var tickers = await Ticker.findByIdAndDelete(id);

	const user = await User.findByIdAndUpdate(userId, { $pull: { tickers: id } }, { new: true }); //pull the deleted ticker from the user's saved ticker
	res.json({ user });
};

///////////////END API ROUTES////////////////

//Find all current tickers and update the data - is called from the DOM and back end
export const updateTics = async (req, res) => {
	const tickers = JSON.parse(req.body.tickers);
	Promise.all([
		updateTickers(tickers)
	]).then(async (ticker) => {
		res.json(ticker.flat(1));
	});
};

//Main route for displaying default tickers
//Find default tics, send to DOM, update DOM with new API call
export const index = async (req, res) => {
	const ticker = await indexTics();
	const pageName = 'welcome';
	let updateTics = true;
	res.render('investments/index', { ticker, updateTics, pageName });
};

//Create the markets for each exchange so we can display exchange specific tickers
//Find desired markets, send symbols to NEW route
export const markets = async (req, res) => {
	await marketFetch();
	const markets = await Markets.find({});

	req.flash('success', `There are ${markets.length} markets!`);
	res.redirect('/investments');
};

//Personalized page for displaying user tickers
//find user (required), find user's tickers, send tickers to DOM, update DOM
export const home = async (req, res) => {
	const userID = req.user._id;
	const ticker = await Ticker.find({ creator: userID });

	var k = 0;
	const pageName = 'home';
	for (let tic of ticker) {
		if (tic != null) {
			k++;
		}
	}
	let updateTics = k > 0 ? true : false;
	res.render('investments/index', { ticker, updateTics, pageName });
};

//Load default / preloaded tickers if desired by user
export const defaultHome = async (req, res) => {
	const userID = req.user._id;
	const loadDefault = req.body.loadDefault;

	const { tics } = await makeTics(userID);

	const ticker = await updateTickers(tics);
	const pageName = 'home';
	let updateTics = true;
	res.render('investments/index', { ticker, updateTics, pageName });
};

//New ticker info selection page
//Find loaded market data for symbols, enable user to select exchange and market desired
export const renderNewTicker = async (req, res) => {
	const markets = await Markets.find({});
	const pageName = 'new';
	res.render('investments/new', { markets, pageName });
};

//Create new ticker from user selection
export const createNewTicker = async (req, res) => {
	const currency = [
		req.body.currency
	];
	const userId = req.user._id;
	const { ticker } = await makeTics(userId, currency);

	req.flash('success', 'Successfully made a new ticker!');
	res.redirect(`/investments/${ticker._id}`);
};

//Display new ticker
//Get new ticker, display solo new ticker
export const showTicker = async (req, res, next) => {
	const tickers = await Ticker.findById(req.params.id); //needs reveiws to work to populate reviews

	const ticker = await updateTickers(tickers);

	if (!ticker) {
		req.flash('error', 'Ticker Not Found!');
		return res.redirect('/investments');
	}
	const pageName = 'new';
	let updateTics = true;
	res.render('investments/show', { ticker, pageName });
};

//Show edit form, similar to show page, but with edit buttons
export const renderEditForm = async (req, res) => {
	const ticker = await Ticker.findById(req.params.id);
	const markets = await Markets.find({});
	const pageName = 'edit';
	res.render(`investments/edit`, { ticker, markets, pageName });
};

//Edit and update current tic with by having user select new info
export const editTicker = async (req, res) => {
	const { id } = req.params; //Deconsturcting params
	const ticker = await Ticker.findByIdAndUpdate(id, { ...req.body.currency });
	req.flash('success', 'Successfully updated ticker!');
	res.redirect(`/investments/${ticker._id}`);
};

//delete a ticker and stay on same page
//find desired ticker to delete, remove from user's model and ticker model
export const deleteTicker = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;
	await Ticker.findByIdAndDelete(id);

	await User.findByIdAndUpdate(userId, { $pull: { tickers: id } }); //pull the deleted ticker from the user's saved ticker
	req.flash('success', 'Successfully deleted a ticker!');
	res.redirect('/investments/home');
};
