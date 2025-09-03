const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const config = require("../../../config");
const { adminLock } = require("../../../utils/accounts");
const {readProfileFile, editProfileFile} = require("../../../utils/files");

router.get('/admin', adminLock, async (req, res) => {
    let dataFilePath = path.join(__dirname, `../../../data/`); 
    let users = fs.readdirSync(`${dataFilePath}/profiles`);
    users = await Promise.all(users.map(async (user) => {
        return {
            userId: user,
            hyperLinks: {
                userURL: `https://roxcelic.love/profile/?user=${user}`,
                profilePicture: `/api/users/${user}/pfp`,
                banner: `/api/users/${user}/banner`
            },
            userData: await readProfileFile(user, "profile")
        }
    }));


    try {
        let adminData = {
            users,
            config
        }

        res.json(adminData);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});

module.exports = router;