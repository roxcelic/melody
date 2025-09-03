const fs = require('fs');
const path = require('path');

// to write to a file
async function writeDataFile(name, content, extention = ".json", format = true){
    let dataFilePath = path.join(__dirname, `../../data/${name}${extention}`);

    let evilCharacters = [':', '*', '?', '"', '<', '>', '|', '#', '%', '‎'];

    let can_continue = true;
    can_continue = fs.existsSync(path.dirname(dataFilePath));

    evilCharacters.forEach(evil => {
        if (name.includes(evil)) can_continue = false;
    });

    if (can_continue){    
        let modified_content = content;
        if (format) modified_content = JSON.stringify(content);
        
        fs.writeFileSync(dataFilePath, modified_content);

        return true;
    } else {
        return false;
    }
}

module.exports = { writeDataFile };