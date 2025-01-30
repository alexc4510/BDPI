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
    if (!name || !importance) {
        return res.status(400).json({ error: 'Name and importance are required' });
    }
    const query = 'INSERT INTO Characteristics (name, value, unit, importance) VALUES (?, ?, ?, ?)';
    db.query(query, [name, value, unit, importance], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Characteristic added successfully' });
    });
});

// Edit a characteristic (allow optional fields)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, value, unit, importance } = req.body;

    if (!name || !importance) {
        return res.status(400).json({ error: 'Name and importance are required' });
    }

    const query = `
        UPDATE Characteristics 
        SET name = ?, value = ?, unit = ?, importance = ?
        WHERE id = ?
    `;

    db.query(query, [name, value, unit || null, importance, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Characteristic not found' });
        }
        res.json({ message: 'Characteristic updated successfully' });
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
