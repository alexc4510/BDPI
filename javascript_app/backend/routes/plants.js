const express = require('express');
const db = require('../db/db');
const router = express.Router();

// Fetch all plants
router.get('/', (req, res) => {
    db.query('SELECT * FROM Plants', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new plant
router.post('/', (req, res) => {
    const { name, scientific_name, description, origin, type } = req.body;
    const query = 'INSERT INTO Plants (name, scientific_name, description, origin, type) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, scientific_name, description, origin, type], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Plant added successfully' });
    });
});

// Delete a plant
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Plants WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Plant deleted successfully' });
    });
});

module.exports = router;
