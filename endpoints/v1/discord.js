const express = require('express');
const utils = require('../../utils');
const router = express.Router();

let myCache = require('../../cache')

router.get('/discord', async (req, res) => {
    try {
        let userInfo = myCache.get( "discord" );

        if (userInfo == undefined){
            userInfo = await utils.getUserInfo();
        
            myCache.set( "discord", userInfo, 1800 );
        }
        res.json({ userInfo });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;