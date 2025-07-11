const express = require("express");
const router = express.Router();
const { user } = require('../models/main');
const {verifyAccessToken} = require('../authentication/controllers/main')

router.patch('/', async (req, res) => {

    const accessToken = req.cookies.accessToken;
    const tokenDecoded = await verifyAccessToken(accessToken);
    if(!tokenDecoded){
        res.status(401).json({ error: "Unauthorized"});
    }
    
    try {
        const updatedUserInfo = req.body;

        const oldUser = await user.findByIdAndUpdate(
            tokenDecoded.id,
            updatedUserInfo,
            { new: true } 
        );
        
        if (!oldUser) {
            return res.status(400).json({error:"Failed to retrieve user through Id"});
        }
        else
            return res.status(200).json({message:"Updated successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Server error"});
    }
});

module.exports = router;