const fs = require('fs');
const path = require('path');

// to write to a file
async function writeDataFile(name, content){
    let dataFilePath = path.join(__dirname, `../../data/${name}.json`); 

    let modified_content = JSON.stringify(content);

    fs.writeFileSync(dataFilePath, modified_content);

    return true;
}

// to read a file
async function readDataFile(name){
    let dataFilePath = path.join(__dirname, `../../data/${name}.json`); 

    if (!fs.existsSync(dataFilePath)) {
        return null;
    }

    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
}

// delete data file
async function deleteDataFile(name) {
    let dataFilePath = path.join(__dirname, `../../data/${name}`); 

    fs.unlink(dataFilePath, (err => {
        if (err) console.log(err);
    }));
}

// get file path
async function getPaths(method = 0) {
    let dataFilePath;

    if (method == 0) dataFilePath = path.join(__dirname, `../../data/uploads/`); 
    else if (method == 1) dataFilePath = path.join(__dirname, `../../data/blog/`);

    try {
        let filepaths = [];

        fs.readdirSync(dataFilePath).forEach(file => {
            filepaths.push(file);
        });
    
        return filepaths;
    } catch (e) {
        console.log(e);

        return null;
    }
}

module.exports = { writeDataFile, readDataFile, deleteDataFile, getPaths };