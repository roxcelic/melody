const express = require('express');
const utils = require('../../utils');
const router = express.Router();

let myCache = require('../../cache');

router.get('/spotify', async (req, res) => {
    let mainData;

    if (myCache.get( "spotify" )){
        mainData = myCache.get( "spotify" );

        let currentTime = (new Date()).getTime();

        mainData.time.progress_ms = mainData.time.progress_ms + (currentTime - mainData.time.timeStamp);
        mainData.time.timeStamp = currentTime;
    } else {
        let spotifyData = await utils.getCurrentlyPlaying();

        mainData = await utils.parseSpotifyData(spotifyData);
    
        myCache.set( "spotify", mainData, 15);
    }

    res.json(mainData);
});


module.exports = router;