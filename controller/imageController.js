const db = require('../db');
const path = require('path');

// Upload handler
exports.uploadImage = (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  const filename = req.file.filename;

  const sql = 'INSERT INTO images (filename) VALUES (?)';
  db.query(sql, [filename], (err, result) => {
    if (err) return res.status(500).send('Database error');
    res.status(201).json({ message: 'Image uploaded', id: result.insertId });
  });
};

// Get image by ID
exports.getImage = (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT filename FROM images WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).send('Image not found');

    const filePath = path.join(__dirname, '../uploads', results[0].filename);
    res.sendFile(filePath);
  });
};
