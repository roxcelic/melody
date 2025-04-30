const fs = require('fs');
const path = require('path');

async function readDataFile(name, extention = ".json"){
    let dataFilePath = path.join(__dirname, `../../data/${name}${extention}`); 

    if (!fs.existsSync(dataFilePath)) {
        return [];
    }

    const data = fs.readFileSync(dataFilePath, 'utf8');
    let message;

    try {
        message = JSON.parse(data);
    } catch (e) {
        message = data;
    }
    
    return message;
}

async function newChatId(file = "chat"){
    let chat = await readDataFile(file);
    let finalMessage = chat[0] != undefined ? chat[chat.length - 1] : [];

    return finalMessage[2] != undefined ? finalMessage[2] + 1 : 0;
}

module.exports = { newChatId };