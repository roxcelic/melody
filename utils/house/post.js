const {readDataFile} = require('./files');

async function CheckPost(post) {
    let maxLength = process.env.MAXLENGTH || 4000;

    let filter = await readDataFile('filter');
    filter = filter != "empty" ? filter: [];
    
    let can_continue = true;

    let splitChat = post.upload.split(" ");
    let splitName = post.name.split(" ");

    if (!filterChat(splitChat, filter) || !filterChat(splitName, filter)){
        can_continue = false;
    }

    if (
        // basic checks
        post.upload == "" ||
        post.name == "" ||
        post.upload == " " ||
        post.name == " " ||

        // length
        post.name.length > maxLength ||
        post.upload.length > maxLength
    ){
        can_continue = false;
    }

    return can_continue;
}

function filterChat(split, filter){
    split.forEach(word => {
        if (filter.includes(word)){
            return false;
        }
    });
    return true;
}

module.exports = { CheckPost }