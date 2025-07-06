const createUserId = (username,email) => {
    const uniqueNum = Math.floor(Math.random() * 1000);
    const Alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for(let i=0;i<4;i++){
        const randomChar = Alphabets.charAt(Math.floor(Math.random() * Alphabets.length));
    }
    const userId = username + randomChar + uniqueNum+ email.split('@')[0] + new Date().getTime() ;
}

module.exports = createUserId;