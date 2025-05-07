const express = require('express');
const utils = require('../../utils');
const router = express.Router();

let myCache = require('../../cache');

router.get('/github', async (req, res) => {
    try {
        let userInfo = myCache.get( "github" );

        if (userInfo == undefined){
            try {
                userInfo = await fetch(`https://api.github.com/users/roxcelic`);
                userInfo = await userInfo.json();
            } catch (e){
                userInfo = "error";
            }
        
            myCache.set( "github", userInfo, 60 );
        }
    
        res.json(userInfo);
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;