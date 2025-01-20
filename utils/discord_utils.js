const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const getDiscordTokens = () => {
    try {
        const data = JSON.parse(fs.readFileSync('./res.json', 'utf8'));
        return {
            access_token: data.discord.access_token,
            refresh_token: data.discord.refresh_token
        };
    } catch (err) {
        console.error('Error reading Discord tokens:', err);
        return null;
    }
};

const updateDiscordTokens = (newAccessToken, newRefreshToken) => {
    try {
        const data = JSON.parse(fs.readFileSync('./res.json', 'utf8'));
        data.discord.access_token = newAccessToken;
        data.discord.refresh_token = newRefreshToken || data.discord.refresh_token;
        fs.writeFileSync('./res.json', JSON.stringify(data, null, 2));
        console.log('Discord tokens updated.');
    } catch (err) {
        console.error('Error updating Discord tokens:', err);
    }
};

const refreshAccessToken = async () => {
    const { refresh_token } = getDiscordTokens();
    const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
    const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

    try {
        const response = await axios.post('https://discord.com/api/v10/oauth2/token', new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }).toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        updateDiscordTokens(newAccessToken, newRefreshToken);

        return newAccessToken;
    } catch (error) {
        console.log('Error refreshing access token:', error.response ? error.response.data : error.message);
        
        return null;
    }
};

const getUserInfo = async () => {
    const { access_token } = getDiscordTokens();

    try {
        const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return userResponse.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('Access token expired. Refreshing token...');
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken != null) return await getUserInfo(newAccessToken);
            else return null;
        } else {
            throw new Error('Error fetching user info:', error.message);
        }
    }
};

module.exports = { getUserInfo };
