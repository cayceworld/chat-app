const express = require('express');

const app = express();
const path = require('path');

// Serve static files from the app
app.use(express.static(path.join(__dirname, 'client')));



// Show index.html on link "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});



app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});