const fs = require('fs');
const path = require('path');

async function profileFolderExists(profileId) {
    try {
        let dataPath = path.join(__dirname, `../../data/profiles/${profileId}`);
        console.log(dataPath);

        return await fs.existsSync(dataPath);
    } catch (e) {
        console.log(e);
        console.log("error writing to file..");
    }
}

module.exports = {profileFolderExists};