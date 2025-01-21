const express = require('express');
const db = require('../db/db');
const router = express.Router();

// Fetch all characteristics
router.get('/', (req, res) => {
    db.query('SELECT * FROM Characteristics', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new characteristic
router.post('/', (req, res) => {
    const { name, value, unit, importance } = req.body;
    if (!name || !value || !unit || !importance) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const query = 'INSERT INTO Characteristics (name, value, unit, importance) VALUES (?, ?, ?, ?)';
    db.query(query, [name, value, unit, importance], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Characteristic added successfully' });
    });
});

// Delete a characteristic
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Characteristics WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Characteristic deleted successfully' });
    });
});

module.exports = router;
