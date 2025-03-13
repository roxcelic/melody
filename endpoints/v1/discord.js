const express = require('express');
const utils = require('../../utils');
const router = express.Router();

let myCache = require('../../cache')

router.get('/discord', async (req, res) => {
    let userInfo = myCache.get( "discord" );

    if (userInfo == undefined){
        userInfo = await utils.getUserInfo();
    
        myCache.set( "discord", userInfo, 1800 );
    }
    res.json({ userInfo });
});

module.exports = router;