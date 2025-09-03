const fs = require('fs');
const path = require('path');
const client = require('https');

function downloadPfp(url, id) {
    let filepath = path.join(__dirname, `../../data/profiles/${id}/profilePicture`);
    client.get(url, (res) => {
        res.pipe(fs.createWriteStream(filepath));
    });
}

module.exports = {downloadPfp}