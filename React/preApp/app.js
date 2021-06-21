const express = require('express'); // back end web application framework for Node.js
const path = require('path'); //provides utilities for working with file and directory paths
const axios = require('axios').default,
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	expressSanitizer = require('express-sanitizer');

//setup the express app
const app = express();

// Setup the mongoose for databases
mongoose
	.connect('mongodb://localhost:27017/react', {
		useNewUrlParser    : true,
		useUnifiedTopology : true
	})
	.then(() => console.log('Connected to DB!'))
	.catch((error) => console.log(error.message));

//Setup the views engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use('/public', express.static(__dirname + '/public'));

// use this to override POST requests into PUT
// app.use(methodOverride('_method')); not using this yet

//home page route
app.get('/', (req, res) => {
	res.render('index.html');
});

//App connection route
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
