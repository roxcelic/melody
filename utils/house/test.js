const fs = require('fs');
const path = require('path');

function makefolder(inputPath) {
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    const fullPath = path.join(dataDir, inputPath);
    fs.mkdirSync(fullPath, { recursive: true });
    return fullPath;
}

module.exports = { makefolder };