const express = require('express');
const utils = require('../../../utils');
const router = express.Router();
const fs = require('fs');

router.get('/chat/makechat', utils.myLogger, async (req, res) => {
    try {
        if (req.query.chatName) {
            let folder = await utils.makefolder(`chat`);
    
            if (!fs.existsSync(`${folder}/${req.query.chatName}.json`)){
                utils.writeDataFile(`chat/${req.query.chatName}`, []);
            }
        }
    
        res.json({status: "succesfull"});
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;