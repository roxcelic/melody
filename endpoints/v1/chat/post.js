const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.post('/chat/post', async (req, res) => {
    let text = req.body;

    let chat = await utils.readDataFile("chat");
    chat = chat == "empty" ? [] : chat;

    chat.push([text.upload || "", text.color || "#fff"]);

    if (chat.length > 99) chat.length = 99;
    utils.writeDataFile("chat", chat);

    res.json({"status": "succesfull"});
});

module.exports = router;