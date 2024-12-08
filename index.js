require('dotenv').config();
const fs = require('fs');
const express = require('express');

const { getstatus, getimage } = require('./utils/utils');
const { getCurrentlyPlaying, getPlaylists } = require('./utils/spotify_utils');
const { getUserInfo } = require('./utils/discord_utils');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const currentlyPlaying = await getCurrentlyPlaying();
    let Playlists = await getPlaylists();

    Playlists = Playlists.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        link: playlist.external_urls.spotify,
        owner: {
            display_name: playlist.owner.display_name,
            link: playlist.owner.external_urls.spotify
        }
    }));


    res.json({ 
        time: {
            progress_ms: currentlyPlaying.progress_ms || null,
            duration_ms: currentlyPlaying.item?.duration_ms || null,
            percent: currentlyPlaying.progress_ms / currentlyPlaying.item?.duration_ms * 100 || null
        },
        track: {
            name: currentlyPlaying.item?.name || null,
            artists: currentlyPlaying.item?.artists || null,
            album: currentlyPlaying.item?.album.name || null
        },
        embeds: {
            album: "https://open.spotify.com/embed/album/1tTDzjJit4c6TpIEmrytCx",
            top_playlist: `https://open.spotify.com/embed/playlist/${Playlists[0]?.id || null}`
        }

    });
});

app.get('/discord', async (req, res) => {
    const userInfo = await getUserInfo();
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
