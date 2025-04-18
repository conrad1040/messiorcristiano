async function fetchVotes() {
  const res = await fetch('/votes');
  const data = await res.json();
  document.getElementById('messi-count').textContent = data.Messi;
  document.getElementById('cristiano-count').textContent = data.Cristiano;
}

async function vote(player) {
  await fetch('/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ player })
  });
  fetchVotes();
}

// Load votes when page loads
window.onload = fetchVotes;
