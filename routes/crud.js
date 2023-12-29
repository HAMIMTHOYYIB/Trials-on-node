const express = require('express');
const router = express.Router();

// Create operation
router.post('/create', (req, res) => {
  // Handle create logic here
  res.send('Create route');
});

// Read operation
router.get('/read/:id', (req, res) => {
  // Handle read logic here
  res.send('Read route for ID: ' + req.params.id);
});

// Update operation
router.put('/update/:id', (req, res) => {
  // Handle update logic here
  res.send('Update route for ID: ' + req.params.id);
});

// Delete operation
router.delete('/delete/:id', (req, res) => {
  // Handle delete logic here
  res.send('Delete route for ID: ' + req.params.id);
});

module.exports = router;
