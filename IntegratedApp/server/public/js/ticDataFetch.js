import User from '../../models/user.js'; //user model
import Ticker from '../../models/stocks.js'; //Ticker Model
import Markets from '../../models/markets.js'; //markets Model
import ccxt from 'ccxt'; //crypto api - create all tic data
import { v4 as uuidv4 } from 'uuid';
import { port } from '../../app.js';
import { DateTime } from 'luxon'; //convert date and time of tic into usable info
import NODE_ICU_DATA from 'full-icu'; //for luxon - datetime-> to get local timezone

//create the new tickers, push them into array, save id to user, and return object with both single and array tics
export const makeTics = async (userId, baseTics) => {
	const tickers = baseTics ? baseTics : await defaultTics();

	var tics = [];
	var ticker = {};

	for await (let tic of tickers) {
		ticker = new Ticker(tic);
		ticker.creator = userId;
		await ticker.save();
		const { id } = ticker;

		const user = await User.findByIdAndUpdate(
			userId,
			{ $push: { tickers: id } },
			{ safe: true, upsert: true, useFindAndModify: false }
		);
		tics.push(ticker);
	}
	return { ticker, tics };
};

//optional tics for the home page
async function defaultTics() {
	const tics = [
		{ exchange: 'binance', symbol: 'BTC/USDT', crypto: true },
		{ exchange: 'kraken', symbol: 'ETH/USDT', crypto: true },
		{ exchange: 'kraken', symbol: 'ADA/USDT', crypto: true },
		{ exchange: 'binance', symbol: 'CELO/USDT', crypto: true }
	];
	var tickers = [];
	for (let i = 0; i < tics.length; i++) {
		await tickers.push(new Ticker(tics[i]));
	}
	return tickers;
}

//the default tickers for the index page, so we don't create them each time.
export const indexTics = async () => {
	return new Promise(async (resolve, reject) => {
		//Mongo Atlas tickers
		const productionIndex = [
			'6083508e58dc46845fd96f16',
			'608350f758dc46845fd96f17',
			'6083513058dc46845fd96f18',
			'6083516358dc46845fd96f19',
			'608351a858dc46845fd96f1b'
		];
		//localhost tickers
		const localIndex = [
			'6100623f0f41c4279a3bb8fa',
			// '607a09bbca201219560f36d6',
			'6100627c0f41c4279a3bb903',
			'6142a45f4b34ee4beabc35fc',
			'610062cc0f41c4279a3bb915'
		];
		const index = port === 8000 ? localIndex : productionIndex;
		var tickers = [];
		for await (let item of index) {
			var tics = await Ticker.findByIdAndUpdate({ _id: item });
			tickers.push(tics);
		}
		resolve(tickers);
	});
};

