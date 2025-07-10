
const addSaltToPassword = (password) => {

    const salt = process.env.PASSWORD_SALT;

    let newSalt = ""
    let saltedPassword = ""
    for (let i = 0; i < 8; i++) {
        newSalt += salt.charAt(i);
        newSalt+= password.charAt(i)? password.charAt(i) : "";
    }
    saltedPassword = newSalt + password.slice(8);
    return saltedPassword;
}

module.exports = addSaltToPassword;
