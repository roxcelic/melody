const axios = require('axios');
const fs = require('fs');

// returns my currently playing song
async function getCurrentlyPlaying() {
    let ACCESS_TOKEN = getSpotifyTokens().access_token;

    try {
        let response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });

        if (response.status === 200 && response.data) {
            return response.data;
        } else if (response.status === 204) {
            return "No song is currently playing";
        } else if (response.status === 401) {
            ACCESS_TOKEN = await refreshSpotifyAccessToken();
            if (ACCESS_TOKEN) {
                response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        'Authorization': `Bearer ${ACCESS_TOKEN}`
                    }
                });
                return response.data;
            }
        }
    } catch (error) {
        return "):";
    }
}

// returns a list of all the public playlists on my account
async function getPlaylists() {
    let ACCESS_TOKEN = getSpotifyTokens().access_token;
    const url = 'https://api.spotify.com/v1/me/playlists';

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 401) {
        ACCESS_TOKEN = await refreshSpotifyAccessToken();
        if (ACCESS_TOKEN) {
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });
        }
    }

    if (!response.ok) {
        return [];
    }

    const data = await response.json();
    return data.items;
}

// returns my access token and refresh token
const getSpotifyTokens = () => {
    try {
        const data = JSON.parse(fs.readFileSync('./res.json', 'utf8'));
        return {
            access_token: data.spotify.access_token,
            refresh_token: data.spotify.refresh_token
        };
    } catch (err) {
        return null;
    }
};

// refreshes my spotify access tokens
const refreshSpotifyAccessToken = async () => {
    const tokens = getSpotifyTokens();
    if (!tokens || !tokens.refresh_token) {
        return null;
    }

    const { refresh_token } = tokens;
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
        }).toString(), {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token || refresh_token;

        const data = fs.readFileSync("./res.json", 'utf8');
        let jsonData = JSON.parse(data);

        if (newAccessToken) {
            jsonData.spotify = {
                access_token: newAccessToken,
                refresh_token: newRefreshToken
            };
            fs.writeFileSync('./res.json', JSON.stringify(jsonData, null, 2));
            return newAccessToken;
        }
    } catch (error) {
        return null;
    }
};

module.exports = { getCurrentlyPlaying, getPlaylists };
