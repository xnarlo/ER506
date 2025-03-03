const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Render search page
router.get('/search', (req, res) => {
    res.render('search');
});

// API to fetch STN details
router.get('/api/search', (req, res) => {
    const { stn } = req.query;

    if (!stn) {
        return res.json({ error: "Please enter an STN." });
    }

    const query = 'SELECT * FROM jo_database WHERE stn = ?';

    db.query(query, [stn], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.json({ error: "STN not found." });
        }

        res.json(results[0]);
    });
});

module.exports = router;
