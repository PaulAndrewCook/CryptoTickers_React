import pkg from 'joi';
const { boolean } = pkg;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema({
	email   : {
		type     : String,
		required : true,
		unique   : true
	},
	isAdmin : {
		type    : Boolean,
		default : false
	},
	tickers : [
		{
			type : Schema.Types.ObjectId,
			ref  : 'Ticker'
		}
	]
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);
export default User;
