// variables
let dataPath = "./files/";

// imports
const { readDataFile } = require(`${dataPath}readDataFile.js`);
const { writeDataFile } = require(`${dataPath}writeDataFile.js`);
const { makefolder } = require(`${dataPath}makeFolder.js`);
const { deleteDataFile } = require(`${dataPath}deleteDataFile.js`);
const { editProfileFile } = require(`${dataPath}editProfileFile.js`);
const { readProfileFile } = require("./files/readProfileFile");
const { profileFolderExists } = require(`${dataPath}profileFolderExists.js`);
const { downloadPfp } = require(`${dataPath}downloadPfp.js`);

// exports
module.exports = {
    readDataFile,
    writeDataFile,
    makefolder,
    deleteDataFile,
    editProfileFile,
    readProfileFile,
    profileFolderExists,
    downloadPfp
}