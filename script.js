document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/inventory')
        .then(res => res.json())
        .then(data => {
            const tableBody = document.querySelector('#inventoryTable tbody');
            tableBody.innerHTML = '';

            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.InventoryID}</td>
                    <td>${row.date}</td>
                    <td>${row.Total_make}</td>
                    <td>${row.TotalCost}</td>
                    <td>${row.item_id || '-'}</td>
                    <td>${row.quantity || '-'}</td>
                    <td>${row.cost || '-'}</td>
                    <td>${row.subtotal || '-'}</td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(err => console.error('Error loading inventory:', err));
});
