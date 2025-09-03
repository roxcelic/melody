const { readProfileFile } = require("../files");
const { config } = require("../../config");

async function isAdmin(id) {
    if (id == config.system.owner) return true;
    
    return (await readProfileFile(id, "profile")).admin || false;
}

module.exports = {isAdmin};