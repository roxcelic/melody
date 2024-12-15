const axios = require('axios');
require('dotenv').config();

async function fetchUserPosts(handle) {
    const BASE_URL = 'https://bsky.social/xrpc';

    const USERNAME = process.env.BLUESKY_USERNAME;
    const PASSWORD = process.env.BLUESKY_PASSWORD;

    try {
        const authResponse = await axios.post(`${BASE_URL}/com.atproto.server.createSession`, {
            identifier: USERNAME,
            password: PASSWORD,
        });

        const accessToken = authResponse.data.accessJwt;

        const profileResponse = await axios.get(`${BASE_URL}/app.bsky.actor.getProfile`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { actor: handle },
        });

        const userDid = profileResponse.data.did;

        const postsResponse = await axios.get(`${BASE_URL}/app.bsky.feed.getAuthorFeed`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { actor: userDid },
        });

        const nonReplyPost = postsResponse.data.feed.find(post => !post.reply);

        if (nonReplyPost) {
            return nonReplyPost;
        } else {
            return null;
        }

    } catch (error) {
        return "error";
    }
}

async function parseBskyData(data) {
    const contents = {
        post: {
            text: data.post.record.text,
            embeds: data.post.embed.images.map(img => ({
                "alt": img?.alt || null,
                "url": img?.thumb || null
            }))
        },
        profile: {
            handle: data.post.author.handle,
            displayName: data.post.author.displayName,
            avatar: data.post.author.avatar,
        }
    };

    return contents;
}



module.exports = { fetchUserPosts, parseBskyData };
