// Importing required modules
const express = require('express');

// Creating an instance of Express
const app = express();
const port = 3000;

// Define a route for the homepage
app.get('/backend', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
