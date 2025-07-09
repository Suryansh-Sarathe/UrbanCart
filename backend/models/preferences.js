const mongoose = require('mongoose');
const { categories } = require('./main');
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
        validate: {
            validator: function(value) {
                return categories.some(category => category._id.toString() === value.toString());
            },
            message: props => `${props.value} is not a valid category`
        },
    }],
    priceRange: {
        min: {
            type: Number,
            required: true,
            default: 0
        },
        max: {
            type: Number,
            required: true,
            default: 10000
        }
    },
    brands: [{
        type: String,
        required: true
    }],
    ratings: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    sortBy: {
        type: String,
        enum: ['price', 'rating', 'popularity'],
        default: 'popularity'
    },
    sortOrder: {
        type: String,
        enum: ['asc', 'desc'],
        default: 'asc'
    }
}, { timestamps: true });

const Preferences = mongoose.model('Preferences', preferencesSchema);
module.exports = Preferences;