const mongoose = require('mongoose');
// const { categories } = require('./main');
const preferencesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categories',
        required: true,
    }],
}, { timestamps: true });

const Preferences = mongoose.model('Preferences', preferencesSchema);
module.exports = Preferences;