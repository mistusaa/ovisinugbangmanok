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
    res.status(200).json({ message: 'Inventory record added successfully', insertedID: result.insertId });
  });
});

// API endpoint to add Item
app.post('/api/item', (req, res) => {
  const { itemID, itemName, quantity } = req.body;
  const sql = 'INSERT INTO Item (item_id, item_name, quantity) VALUES (?, ?, ?)';
  db.query(sql, [itemID, itemName, quantity], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      res.status(500).json({ message: 'Error adding item record' });
      return;
    }
    res.json({ message: 'Item record added successfully!' });
  });
});

// API endpoint to add Inventory_Details
app.post('/api/inventory-details', (req, res) => {
  const { inventoryID, itemID, quantity, cost, subtotal } = req.body;
  const sql = 'INSERT INTO Inventory_Details (inventory_id, item_id, quantity, cost, subtotal) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [inventoryID, itemID, quantity, cost, subtotal], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      res.status(500).json({ message: 'Error adding inventory details record' });
      return;
    }
    res.json({ message: 'Inventory_Details record added successfully!' });
  });
});

// ✅ GET Inventory_Make Data
app.get('/api/inventory-make', (req, res) => {
  const sql = `SELECT * FROM inventory_make`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching inventory make:', err);
      return res.status(500).json({ message: 'Failed to fetch inventory data' });
    }
    res.status(200).json(results);
  });
});

// ✅ GET Inventory_Details Data
app.get('/api/inventory-details', (req, res) => {
  const sql = `SELECT * FROM inventory_details`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching inventory details:', err);
      return res.status(500).json({ message: 'Failed to fetch inventory details' });
    }
    res.status(200).json(results);
  });
});

//get item
app.get('/api/item', (req, res) => {
  const sql = `SELECT item_id, item_name, quantity FROM Item`;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error querying database: ' + err.stack);
          res.status(500).send('Database error');
          return;
      }
      res.json(results);
  });
});


// ✅ PUT Update Inventory_Make
app.put('/api/inventory-details/:inventory_id/:item_id', (req, res) => {
  const { inventory_id, item_id } = req.params;
  const { quantity, cost, subtotal } = req.body;

  const sql = `UPDATE inventory_details
               SET quantity = ?, cost = ?, subtotal = ?
               WHERE inventory_id = ? AND item_id = ?`;

  db.query(sql, [quantity, cost, subtotal, inventory_id, item_id], (err, result) => {
    if (err) {
      console.error('Error updating inventory_details:', err);
      return res.status(500).json({ message: 'Update failed' });
    }
    res.status(200).json({ message: 'Inventory Details updated' });
  });
});

app.put('/api/inventory-make/:id', (req, res) => {
  const { id } = req.params;
  const { date, managerID, cookID, totalMake, totalCost } = req.body;

  const sql = `
    UPDATE inventory_make
    SET date = ?, ManagerID = ?, CookID = ?, Total_make = ?, TotalCost = ?
    WHERE InventoryID = ?`;

  db.query(sql, [date, managerID, cookID, totalMake, totalCost, id], (err, result) => {
    if (err) {
      console.error('Error updating inventory_make:', err);
      return res.status(500).json({ message: 'Update failed' });
    }
    res.status(200).json({ message: 'Inventory Make updated' });
  });
});


// ✅ PUT Update Inventory_Details
app.put('/api/inventory-details/:inventory_id/:item_id', (req, res) => {
  const { inventory_id, item_id } = req.params;
  const { quantity, cost, subtotal } = req.body;

  const sql = `UPDATE inventory_details 
               SET quantity = ?, cost = ?, subtotal = ?
               WHERE inventory_id = ? AND item_id = ?`;

  db.query(sql, [quantity, cost, subtotal, inventory_id, item_id], (err, result) => {
    if (err) {
      console.error('Error updating inventory_details:', err);
      return res.status(500).json({ message: 'Update failed' });
    }
    res.status(200).json({ message: 'Update successful' });
  });
});

