const express = require('express');
const utils = require('../../../utils');
const fs = require('fs');
const router = express.Router();

router.get('/chat/delete', utils.myLogger, async (req, res) => {
    try {
        if (req.query.chatName) {
            let folder = await utils.makefolder(`chat`);
            if (fs.existsSync(`${folder}/${req.query.chatName}.json`)){
                chat = await utils.deleteDataFile(`chat/${req.query.chatName}`);
            }
        }
    
        res.json({"status": "succesfull"});
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;