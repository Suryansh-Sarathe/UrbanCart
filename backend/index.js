const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.get('/', (req, res) => {
  res.send('Welcome to UrbanCart API');
});
app.use(express.json());   

mongoose.connect('mongodb://localhost:27017/urbancart')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});