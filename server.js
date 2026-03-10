const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── In-memory store ──
const rooms = {};

// GET room
app.get('/api/room/:code', (req, res) => {
  const room = rooms[req.params.code];
  if (!room) return res.status(404).json(null);
  res.json(room);
});

// POST room (create or update)
app.post('/api/room/:code', (req, res) => {
  rooms[req.params.code] = req.body;
  res.json({ ok: true });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Marketing War running on port ${PORT}`));
