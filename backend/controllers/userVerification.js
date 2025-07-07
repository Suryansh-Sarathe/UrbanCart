const users = require('../../data/users');

let passwordVerified = false;
let emailVerified = false;
let userId = null;

const userVerification = (user)=>{
    const {email, password } = user;

    users.forEach((existingUser) => {
        if (existingUser.email === email) {
            emailVerified = true;
            userId = existingUser.id;
        }
        if (existingUser.password === password) {
            passwordVerified = true;
        }

    })
    return {
        emailVerified,
        passwordVerified,
        userId
    }
};

module.exports = userVerification;