import express from 'express';
const router = express.Router({ mergeParams: true });
import passport from 'passport';
import wrapAsync from '../utils/catchAsync.js';
import * as user from '../controllers/user.js';
import * as investments from '../controllers/investments.js'; //call the investment controller

/// BEGIN API ROUTES ///
router.route('/APIregister').post(wrapAsync(user.APIregister));

router.route('/APIlogin').post(passport.authenticate('local'), investments.APIhome);

router.get('/APIlogout', user.APIlogout, investments.APIindex);

/// END API ROUTES ///
router.route('/register').get(user.renderRegister).post(wrapAsync(user.register));

router
	.route('/login')
	.get(user.renderLogin)
	.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login);

router.get('/logout', user.logout);

export default router;
