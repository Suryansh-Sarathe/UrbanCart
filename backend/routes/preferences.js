const express = require('express')
const router = express.Router()
const {verifyAccessToken} = require('../authentication/controllers/main')
const {preferences} = require('../models/main')

router.post('/',async (req,res)=>{
    const tokenDecoded = verifyAccessToken(req.cookies.accessToken)
    if(!tokenDecoded){
        return res.status(401).json({"error":"Unauthorized"})
    }
    const categories = req.body.categories;
    if(categories.length < 3){
        return res.status(400).json({"error":"Atleast 3 preferences required!"})
    }

     try {
        const entry = new preferences({
            userId: tokenDecoded.id,
            categories
        })
        await entry.save()
        res.status(201).json({ message: "Preferences saved successfully!" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal server error" })
    }
}
    
)

module.exports = router;