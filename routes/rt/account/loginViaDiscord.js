const axios = require('axios');
const express = require('express');
const { request } = require('undici');
const router = express.Router();

// utils
const {editProfileFile} = require("../../../utils/files");
const {logIn, isLoggedInSafe} = require("../../../utils/accounts");

router.get('/account/login', async (req, res) => {
    res.redirect(process.env.DISCORD_CLIENT_REDIRECT);
});

router.get('/account/login/callback', async (req, res) => {
    try {
        let code = req.query.code;
        
        const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.DISCORD_CLIENT_CALLBACK,
                scope: 'identify',
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const oauthData = await tokenResponseData.body.json();
        
        const userResult = await request('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${oauthData.token_type} ${oauthData.access_token}`,
            },
        });

        if (userResult.statusCode != 401) {
            let data = await userResult.body.json();
            await logIn(req, res, data.id, data.global_name, `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`);
            res.redirect(process.env.SUCCESFULL_REDIRECT || "https://roxcelic.love/profile");
        } else {
            res.json({"status": "failed"});
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("internal server error");
    }
});

module.exports = router;