
const addSaltToPassword = (password) => {

    const salt = process.env.PASSWORD_SALT;
    const newSalt = ""
    const saltedPassword = ""
    for (let i = 0; i < 8; i++) {
        newSalt += salt[i];
        newSalt+= password[i]? password[i] : "";
    }
    saltedPassword = newSalt + password.slice(8);
    return saltedPassword;
}

module.exports = addSaltToPassword;
