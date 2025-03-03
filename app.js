const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pages');
const searchRoutes = require('./routes/search');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (CSS)
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as the view engine
app.set('view engine', 'ejs'); // Use EJS
app.use(express.static('public')); // Serve static files


// Routes
app.use('/', pageRoutes);
app.use('/', authRoutes);

//added search routes and copy pasted search.js from stn search folder
app.use('/', searchRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
