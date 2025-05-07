const express = require('express');
const utils = require('../../utils');
const router = express.Router();

const myCache = require('../../cache');

router.get('/bsky', async (req, res) => {
    try {
        let userInfo = myCache.get( "bsky" );

        if (userInfo == undefined){
            userInfo = await utils.fetchUserPosts('roxcelic.love');
        
            myCache.set( "bsky", userInfo, 3600 );
        }
    
        res.json(userInfo);
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;