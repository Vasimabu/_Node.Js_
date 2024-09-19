// app.js

const express = require('express');
const path = require('path');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (e.g., JavaScript, CSS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use file routes
app.use('/', fileRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
