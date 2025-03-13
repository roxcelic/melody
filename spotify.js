require('dotenv').config();
const utils = require('./utils');
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const port = 3000;

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI } = process.env;

app.get('/', (req, res) => {
  const scope = 'user-read-playback-state user-read-currently-playing';

  const authUrl = `https://accounts.spotify.com/authorize?` +
                  `response_type=code&` +
                  `client_id=${SPOTIFY_CLIENT_ID}&` +
                  `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
                  `scope=${encodeURIComponent(scope)}`;
  res.redirect(authUrl);
});

// Callback route after user authorizes your app
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  const tokenData = querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
  });

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', tokenData, {
      headers: {
        'Authorization': `Basic ${Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    let tokens = {
      spotify: {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token
      }
    }

    utils.writeDataFile("res", tokens);

    res.json({status: true});
  } catch (e) {
    console.log(e);

    res.json({status: false});
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
