// const express = require('express');
// const mssql = require('mssql');
// const bodyParser = require('body-parser');

// // Initialize Express App
// const app = express();
// app.use(bodyParser.json());

// const port = 4000;

// // Middleware

// // Database Configuration
// const config = {
//     user: 'sa', // Database username
//     password: 'sql2005', // Database password
//     server: 'localhost', // Server IP address
//     database: 'node_proj_app', // Database name
//     options: {
//         encrypt: false // Disable encryption
//     }
// };

// // Connect to Database
// mssql.connect(config, err => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         process.exit(1); // Exit process with failure
//     } else {
//         console.log('Database connection successful');
//     }
// });

// // CRUD Operations

//  // Create - Add a new user
// app.post('/details', (req, res) => {
//     const { name, city, roles } = req.body;

//     if (!name || !city || !roles) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const query = `
//         INSERT INTO details (name, city, roles)
//         VALUES (@name, @city, @roles)
//     `;

//     const request = new mssql.Request();
//     request.input('name', mssql.NVarChar, name);
//     request.input('city', mssql.NVarChar, city);
//     request.input('roles', mssql.NVarChar, roles);

//     request.query(query, (err, result) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//             return res.status(500).json({ message: 'Internal Server Error', error: err.message });
//         }
//         res.status(201).json({ message: 'Detail added successfully', data: result });
//     });
// }); 

// // Read - Get all users
// app.get('/employees', (req, res) => {
//     const query = 'SELECT * FROM employee';

//     new mssql.Request().query(query, (err, result) => {
//         if (err) {
//             console.error('Error executing query:', err);
//             return res.status(500).json({ message: 'Internal Server Error', error: err.message });
//         }
//         res.json(result.recordset);
//     });
// });
// // post employee
// app.post('/details', (req, res) => {
//     // Get the request body
//     const reqBody = {
//         name: req.body.name,
//         city: req.body.rollno,
//         role:req.body.role

//     };
//     // Insert the request body into the database
//     const query = `INSERT INTO employee (name,city ,rollno) VALUES (?, ?, ?)`;
//     connection.query(query, [reqBody.name,reqBody.city, reqBody.role]);

//     new mssql.Request().query(query, (err, result) => {
//         if (err) {
//             console.error('Error executing query:', err);
//             return res.status(500).json({ message: 'Internal Server Error', error: err.message });
//         }
//         res.json(result.recordset);
//     });

// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
const express = require('express');
const mssql = require('mssql');
const bodyParser = require('body-parser');

// Initialize Express App
const app = express();
app.use(bodyParser.json());

const port = 4000;

// Database Configuration
const config = {
    user: 'sa', // Database username
    password: 'sql2005', // Database password
    server: 'localhost', // Server IP address
    database: 'node_proj_app', // Database name
    options: {
        encrypt: false // Disable encryption
    }
};

// Connect to Database
mssql.connect(config, err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit process with failure
    } else {
        console.log('Database connection successful');
    }
});

// Create - Add a new user
app.post('/details', (req, res) => {
    const { name, city, roles } = req.body;

    if (!name || !city || !roles) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `
        INSERT INTO employee (name, city, roles)
        VALUES (@name, @city, @roles)
    `;

    const request = new mssql.Request();
    request.input('name', mssql.NVarChar, name);
    request.input('city', mssql.NVarChar, city);
    request.input('roles', mssql.NVarChar, roles);

    request.query(query, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
        res.status(201).json({ message: 'Detail added successfully', data: result });
    });
});

// Read - Get all users
app.get('/employees', (req, res) => {
    const query = 'SELECT * FROM employee';

    new mssql.Request().query(query, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
        res.json(result.recordset);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
