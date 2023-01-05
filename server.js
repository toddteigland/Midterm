// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')


const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieParser())
//gary and ilia
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const widgetApiRoutes = require('./routes/widgets-api');
const userApiRoutes = require('./routes/users-api');
const vehicleApiRoutes = require('./routes/vehicle-api');
const indexApiRoutes = require('./routes/index-api')
const usersRoutes = require('./routes/users');
const userDashboard = require('./routes/dashboard')
const userLikesApiRoutes = require('./routes/likedCars-api');
const userLogin = require('./routes/login');
const loginApiRoutes = require('./routes/login-api');
const logoutRoutes = require('./routes/logout');
const vehicleRoutes = require('./routes/vehicle');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/', loginApiRoutes);
app.use('/login', userLogin);
app.use('/logout', logoutRoutes);
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/api/vehicles', vehicleApiRoutes);
app.use('/api/index', indexApiRoutes);
app.use('/users', usersRoutes);
app.use('/dashboard', userDashboard);
app.use('/api/likedCars', userLikesApiRoutes);
app.use('/vehicle', vehicleRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  console.log(req.cookies.userEmail)
  let userEmail = "";
  if (req.cookies.userEmail) {
    userEmail = req.cookies.userEmail;
  }
  const templateVars = {
    userEmail: userEmail
  }
  res.render('index', templateVars);  // pass the templateVars object to the view
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
