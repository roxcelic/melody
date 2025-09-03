const express = require('express');
const router = express.Router();

const { isLoggedIn, isAdmin } = require("../../../utils/accounts");
const { readProfileFile, writeDataFile, readDataFile, makefolder } = require("../../../utils/files");
const { filterText } = require("../../../utils/moderation");
const { config } = require("../../../config");

router.post('/chat/send', isLoggedIn, async (req, res) => {
    try {
        makefolder("chat");
        
        let chatroom = req.query.chat ? `/chat/${req.query.chat}` : "chat"
        if (chatroom == "chat/admin" && ! await isAdmin(req.cookies.username)) chatroom = "chat";
        
        chat = await readDataFile(chatroom);
        if (chat == {} || Object.entries(chat).length === 0) chat = [];

        if (chat == [] && !await isAdmin(req.cookies.username)) {
            res.status(400).send("you are unauthorised to create a chat");
            return;
        }

        let user = await readProfileFile(req.cookies.username, "profile");

        let message = await filterText(req.body.message);
        if (message === null || message.match(/^ *$/) !== null) throw new Error("empty chat messages are not allowed.");

        let newChatMessage = {
            chatID: ((chat[chat.length - 1]?.chatID || 0) + 1),
            message: message,
            user: {
                id: req.cookies.username,
                username: user.username,
                pfp: `/api/users/${req.cookies.username}/pfp`
            }
        }

        chat.push(newChatMessage);
        while (chat.length > config.chat.size) chat.shift();

        await writeDataFile(chatroom, chat);

        res.json({
            status: "succesfull"
        });

    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
});

module.exports = router;