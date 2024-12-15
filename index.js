require('dotenv').config();
const NodeCache = require( "node-cache" );
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { getstatus, getimage } = require('./utils/utils');
const { getCurrentlyPlaying, getPlaylists } = require('./utils/spotify_utils');
const { getUserInfo } = require('./utils/discord_utils');
const { fetchUserPosts } = require('./utils/bluesky_utils');

const app = express();
const PORT = process.env.PORT || 3000;
const myCache = new NodeCache();

const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(cors());

app.use(limiter);
app.set('trust proxy', 1);

app.get('/', async (req, res) => {

    let mainData = {
        currentlyPlaying: {},
        Playlists: {},
        random: "",
    };

    if (myCache.get( "spotify" )){
        mainData = myCache.get( "spotify" );
    } else {
        mainData.currentlyPlaying = await getCurrentlyPlaying();
        mainData.random = Date.now();
        mainData.Playlists = await getPlaylists();
    
        myCache.set( "spotify", mainData, 15 );
    }

    mainData.Playlists = mainData.Playlists.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        link: playlist.external_urls.spotify,
        owner: {
            display_name: playlist.owner.display_name,
            link: playlist.owner.external_urls.spotify
        }
    }));

    let orderedData = {
        time: {
            progress_ms: mainData.currentlyPlaying.progress_ms || null,
            duration_ms: mainData.currentlyPlaying.item?.duration_ms || null,
            percent: mainData.currentlyPlaying.progress_ms / mainData.currentlyPlaying.item?.duration_ms * 100 || null,
            paused: !mainData.currentlyPlaying?.is_playing || false,
            local: mainData.currentlyPlaying.item?.is_local || false,
            cached_time: mainData.random
        },
        track: {
            name: mainData.currentlyPlaying.item?.name || null,
            artists: mainData.currentlyPlaying.item?.artists || null,
            album: mainData.currentlyPlaying.item?.album.name || null,
            id: mainData.currentlyPlaying.item?.id || null,
            cover: mainData.currentlyPlaying.item?.album.images || null
        },
        embeds: {
            artists: mainData.currentlyPlaying.item?.artists.map(artist => 
                `https://open.spotify.com/embed/artist/${artist.id}`
            ),
            track: `https://open.spotify.com/embed/track/${mainData.currentlyPlaying.item?.id || null}`,
            album: `https://open.spotify.com/embed/album/${mainData.currentlyPlaying.item?.album.id || null}`,
            top_playlist: `https://open.spotify.com/embed/playlist/${mainData.Playlists[0]?.id || null}`
        }
    }

    res.json(orderedData);
});

app.get('/discord', async (req, res) => {
    let userInfo = myCache.get( "discord" );

    if (userInfo == undefined){
        userInfo = await getUserInfo();
    
        myCache.set( "discord", userInfo, 1800 );
    }
    res.json({ userInfo });
});

app.get('/status', async (req, res) => {
    const status = await getstatus();
    res.json({ status });
});

app.get('/image', async (req, res) => {
    const image = await getimage();
    res.json({ image });
});

app.get('/bsky', async (req, res) => {
    let userInfo = myCache.get( "bsky" );

    if (userInfo == undefined){
        userInfo = await fetchUserPosts('roxcelic.love');
    
        myCache.set( "bsky", userInfo, 3600 );
    }

    res.json(userInfo);
})

app.get('/github', async (req, res) => {
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
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
