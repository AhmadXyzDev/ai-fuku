const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route ke /api/ai
app.use('/api/ai', require('./api/ai'));

// ⚠️ Jangan pakai app.listen() di Vercel
module.exports = app;
