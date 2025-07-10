const { user } = require('./models/main');
const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/urbancart', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');

        const users = await user.find({});
        console.log(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

main();

