// variables
let dataPath = "./moderation/";

// imports
const {viewFilter, removeFromFilter, addToFilter, filterText, BLfilterText} = require(`${dataPath}filter.js`);

// exports
module.exports = {
    viewFilter, removeFromFilter, addToFilter, filterText, BLfilterText
}