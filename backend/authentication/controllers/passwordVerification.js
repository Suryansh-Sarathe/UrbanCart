const argon2 = require('argon2');

const passwordVerification = async (saltedpassword, hashedPassword) => {
    try {
        // Verify the password against the hashed password
        const isValid = await argon2.verify(hashedPassword, saltedpassword);
        
        if (isValid) {
            return  {value:true,error:null}
        } else {
            return {value:false,error:"Invalid Password"}
        } 
    }catch (e) {
        return {value:null,error:e}; // Return null in case of an error
    }
}

module.exports = passwordVerification;