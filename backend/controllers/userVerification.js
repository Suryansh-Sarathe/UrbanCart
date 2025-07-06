const users = require('../../data/users');

let passwordVerified = false;
let emailVerified = false;

const userVerification = (user)=>{
    const { email, password } = user;

    users.forEach((existingUser) => {
        if (existingUser.email === email) {
            emailVerified = true;
        }
        if (existingUser.password === password) {
            passwordVerified = true;
        }
    })
    return {
        emailVerified,
        passwordVerified
    }
};

module.exports = userVerification;