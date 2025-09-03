const { readDataFile, writeDataFile } = require("../files");

async function viewFilter() {
    let data = await readDataFile("filter");
    if (!Array.isArray(data)) data = [];

    return data;
}

async function removeFromFilter(item) {
    let data = await readDataFile("filter");
    if (!Array.isArray(data)) data = [];

    if (data.includes(item)) data = data.filter((word) => word != item);
    await writeDataFile("filter", data);
}

async function addToFilter(item) {
    let data = await readDataFile("filter");
    if (!Array.isArray(data)) data = [];

    if (!data.includes(item)) data.push(item);
    await writeDataFile("filter", data);
}

async function filterText(textToFilter) {
    let filter = await viewFilter();
    let text = textToFilter;
    
    filter.forEach(item => {
        text = textToFilter.replaceAll(item, "*".repeat(item.length))
    });

    return text;
}

async function BLfilterText(textToFilter) {
    let text = filterText(textToFilter);
    console.log(text);

    return text == textToFilter;
}

module.exports = {viewFilter, removeFromFilter, addToFilter, filterText, BLfilterText}