// API endpoint to DELETE Item
app.delete('/api/item/:id', (req, res) => {
  const { id } = req.params;  // get the item id

  const sql = 'DELETE FROM Item WHERE item_id = ?';

  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Error deleting item: ' + err.stack);
          return res.status(500).json({ message: 'Error deleting item' });
      }

      if (result.affectedRows > 0) {
          res.json({ message: 'Item deleted successfully' });
      } else {
          res.status(404).json({ message: 'Item not found' });
      }
  });
});

// API endpoint to UPDATE Item
app.put('/api/item/:id', (req, res) => {
  const { id } = req.params;  // get the item id
  const { item_name, quantity } = req.body;

  const sql = 'UPDATE Item SET item_name = ?, quantity = ? WHERE item_id = ?';

  db.query(sql, [item_name, quantity, id], (err, result) => {
      if (err) {
          console.error('Error updating item: ' + err.stack);
          return res.status(500).json({ message: 'Error updating item' });
      }

      if (result.affectedRows > 0) {
          res.json({ message: 'Item updated successfully' });
      } else {
          res.status(404).json({ message: 'Item not found' });
      }
  });
});

// ✅ DELETE Inventory_Make
app.delete('/api/inventory-make/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM inventory_make WHERE InventoryID = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting inventory_make:', err);
      return res.status(500).json({ message: 'Delete failed' });
    }
    res.status(200).json({ message: 'Inventory Make deleted' });
  });
});

// ✅ DELETE Inventory_Details
app.delete('/api/inventory-details/:inventory_id/:item_id', (req, res) => {
  const { inventory_id, item_id } = req.params;

  const sql = `DELETE FROM inventory_details WHERE inventory_id = ? AND item_id = ?`;

  db.query(sql, [inventory_id, item_id], (err, result) => {
    if (err) {
      console.error('Error deleting inventory_details:', err);
      return res.status(500).json({ message: 'Delete failed' });
    }
    res.status(200).json({ message: 'Inventory Details deleted' });
  });
});

// GET Supply Orders
app.get('/api/supply', (req, res) => {
  const sql = `SELECT * FROM supply`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching supply:', err);
      return res.status(500).json({ message: 'Failed to fetch supply data' });
    }
    res.status(200).json(results);
  });
});

// GET Supply Details
app.get('/api/supply-details', (req, res) => {
  const sql = `SELECT * FROM supply_details`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching supply details:', err);
      return res.status(500).json({ message: 'Failed to fetch supply details' });
    }
    res.status(200).json(results);
  });
});

// GET SupplyDetails_Addon
app.get('/api/supplydetails-addon', (req, res) => {
  const sql = `SELECT * FROM supplydetails_addon`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching supplydetails_addon:', err);
      return res.status(500).json({ message: 'Failed to fetch supplydetails_addon data' });
    }
    res.status(200).json(results);
  });
});

// ✅ GET Supply Table
app.get('/api/supply', (req, res) => {
  const sql = `SELECT * FROM Supply`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching supply:', err);
      return res.status(500).json({ message: 'Failed to fetch supply data' });
    }
    res.status(200).json(results);
  });
});

// ✅ API route to fetch incoming stock data
app.get("/api/incoming-stocks", (req, res) => {
  const regularQuery = `
    SELECT 
      s.supply_id,
      s.date,
      st.name AS staff_name,
      sup.name AS supplier_name,
      i.item_name AS name,
      sd.quantity,
      sd.supply_amount,
      sd.subtotal,
      'Regular Item' AS type
    FROM Supply s
    JOIN Staff st ON s.staff_id = st.staff_id
    JOIN Supplier sup ON s.supplier_id = sup.supplier_id
    JOIN Supply_Details sd ON s.supply_id = sd.supply_id
    JOIN Item i ON sd.item_id = i.item_id
  `;

  const addonQuery = `
    SELECT 
      s.supply_id,
      s.date,
      st.name AS staff_name,
      sup.name AS supplier_name,
      a.AddONName AS name,
      sa.Qty AS quantity,
      sa.price AS supply_amount,
      sa.Subtotal AS subtotal,
      'Add-On Product' AS type
    FROM Supply s
    JOIN Staff st ON s.staff_id = st.staff_id
    JOIN Supplier sup ON s.supplier_id = sup.supplier_id
    JOIN SupplyDetails_AddON sa ON s.supply_id = sa.supply_id
    JOIN AddONProduct a ON sa.AddONID = a.AddONID
  `;

  db.query(`${regularQuery} UNION ALL ${addonQuery} ORDER BY date DESC`, (err, results) => {
    if (err) {
      console.error("Error fetching incoming stocks (combined):", err);
      return res.status(500).json({ error: "Failed to fetch incoming stocks" });
    }
    res.json(results);
  });
});

