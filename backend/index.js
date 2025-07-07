const express = require('express');
const app = express();
const mongoose = require('mongoose');
const signUp= require('./routes/SignUp')
const login = require('./routes/login');
const refresh = require('./routes/refresh');
app.use(express.json()); 
app.get('/', (req, res) => {
  res.send('Welcome to UrbanCart API');
});
app.use('/signup', signUp);
app.use('/login', login);
app.use('/refresh', refresh);

mongoose.connect('mongodb://localhost:27017/urbancart')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection failed!');
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});