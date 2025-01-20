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
            return parseBskyData(nonReplyPost, profileResponse.data);
        } else {
            return null;
        }

    } catch (error) {
        console.log(error.code);
        return "error";
    }
}

async function parseBskyData(postData, profileData) {
    const contents = {
        post: {
            text: postData.post.record.text,
            embeds: postData.post.embed?.images.map(img => ({
                "alt": img?.alt || null,
                "url": img?.thumb || null
            }))
        },
        profile: {
            handle: postData.post.author.handle,
            displayName: postData.post.author.displayName,
            avatar: postData.post.author.avatar,
            banner: profileData.banner,
            description: profileData.description
        }
    };

    return contents;
}

module.exports = { fetchUserPosts };
