let allShortcuts = [];

async function loadShortcuts() {
  try {
    const res = await fetch('data/shortcuts.json');
    allShortcuts = await res.json();
    renderTable(allShortcuts);
  } catch (err) {
    console.error('Failed to load shortcuts:', err);
  }
}

function renderTable(shortcuts) {
  const tbody = document.querySelector('#shortcut-table tbody');
  tbody.innerHTML = '';
  shortcuts.forEach(s => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><code>${s.keys}</code></td>
      <td>${s.action}</td>
      <td>${s.category}</td>
    `;
    tbody.appendChild(row);
  });
}

function setupSearch() {
  const input = document.getElementById('search');
  if (!input) return;
  input.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const filtered = allShortcuts.filter(s =>
      s.keys.toLowerCase().includes(q) ||
      s.action.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
    renderTable(filtered);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadShortcuts();
  setupSearch();
});
