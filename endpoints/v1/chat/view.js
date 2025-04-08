const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.get('/chat/view', async (req, res) => {
    let chat = await utils.readDataFile("chat");

    res.json({
        chat
    });
});

module.exports = router;