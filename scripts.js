// JavaScript source code
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cycle-count-form');
    const tableBody = document.querySelector('#cycle-count-table tbody');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const item = document.getElementById('item').value;
        const quantity = document.getElementById('quantity').value;

        const response = await fetch('/api/cycle-counts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item, quantity })
        });

        if (response.ok) {
            loadCycleCounts();
            form.reset();
        }
    });

    async function loadCycleCounts() {
        const response = await fetch('/api/cycle-counts');
        const data = await response.json();
        tableBody.innerHTML = '';

        data.forEach(count => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${count.item}</td>
                <td>${count.quantity}</td>
                <td>${new Date(count.date).toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    loadCycleCounts();
});