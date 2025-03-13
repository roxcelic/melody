const express = require('express');
const utils = require('../../utils');
const router = express.Router();

const myCache = require('../../cache');

router.get('/bsky', async (req, res) => {
    let userInfo = myCache.get( "bsky" );

    if (userInfo == undefined){
        userInfo = await utils.fetchUserPosts('roxcelic.love');
    
        myCache.set( "bsky", userInfo, 3600 );
    }

    res.json(userInfo);
})

module.exports = router;