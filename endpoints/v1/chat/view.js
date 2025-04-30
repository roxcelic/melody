const express = require('express');
const utils = require('../../../utils');
const router = express.Router();
const fs = require('fs');

router.get('/chat/view', async (req, res) => {
    let chat = await utils.readDataFile("chat");

    if (req.query.chatName) {
        let folder = await utils.makefolder(`chat`);
    
        if (fs.existsSync(`${folder}/${req.query.chatName}.json`)){
            chat = await utils.readDataFile(`chat/${req.query.chatName}`);
        }
    }

    res.json({
        chat
    });
});

module.exports = router;