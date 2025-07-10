const argon2 = require('argon2');

const passwordVerification = async (saltedpassword, hashedPassword) => {
    try {
        // Verify the password against the hashed password
        const isValid = await argon2.verify(hashedPassword, saltedpassword);
        
        if (isValid) {
            return  true
        } else {
            return false
        } 
    }catch (error) {
        return null; // Return null in case of an error
    }
}

module.exports = passwordVerification;