const express = require('express');
const router = express.Router();

// Middleware to check if the user is logged in
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login page if not logged in
    }
    next(); // Continue to the next middleware if logged in
};

// Middleware to inject user data into all views
router.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Protect these routes using requireLogin middleware
router.get('/', requireLogin, (req, res) => res.render('index'));
router.get('/about', requireLogin, (req, res) => res.render('about'));
router.get('/guide', requireLogin, (req, res) => res.render('guide'));

module.exports = router;
