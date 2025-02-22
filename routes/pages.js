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

// Protected routes
router.get('/', requireLogin, (req, res) => res.render('index'));
router.get('/about', requireLogin, (req, res) => res.render('about'));
router.get('/guide', requireLogin, (req, res) => res.render('guide'));

// Options for Card 1 (Send SMS)
router.get('/pickup', requireLogin, (req, res) => res.render('pickup'));
router.get('/quotation', requireLogin, (req, res) => res.render('quotation'));
router.get('/repairupdate', requireLogin, (req, res) => res.render('repairupdate'));
router.get('/forfeiture', requireLogin, (req, res) => res.render('forfeiture'));
router.get('/manualsms', requireLogin, (req, res) => res.render('manualsms'));

// Route for Call Client Page
router.get('/callclient', requireLogin, (req, res) => res.render('callclient'));


module.exports = router;
