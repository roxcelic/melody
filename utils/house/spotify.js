const fs = require('fs');
const { readDataFile, writeDataFile } = require(`./files`);
const path = require('path');
const { timeStamp } = require('console');

async function getCurrentlyPlaying() {
    let tokens = await getSpotifyTokens();

    try {
        let response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokens.access_token}`
            }
        });
        let data = await response.json();

        if (data?.error && data.error.status == 401){
            if (await refreshToken()) {
                tokens = await getSpotifyTokens();
                
                response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${tokens.access_token}`
                    }
                });

                data = await response.json();
            }
            else return null;
        }

        return data;
    } catch (e) {
        return null;
    }
}

async function refreshToken() {
    try {
        let tokens = await readDataFile("res");

        let clientId = process.env.SPOTIFY_CLIENT_ID;
        let url = "https://accounts.spotify.com/api/token";

        const payload = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(clientId + ':' + process.env.SPOTIFY_CLIENT_SECRET)
            },
            body: new URLSearchParams({
              grant_type: 'refresh_token',
              refresh_token: tokens.spotify.refresh_token,
              client_id: clientId
            }),
        }
    
        const body = await fetch(url, payload);
        const response = await body.json();
        
        tokens.spotify.access_token = response.access_token;
        if (response.refresh_token){
            tokens.spotify.refresh_token = response.refresh_token; 
        }

        writeDataFile("res", tokens);

        return true;
    } catch (e) {
        return false;
    }
}

const getSpotifyTokens = async () => {
    return (await readDataFile("res")).spotify;
};

const parseSpotifyData = async (data) => {
    let parsedData = {
        time: {
            timeStamp: (new Date()).getTime(),
            progress_ms: data?.progress_ms || null,
            duration: data?.item.duration_ms || null
        },
        album: {
            url: data?.item.album.external_urls.spotify || null,
            id: data?.item.album.id || null,
            title: data?.item.album.name || null,
            images: data?.item.album.images || null,
            artists: data?.item.album.artists.map(({ name, id, href }) => ({ name, id, href })) || null
        },
        track: {
            isLocal: data?.item.is_local || null,
            url: data?.item.external_urls.spotify || null,
            id: data?.item.id || null,
            title: data?.item.name || null,
            artists: data?.item.artists.map(({ name, id, href }) => ({ name, id, href })) || null,
        },
        embeds: {
            artist: `https://open.spotify.com/embed/artist/${data?.item.artists[0].id || null}`,
            album: `https://open.spotify.com/embed/album/${data?.item.album.id || null}`,
            track: `https://open.spotify.com/embed/track/${data?.item.id || null}`,
        }
    }

    return parsedData;
};

module.exports = { getCurrentlyPlaying, parseSpotifyData }