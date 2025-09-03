const express = require('express');
const router = express.Router();

const { adminLock } = require("../../../utils/accounts");
const { deleteDataFile } = require("../../../utils/files");

router.get('/chat/delete', adminLock, async (req, res) => {
    try {
        let chatroom = req.query.chat ? `chat/${req.query.chat}` : "chat";
        await deleteDataFile(chatroom);

        res.json({
            status: "succesfull",
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;