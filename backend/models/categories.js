const mongoose = require('mongoose');
const categoriesSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Categories = mongoose.model('Categories', categoriesSchema);
module.exports = Categories;