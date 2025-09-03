const fs = require('fs');
const path = require('path');

// to read a file
async function readDataFile(name, extention = ".json"){
    let dataFilePath = path.join(__dirname, `../../data/${name}${extention}`); 

    if (!fs.existsSync(dataFilePath)) {
        return {};
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

module.exports = { readDataFile };