const fs = require('fs');
const path = require('path');

const {makefolder} = require('./test');

// to write to a file
async function writeDataFile(name, content, extention = ".json", format = true){
    let dataFilePath = path.join(__dirname, `../../data/${name}${extention}`); 

    let modified_content = content;
    if (format) modified_content = JSON.stringify(content);

    fs.writeFileSync(dataFilePath, modified_content);

    return true;
}

function getDataPath() {
    return path.join(__dirname, `../../data/`);
}

// to read a file
async function readDataFile(name, extention = ".json"){
    let dataFilePath = path.join(__dirname, `../../data/${name}${extention}`); 

    if (!fs.existsSync(dataFilePath)) {
        return "empty";
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

// delete data file
async function deleteDataFile(name, extention = ".json") {
    let dataFilePath = path.join(__dirname, `../../data/${name}${extention}`); 

    fs.unlink(dataFilePath, (err => {
        if (err) console.log(err);
    }));
}

// get file path
async function getPaths(method = 0) {
    if (method == 0) dataFilePath = path.join(__dirname, `../../data/uploads/`); 
    else if (method == 1) dataFilePath = path.join(__dirname, `../../data/blog/`);
    else if (method == 2) dataFilePath = path.join(__dirname, `../../data/chat/`);
    else dataFilePath = path.join(__dirname, `../../data/uploads/`);

    try {
        let filepaths = [];
        
        if (fs.existsSync(dataFilePath)){
            fs.readdirSync(dataFilePath).forEach(file => {
                filepaths.push(file);
            });
        }
    
        return filepaths;
    } catch (e) {
        console.log(e);

        return null;
    }
}

module.exports = { writeDataFile, readDataFile, deleteDataFile, getPaths, getDataPath };