const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());

// Read current vote counts
app.get('/votes', (req, res) => {
  fs.readFile('votes.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read vote data' });
    res.json(JSON.parse(data));
  });
});

// Submit a vote
app.post('/vote', (req, res) => {
  const { player } = req.body;
  if (!player || !['Messi', 'Cristiano'].includes(player)) {
    return res.status(400).json({ error: 'Invalid vote' });
  }

  fs.readFile('votes.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read votes' });

    const votes = JSON.parse(data);
    votes[player] += 1;

    fs.writeFile('votes.json', JSON.stringify(votes, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to save vote' });
      res.json({ success: true, votes });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
