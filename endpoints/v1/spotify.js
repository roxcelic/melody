const express = require('express');
const utils = require('../../utils');
const router = express.Router();

let myCache = require('../../cache');

router.get('/spotify', async (req, res) => {
    let mainData;

    if (myCache.get( "spotify" )){
        mainData = myCache.get( "spotify" );
    } else {
        mainData = await utils.getCurrentlyPlaying();
    
        myCache.set( "spotify", mainData, 15);
    }

    res.json(mainData);
});


module.exports = router;