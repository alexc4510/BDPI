const express = require('express');
const db = require('../db/db');
const router = express.Router();

// Fetch all associations
router.get('/', (req, res) => {
    const query = `
      SELECT
        PlantCharacteristics.plant_id,
        PlantCharacteristics.characteristic_id,
        Plants.name AS plantName,
        Characteristics.name AS characteristicName,
        PlantCharacteristics.note
      FROM PlantCharacteristics
      JOIN Plants ON PlantCharacteristics.plant_id = Plants.id
      JOIN Characteristics ON PlantCharacteristics.characteristic_id = Characteristics.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Failed to fetch associations" });
        }

        res.json(results);
    });
});


// Add a new association
router.post('/', (req, res) => {
    const { plant_id, characteristic_id, note } = req.body;
    const query = 'INSERT INTO PlantCharacteristics (plant_id, characteristic_id, note) VALUES (?, ?, ?)';
    db.query(query, [plant_id, characteristic_id, note], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Association added successfully' });
    });
});

// Delete an association
router.delete('/:plant_id/:characteristic_id', (req, res) => {
    const { plant_id, characteristic_id } = req.params;

    const query = 'DELETE FROM PlantCharacteristics WHERE plant_id = ? AND characteristic_id = ?';
    db.query(query, [plant_id, characteristic_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to delete association" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Association not found" });
        }

        res.status(200).json({ message: "Association deleted successfully" });
    });
});

module.exports = router;
