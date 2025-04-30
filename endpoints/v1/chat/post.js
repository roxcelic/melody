const express = require('express');
const utils = require('../../../utils');
const router = express.Router();
const fs = require('fs');

router.post('/chat/post', async (req, res) => {
    let text = req.body;
    
    if (req.body.chatName) {
        let folder = await utils.makefolder(`chat`);

        if (fs.existsSync(`${folder}/${req.body.chcatName}`) || utils.IsAdmin(req, res)){
            let chat = await utils.readDataFile(`chat/${req.body.chatName}`);

            chat = chat == "empty" ? [] : chat;
    
            chat.push([
                text.upload || "", 
                text.color || "#fff", 
                await utils.newChatId(`chat/${req.body.chatName}`), 
                text.name || "", 
                new Date()
            ]);
        
            while (chat.length > 99) chat.shift();
            utils.writeDataFile(`chat/${req.body.chatName}`, chat);
        
            res.json({"status": "succesfull"});
        } else {
            res.json({"status": "evil do-er"});
        }
    } else {
        let chat = await utils.readDataFile("chat");

        chat = chat == "empty" ? [] : chat;
    
        chat.push([
            text.upload || "", 
            text.color || "#fff", 
            await utils.newChatId(`chat/${req.body.chatName}`), 
            text.name || "", 
            new Date()
        ]);
    
        while (chat.length > 99) chat.shift();
        utils.writeDataFile("chat", chat);
    
        res.json({"status": "succesfull"});
    }
});

module.exports = router;