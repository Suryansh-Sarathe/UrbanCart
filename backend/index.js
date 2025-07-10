const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({path: '../.env'});
const authenticationRoutes = require('./authentication/routes/main');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/urbancart', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send('Welcome to UrbanCart API');
});

app.use('/api/auth', authenticationRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}); 
