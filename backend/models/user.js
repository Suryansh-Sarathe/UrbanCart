const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['Male','Female','Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    address: {
        street: { type: String},
        city: { type: String , required: true },
        state: { type: String, required: true },
        pinCode: { type: String },
        country: { type: String, required: true }
    },
    phone: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
module.exports = User;