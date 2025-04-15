const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.post('/chat/post', async (req, res) => {
    let text = req.body;

    let chat = await utils.readDataFile("chat");
    let id = await utils.newChatId();
    console.log(id);
    
    chat = chat == "empty" ? [] : chat;

    chat.push([text.upload || "", text.color || "#fff", await utils.newChatId()]);

    while (chat.length > 99) chat.shift();
    utils.writeDataFile("chat", chat);

    res.json({"status": "succesfull"});
});

module.exports = router;