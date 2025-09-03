const fs = require('fs');
const path = require('path');

async function deleteDataFile(name, extention = ".json") {
    let dataFilePath = path.join(__dirname, `../../data/${name}${extention}`); 

    fs.unlink(dataFilePath, (err => {
        if (err) console.log(err);
    }));
}

module.exports = { deleteDataFile };