// API endpoint to get staff list
app.get('/api/staff', (req, res) => {
  const sql = 'SELECT * FROM Staff';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Database error');
      return;
    }
    res.json(results);
  });
});

// API endpoint to get staff roles and permisstions
app.get('/api/staff-roles', (req, res) => {
  const sql = `
  SELECT
      s.staff_id,
      s.name,
      s.role AS base_role,
      CASE
          WHEN c.staff_id IS NOT NULL THEN 'Cashier'
          ELSE NULL
      END AS is_cashier,
      CASE
          WHEN ck.staff_id IS NOT NULL THEN 'Cook'
          ELSE NULL
      END AS is_cook,
      CASE
          WHEN m.staff_id IS NOT NULL THEN 'Manager'
          ELSE NULL
      END AS is_manager
  FROM Staff s
  LEFT JOIN Cashier c ON s.staff_id = c.staff_id
  LEFT JOIN Cook ck ON s.staff_id = ck.staff_id
  LEFT JOIN Manager m ON s.staff_id = m.staff_id;
  `;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error querying database: ' + err.stack);
          res.status(500).send('Database error');
          return;
      }

      const staffRoles = results.map(row => {
          const additionalRoles = [];
          if (row.is_cashier) additionalRoles.push('Cashier');
          if (row.is_cook) additionalRoles.push('Cook');
          if (row.is_manager) additionalRoles.push('Manager');

          return {
              staff_id: row.staff_id,
              name: row.name,
              base_role: row.base_role,
              additional_roles: additionalRoles
          };
      });

      res.json(staffRoles);
  });
});

//salees report
app.get('/api/sales-report', (req, res) => {
  const sql = `SELECT order_id, order_date, customer_id, staff_id, total_amount FROM OrderTable`;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error querying database: ' + err.stack);
          res.status(500).send('Database error');
          return;
      }
      res.json(results);
  });
});

//inventoryrepoort
app.get('/api/inventory-report', (req, res) => {
  const sql = `SELECT item_id, item_name, quantity FROM Item`;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error querying database: ' + err.stack);
          res.status(500).send('Database error');
          return;
      }
      res.json(results);
  });
});

// API endpoint for Supply table
app.get('/api/supply', (req, res) => {
  const sql = `SELECT supply_id, date, staff_id, total_amount, supplier_id FROM Supply`;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error querying database: ' + err.stack);
          res.status(500).send('Database error');
          return;
      }
      res.json(results);
  });
});

// API endpoint for Supply_Details table
app.get('/api/supply-details', (req, res) => {
  const sql = `SELECT supply_id, item_id, quantity, supply_amount, subtotal FROM Supply_Details`;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error querying database: ' + err.stack);
          res.status(500).send('Database error');
          return;
      }
      res.json(results);
  });
});

// API endpoint for SupplyDetails_AddON table
app.get('/api/supply-details-addon', (req, res) => {
  const sql = `SELECT supply_id, AddONID, Qty, price, Subtotal FROM SupplyDetails_AddON`;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error querying database: ' + err.stack);
          res.status(500).send('Database error');
          return;
      }
      res.json(results);
  });
});

