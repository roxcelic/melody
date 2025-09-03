const express = require('express');
const fs = require('fs');
const path = require('path');
const { readProfileFile } = require('../../../utils/files');
const { isLoggedInSafe } = require("../../../utils/accounts");
const { config } = require("../../../config");
const router = express.Router();

// user data
    // public
    router.get('/users/:id', async (req, res) => {
        try {
            let accountData = await readProfileFile(req.params.id, "profile");
            accountData.id = req.params.id;

            res.json(accountData);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    });

    // current user
    router.get('/user/', async (req, res) => {
        try {
            let accountData = undefined;
            if (await isLoggedInSafe(req, res)) {
                accountData = await readProfileFile(req.cookies.username, "profile");
                accountData.id = req.cookies.username;
            } else {
                accountData = await readProfileFile(config.system.owner, "profile");
                accountData.id = config.system.owner;
            }

            res.json(accountData);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    })

// profile picture
    // public
    router.get('/users/:id/pfp', (req, res) => {
        try {
            const imagePath = path.join(__dirname, `../../../data/profiles/${req.params.id}/profilePicture`);

            if (fs.existsSync(imagePath)){
                res.setHeader('Content-Type', 'image/png');
                res.sendFile(imagePath);
            } else {
                res.send(null);
            }
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    });

    // current user
    router.get('/user/pfp', async (req, res) => {
        try {
            let imagePath = undefined;
            if (await isLoggedInSafe(req, res)) imagePath = path.join(__dirname, `../../../data/profiles/${req.cookies.username}/profilePicture`);
            else imagePath = path.join(__dirname, `../../../data/profiles/${config.system.owner}/profilePicture`);

            if (fs.existsSync(imagePath)){
                res.setHeader('Content-Type', 'image/png');
                res.sendFile(imagePath);
            } else {
                res.send(null);
            }
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    })

// banner
    // public
    router.get('/users/:id/banner', (req, res) => {
        try {
            const imagePath = path.join(__dirname, `../../../data/profiles/${req.params.id}/banner`);

            if (fs.existsSync(imagePath)){
                res.setHeader('Content-Type', 'image/png');
                res.sendFile(imagePath);
            } else {
                res.send(null);
            }
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    });

    // current user
    router.get('/user/banner', async (req, res) => {
        try {
            let imagePath = undefined;
            if (await isLoggedInSafe(req, res)) imagePath = path.join(__dirname, `../../../data/profiles/${req.cookies.username}/banner`);
            else imagePath = path.join(__dirname, `../../../data/profiles/${config.system.owner}/banner`);

            if (fs.existsSync(imagePath)){
                res.setHeader('Content-Type', 'image/png');
                res.sendFile(imagePath);
            } else {
                res.send(null);
            }
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    })

module.exports = router;