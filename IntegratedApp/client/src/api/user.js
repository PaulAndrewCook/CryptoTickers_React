import axios from 'axios';
const url = 'http://localhost:8000/';

//if adding in the console.log make sure to include the return call

export const loginUser = (user) => {
	console.log('axios get: url', `${url}APIlogin`, 'user', user);
	return axios.post(
		`${url}APIlogin`,
		{ headers: { 'Content-Type': 'application/json' } },
		{ params: { username: user.username, password: user.password } }
	);
};

export const registerUser = (user) => {
	console.log('axios post: url', `${url}APIregister`, 'user', user);
	return axios.post(
		`${url}APIregister`,
		{ headers: { 'Content-Type': 'application/json' } },
		{ params: { user: user } }
	);
};

export const logoutUser = (user) => {
	console.log('axios post: url', `${url}APIlogout`);
	return axios.get(
		`${url}APIlogout`,
		{ headers: { 'Content-Type': 'application/json' } },
		{ params: { user: user } }
	);
};
