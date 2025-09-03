const { readDataFile } = require("./readDataFile");
const { writeDataFile } = require("./writeDataFile");
const { makefolder } = require("./makeFolder");

async function editProfileFile(profileId, file, data) {
    try {
        let path = makefolder(`profiles/${profileId}`);

        writeDataFile(`profiles/${profileId}/${file}`, data);
    } catch (e) {
        console.log("error writing to file..");
    }
}

module.exports = {editProfileFile};