//summarysalemetrics
app.get('/api/supply-summary', async (req, res) => {
  try {
    const totalRevenueQuery = 'SELECT COALESCE(SUM(total_amount), 0) AS totalRevenue FROM OrderTable';
    const numTransactionsQuery = 'SELECT COUNT(*) AS numTransactions FROM OrderTable';
    const totalUnitsSoldQuery = 'SELECT SUM(quantity) AS totalUnitsSold FROM Order_Details_NormalMeat';

    db.query(totalRevenueQuery, (err, totalRevenueResults) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
             return res.status(500).json({ message: 'Error fetching supplies data', error: err.message });
        }

        db.query(numTransactionsQuery, (err, numTransactionsResults) => {
            if (err) {
                console.error('Error querying database: ' + err.stack);
                 return res.status(500).json({ message: 'Error fetching supplies data', error: err.message });
            }

            db.query(totalUnitsSoldQuery, (err, totalUnitsSoldResults) => {
                 if (err) {
                    console.error('Error querying database: ' + err.stack);
                     return res.status(500).json({ message: 'Error fetching supplies data', error: err.message });
                }

                const totalRevenue = parseFloat(totalRevenueResults[0].totalRevenue || 0);
                const numTransactions = numTransactionsResults[0].numTransactions || 0;
                const totalUnitsSold = totalUnitsSoldResults[0].totalUnitsSold || 0;
                const avgOrderValue = numTransactions > 0 ? (totalRevenue / numTransactions).toFixed(2) : 0;


                 const topSellingProductQuery = `SELECT p.product_name, SUM(od.quantity) AS totalQuantity
                                            FROM Order_Details_NormalMeat od
                                            JOIN Product p ON od.product_id = p.product_id
                                            GROUP BY p.product_name
                                            ORDER BY totalQuantity DESC
                                            LIMIT 1`;

                db.query(topSellingProductQuery, (err, topSellingProductResults) => {
                     if (err) {
                        console.error('Error querying database: ' + err.stack);
                         return res.status(500).json({ message: 'Error fetching supplies data', error: err.message });
                    }

                    const topSellingProduct = topSellingProductResults.length > 0 ? topSellingProductResults[0].product_name : 'N/A';


                      const highestGrossingCategoryQuery = `
                                                        SELECT p.description, SUM(od.subtotal) AS totalSubtotal
                                                        FROM Order_Details_NormalMeat od
                                                        JOIN Product p ON od.product_id = p.product_id
                                                        GROUP BY p.description
                                                        ORDER BY totalSubtotal DESC
                                                        LIMIT 1;`;

                    db.query(highestGrossingCategoryQuery, (err, highestGrossingCategoryResults) => {
                          if (err) {
                            console.error('Error querying database: ' + err.stack);
                             return res.status(500).json({ message: 'Error fetching supplies data', error: err.message });
                        }

                        const highestGrossingCategory = highestGrossingCategoryResults.length > 0 ? highestGrossingCategoryResults[0].description : 'N/A';

                         res.json({
                                totalRevenue: totalRevenue.toFixed(2),
                                numTransactions,
                                avgOrderValue,
                                totalUnitsSold,
                                topSellingProduct,
                                highestGrossingCategory,
                            });
                    });

                });
            });
        });
      })
    } catch (error) {
        console.error('Unexpected error : ' + error.stack);
        return res.status(500).json({ message: 'Error fetching sales data', error: error.message });
    }

});


//inventorymetrics
app.get('/api/inventory-report', (req, res) => {
  const sql = `SELECT item_id, item_name, quantity FROM Item`;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error querying database: ' + err.stack);
          res.status(500).send('Database error');
          return;
      }
      res.json(results);
  });
});

