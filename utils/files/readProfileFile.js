const { readDataFile } = require("./readDataFile");

async function readProfileFile(profileId, file) {
    try {
        return await readDataFile(`profiles/${profileId}/${file}`);
    } catch (e) {
        console.log("error reading file:" + e);
        return {};
    }
}

module.exports = { readProfileFile };