const express = require('express');
const router = express.Router();

const { readDataFile } = require("../../../utils/files");
const { isAdmin } = require("../../../utils/accounts");

router.get('/chat/view', async (req, res) => {
    try {
        let chatroom = req.query.chat ? `chat/${req.query.chat}` : "chat"
        if (chatroom == "chat/admin" && ! await isAdmin(req.cookies.username)) chatroom = "chat";
        chat = await readDataFile(chatroom);
        if (chat == {} || Object.entries(chat).length === 0) chat = [];

        res.json({
            status: "online",
            chat,
            chatroom
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;