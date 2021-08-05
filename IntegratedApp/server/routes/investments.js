import express from 'express'; // back end web application framework for Node.js
const router = express.Router({ mergeParams: true }); //call express router
import wrapAsync from '../utils/catchAsync.js'; //call the async wrapper to catch all errors
import { APIisLoggedIn, isLoggedIn, isAuthor, validateInput, isAdmin } from '../middleware.js'; //middleware that checks to see if user is logged in
import * as investments from '../controllers/investments.js'; //call the investment controller

//API External Endpoints
router
	.route('/api')
	.get(wrapAsync(investments.APIindex)) //Welcome page with set tickers
	.post(wrapAsync(investments.APIcreateNewTicker))
	.patch(wrapAsync(investments.APIeditTicker)) //Edit a ticker
	.delete(wrapAsync(investments.APIdeleteTicker)); //Delete a ticker

//Update sent tickers from React
router.get('/APIupdateTics', wrapAsync(investments.APIupdateTics));

//Welcome page with set tickers
router.get('/', wrapAsync(investments.index));

//Route for updating the tic data
router.post('/updateTics', wrapAsync(investments.updateTics));

//Personalized investments
router.route('/home').get(isLoggedIn, wrapAsync(investments.home)).post(isLoggedIn, wrapAsync(investments.defaultHome));

//Delete and load market symbols for initial start
router.get('/markets', isLoggedIn, isAdmin, wrapAsync(investments.markets));

//create a new investment crypto or stock
router
	.route('/new')
	.get(isLoggedIn, investments.renderNewTicker)
	.post(isLoggedIn, validateInput, wrapAsync(investments.createNewTicker)); //save the symbol into the database as a new Ticker + redirect to show page

//Take ticker information and get realtime data from programs
router
	.route('/:id')
	.get(wrapAsync(investments.showTicker)) //show page for the ticker
	.put(isLoggedIn, isAuthor, validateInput, wrapAsync(investments.editTicker)) //Edit a ticker
	.delete(isLoggedIn, isAuthor, wrapAsync(investments.deleteTicker)); //Delete a ticker

//Get the edit page for the ticker
router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(investments.renderEditForm));

//Get the autoUpdate for the ticker
router.get('/:id/autoupdate', isLoggedIn, isAdmin, wrapAsync(investments.autoUpdate));

//export all the routes
export default router;