//Takes in ticker Symbol, outputs ticker data
export const updateTickers = async (ticker) => {
	const tickerObj = [];
	const exc = 'binance';
	if (!Array.isArray(ticker)) {
		ticker = [
			ticker
		];
	}
	//make sure the promise ticker has the right dimensions
	ticker = ticker.flat(1);

	console.log('in datafetch: ticker', ticker);
	//can this be moved to seperate fn to only be called once per user?
	const exchange = await ticker.map((tic) => {
		return tic.crypto
			? new ccxt[tic.exchange]({
					enableRateLimit : true
				})
			: new ccxt[exc]();
	});

	// (async () => {
	// 	await exchange.loadMarkets();
	// 	let symbols = exchange.symbols;
	// 	console.log('in datafetch: symbols', symbols);
	// }) ()

	// fetch('https://worldtimeapi.org/api/ip')
	// 	.then((response) => response.json())
	// 	.then((data) => console.log('worldtime api', data.dst, data.datetime));

	//this is were magic happens - exchange data into tic model and save
	const tickers = await awaitAll(exchange, ticker, fetchTic)
		.then((tickers) => {
			for (let i = 0; i < tickers.length; i++) {
				delete tickers[i].info;
				let market = { exchange: tickers[i].exchange, id: ticker[i]._id };
				if (!tickers[i].change) {
					if (tickers[i].last && tickers[i].open) {
						tickers[i].change = tickers[i].last - tickers[i].open;
					} else {
						tickers[i].change = 0.0;
						tickers[i].percentage = 0.0;
					}
				}
				if (!tickers[i].percentage) {
					tickers[i].percentage = tickers[i].change / tickers[i].last * 100;
				}
				if (!tickers[i].key) {
					tickers[i].key = uuidv4();
				}
				//This instance of dateTime returns server time (UTC), we use client time by running this process in the DOM
				let { datetime } = tickers[i];
				let dt = DateTime.fromISO(datetime);
				let timeMerge = {
					time : dt.toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET),
					date : dt.toLocaleString(DateTime.DATE_MED)
				};
				tickerObj[i] = { ...market, ...timeMerge, ...tickers[i] };
			}
			console.log('coming from build route, tickerObj', tickerObj);
			return tickerObj;
		})
		.then(async (tickerObj) => {
			let tickers = await saveTics(tickerObj);
			return tickers;
		});

	// if (!Array.isArray(tickers)) {
	// 	tickers = [
	// 		tickers
	// 	];
	// }
	// //trying to catch errors if tics are not made - does not work though
	// if (ticker.length != tickers.length) {
	// 	const { redtics, deletedTics } = checkTics(tickers);
	// 	tickers = redtics;
	// }
	return tickers;
};

//variable length promise call holder
async function awaitAll(list, item, asyncFn) {
	const promises = [];
	for (let i = 0; i < list.length; i++) {
		promises.push(asyncFn(list[i], item[i]));
	}
	return Promise.all(promises);
}

//get current tic data from exchange
async function fetchTic(exchange, ticker) {
	try {
		let market = { exchange: ticker.exchange };
		var tic = await exchange.fetchTicker(ticker.symbol);
		return { ...market, ...tic };
	} catch (e) {
		console.error(e);
		return ticker;
	}
}

//save tics into model Ticker
async function saveTics(tickerObj) {
	try {
		var ticker = [];
		for await (let tic of tickerObj) {
			try {
				// const { id } = tic;

				const tempTic = await Ticker.findByIdAndUpdate(
					{ _id: tic.id },
					{ ...tic },
					{ new: true, useFindAndModify: false }
				);
				if (tempTic) {
					ticker.push(tempTic);
				} else ticker.error.push(tic);
				console.log('inside savetics, ticker', ticker, 'tic', tic);
			} catch (err) {
				console.log('Error in saving tic');
				console.log(tic, err);
				// console.error(err);
				continue;
			}
		}

		return ticker; //should this be Ticker (the model?)
	} catch (err) {
		return err;
	}
}

//try and remove tics that were not properly made as they break app
async function checkTics(tickers) {
	const deletedTics = [];
	for (let i = 0; i < tickers.length; i++) {
		if (!tickers[i].length) {
			deletedTics.push(tickers[i].splice(i, 1));
		}
	}
	return { tickers, deletedTics };
}

//get market data from Market model
//This probably is not being used
export const loadMarkets = async (exchange) => {
	for await (let ex of exchange) {
		let loadMar = ex.load_markets();
	}
};

//get the historical ticker data
async function fetchHis(exchange, symbol) {
	let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	console.log('tics for history', exchange.markets);
	if (exchange.has.fetchOHLCV) {
		for (symbol in exchange.markets) {
			await sleep(exchange.rateLimit); // milliseconds
			console.log(await exchange.fetchOHLCV(symbol, '1m')); // one minute
		}
	}

	const res = await exchange.fetchOHLCV(
		symbol,
		(timeframe = '10m'),
		(since = undefined),
		(limit = undefined),
		(params = {})
	);
	console.log('fetch res', res);
}
