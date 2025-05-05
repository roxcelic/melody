const express = require('express');
const utils = require('../../../utils');
const router = express.Router();
const fs = require('fs');

router.post('/chat/post', async (req, res) => {
    let text = req.body;
    let filter = await utils.readDataFile('filter');
    filter = filter != "empty" ? filter: [];

    let can_continue = true;
    let splitChat = text.upload.split(" ");

    splitChat.forEach(word => {
        if (filter.includes(word)){
            can_continue = false;
        }
    });

    if (text.upload == "" || text.name == ""){
        can_continue = false;
    }

    if (!can_continue){
        res.json({status: "used filtered word"});
    } else if (req.body.chatName) {
        let folder = await utils.makefolder(`chat`);

        if (fs.existsSync(`${folder}/${req.body.chatName}.json`)){
            if (req.body.chatName == "admin" && !(await utils.IsAdmin(req, res))){
                res.json({"status": "evil do-er"});
            } else {
                let chat = await utils.readDataFile(`chat/${req.body.chatName}`);

                chat = chat == "empty" ? [] : chat;
        
                chat.push([
                    text.upload || "", 
                    text.color || "#fff", 
                    await utils.newChatId(`chat/${req.body.chatName}`), 
                    text.name || "", 
                    new Date()
                ]);
            
                while (chat.length > process.env.CHAT_LENGTH) chat.shift();
                utils.writeDataFile(`chat/${req.body.chatName}`, chat);
            
                res.json({"status": "succesfull"});
            }
        } else {
            let chat = await utils.readDataFile("chat");

            chat = chat == "empty" ? [] : chat;
        
            chat.push([
                text.upload || "", 
                text.color || "#fff", 
                await utils.newChatId(), 
                text.name || "", 
                new Date()
            ]);
        
            while (chat.length > process.env.CHAT_LENGTH) chat.shift();
            utils.writeDataFile("chat", chat);
        
            res.json({"status": "succesfull"});
        }
    } else {
        let chat = await utils.readDataFile("chat");

        chat = chat == "empty" ? [] : chat;
    
        chat.push([
            text.upload || "", 
            text.color || "#fff", 
            await utils.newChatId(), 
            text.name || "", 
            new Date()
        ]);
    
        while (chat.length > process.env.CHAT_LENGTH) chat.shift();
        utils.writeDataFile("chat", chat);
    
        res.json({status: "succesfull"});
    }
});

module.exports = router;