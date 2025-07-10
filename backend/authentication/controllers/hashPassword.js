const argon2 = require('argon2');

const hashPassword = async (saltedPassword) => {
    try {
        const hash = await argon2.hash(saltedPassword);
        return hash
    } catch (error) {
        console.error('Error hashing password:', error);
        return null; // Return null in case of an error
    }
}
module.exports = hashPassword;
