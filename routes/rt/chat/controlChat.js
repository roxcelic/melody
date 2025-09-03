const express = require('express');
const router = express.Router();

const { adminLock } = require("../../../utils/accounts");
const { readDataFile, writeDataFile } = require("../../../utils/files");

router.get('/chat/', adminLock, async (req, res) => {
    try {
        let chatroom = req.query.chat ? `chat/${req.query.chat}` : "chat";
        let chat = await readDataFile(chatroom);
        if (chat == {} || Object.entries(chat).length === 0) chat = [];

        let target = 0;
        try {
            target = parseInt(req.query.target || 0);
        } catch (e) {
            console.log(e.message);
        }

        console.log(target);
        chat = chat.filter((chat) => {
            return chat.chatID != target;
        });

        await writeDataFile(chatroom, chat);

        res.json({
            status: "online",
            chat,
            target
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;