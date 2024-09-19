/* const express=require('express')
const mssql=require('mssql')
const app=express()
const bodyparser=require('body-parser')


app.listen(3000,(req,res)=>{
    console.log('serevr is running');
})
// Middleware to parse JSON bodies
app.use(express.json());

var config = {
    "user": "sa", // Database username
    "password": "sql2005", // Database password
    "server": "localhost", // Server IP address
    "database": "node_proj_app", // Database name
    "options": {
        "encrypt": false // Disable encryption
    }
}

mssql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
});

app.get("/usersdetail", (request, response) => {
    // Execute a SELECT query
    new mssql.Request().query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            response.send(result.recordset); // Send query result as response
            console.dir(result.recordset);
        }
    });
});
// POST request to add a new user
app.post('/addusers', (req, res) => {
    // Destructure the user data from the request body
    const { ID, Name, Age, City } = req.body;
    console.log(req.body)

    // Validate the input (basic example, more validation can be added)
    if (!ID || !Name || !Age || !City) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // SQL query to insert a new user
    const query = 'INSERT INTO users (ID, Name, Age, City) VALUES (?, ?, ?, ?)';

    // Execute the query
    connection.query(query, [ID, Name, Age, City], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'User added successfully', data: results });
    });
});
 */

const express = require('express');
const mssql = require('mssql');
const app = express();
const bodyparser = require('body-parser');

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Database configuration
const config = {
    user: 'sa', // Database username
    password: 'sql2005', // Database password
    server: 'localhost', // Server IP address
    database: 'node_proj_app', // Database name
    options: {
        encrypt: false // Disable encryption
    }
};

// Connect to the database
mssql.connect(config, err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit process with failure
    } else {
        console.log('Database connection successful');
    }
});

// GET request to fetch users' details
app.get('/usersdetail', (req, res) => {
    new mssql.Request().query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(result.recordset); // Send query result as response
        }
    });
});

// POST request to add a new user
app.post('/addusers', (req, res) => {
    // Destructure the user data from the request body
    const { ID, Name, Age, City } = req.body;
    console.log(req.body);

    // Validate the input (basic example, more validation can be added)
    if (!ID || !Name || !Age || !City) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // SQL query to insert a new user
    const query = `
        INSERT INTO users (ID, Name, Age, City)
        VALUES (@ID, @Name, @Age, @City)
    `;

    // Create a new request object
    const request = new mssql.Request();
    request.input(6, mssql.Int, ID);
    request.input('saravana', mssql.NVarChar, Name);
    request.input(21, mssql.Int, Age);
    request.input('tirunelvali', mssql.NVarChar, City);

    // Execute the query
    request.query(query, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'User added successfully', data: result });
    });
});
