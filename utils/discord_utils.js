const axios = require('axios');

const getUserInfo = async () => {
    try {
        const response = await axios.get(`https://discord.com/api/v10/users/${process.env.DISCORD_ID}`, {
            headers: {
                'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error.response ? error.response.data : error.message);
    }
};

module.exports = { getUserInfo };
