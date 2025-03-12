const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // or your own password
  database: 'db_ovisinugbangmanok'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// ✅ INSERT Inventory API
app.post('/api/inventory', (req, res) => {
  const { inventoryID, date, managerID, cookID, totalMake, totalCost } = req.body;
  console.log('Received data:', req.body);

  const sql = `INSERT INTO Inventory_Make (InventoryID, date, ManagerID, CookID, Total_make, TotalCost)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [inventoryID, date, managerID, cookID, totalMake, totalCost], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Failed to insert inventory record' });
    }
    res.status(200).json({ message: 'Inventory record added successfully' });
  });
});

// API to get inventory make and details
app.get('/api/inventory', (req, res) => {
    const query = `
        SELECT im.InventoryID, im.date, im.Total_make, im.TotalCost,
               id.item_id, id.quantity, id.cost, id.subtotal
        FROM Inventory_Make im
        LEFT JOIN Inventory_Details id ON im.InventoryID = id.inventory_id
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