//profitapi
app.get('/api/profit-and-expense', async (req, res) => {
  try {
    const expensesQuery = 'SELECT supply_id, date, staff_id, supplier_id, total_amount FROM Supply';
    const revenueQuery = 'SELECT order_id, order_date AS date, customer_id, staff_id, total_amount FROM OrderTable';

    db.query(expensesQuery, (err, expensesResults) => {
        if (err) {
            console.error('Error querying expenses: ' + err.stack);
            return res.status(500).json({ message: 'Error fetching data', error: err.message });
        }

        db.query(revenueQuery, (err, revenueResults) => {
            if (err) {
                console.error('Error querying revenue: ' + err.stack);
                return res.status(500).json({ message: 'Error fetching data', error: err.message });
            }

            let totalRevenue = 0;
            revenueResults.forEach(rev => {
                totalRevenue += parseFloat(rev.total_amount || 0);
            });

            let totalExpenses = 0;
            expensesResults.forEach(expense => {
                totalExpenses += parseFloat(expense.total_amount || 0);
            });

            const netProfit = totalRevenue - totalExpenses;

            res.json({
                expenses: expensesResults,
                revenue: revenueResults,
                totalRevenue: totalRevenue,
                totalExpenses: totalExpenses,
                netProfit: netProfit,
            });
        });
    });

  } catch (error) {
        console.error('Unexpected error : ' + error.stack);
        return res.status(500).json({ message: 'Error fetching data', error: error.message });
  }

});

//kiosk.html api
db.connect((err) => {
  if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
  }
  console.log('Connected to database.');
});

// API endpoint for checkout
app.post('/api/checkout', (req, res) => {
  const { customerId, staffId, orderItems, totalAmount } = req.body;

  // Validate the data (add more validation as needed)
  if (!customerId || !staffId || !orderItems || orderItems.length === 0 || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Invalid order data.' });
  }

  // Start a database transaction to ensure atomicity
  db.beginTransaction((err) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Transaction error: ' + err.message });
      }

      // 1. Insert into OrderTable
      const orderTableQuery = 'INSERT INTO OrderTable (customer_id, staff_id, order_date, total_amount) VALUES (?, ?, NOW(), ?)';  // CORRECT - no order_id
      db.query(orderTableQuery, [customerId, staffId, totalAmount], (err, orderResult) => {
          if (err) {
              return db.rollback(() => {
                  res.status(500).json({ success: false, message: 'OrderTable insert error: ' + err.message });
              });
          }

          const orderId = orderResult.insertId;

          // 2. Insert into Order_Details_NormalMeat or AddONOrder based on item type
          let itemQueries = [];

          orderItems.forEach(item => {
              if (item.type === 'meal') {
                  const query = 'INSERT INTO Order_Details_NormalMeat (order_id, product_id, quantity, subtotal, SellingPrice) VALUES (?, ?, ?, ?, ?)';  // CORRECT - no order_details_id
                  itemQueries.push({ query: query, values: [orderId, item.id, item.quantity, item.subtotal, item.price] });  // Use item.id which should correspond to product_id
              } else if (item.type === 'addon') {
                  const query = 'INSERT INTO AddONOrder (OrderID, AddONID, Qty_ordered, subtotal, SellingPrice) VALUES (?, ?, ?, ?, ?)';  // CORRECT - no AddONOrder id
                  itemQueries.push({ query: query, values: [orderId, item.id, item.quantity, item.subtotal, item.price] });  // Use item.id which should correspond to AddONID
              }
          });

          // Execute the queries sequentially
          function executeQueries(index) {
              if (index >= itemQueries.length) {
                  // All queries executed successfully, commit the transaction
                  return db.commit((err) => {
                      if (err) {
                          return db.rollback(() => {
                              res.status(500).json({ success: false, message: 'Transaction commit error: ' + err.message });
                          });
                      }
                      res.json({ success: true, orderId: orderId });
                  });
              }

              const { query, values } = itemQueries[index];
              db.query(query, values, (err) => {
                  if (err) {
                      return db.rollback(() => {
                          res.status(500).json({ success: false, message: `Item insert error: ${err.message} for query ${query} with values ${JSON.stringify(values)}` });
                      });
                  }

                  executeQueries(index + 1);
              });
          }

          executeQueries(0); // Start executing queries from the beginning
      });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'kiosk.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});