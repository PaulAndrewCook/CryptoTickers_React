//middleware to handle any errors thrown via routes and fns

class AppError extends Error {
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
	}
}

export default AppError;
