import { config } from "../../config.js";
import { isAdmin } from "./isAdmin.js";
import { editProfileFile, readProfileFile, writeDataFile } from "../files.js";
import { viewFilter, removeFromFilter, addToFilter, filterText, BLfilterText } from "../moderation.js";

export async function editAccountData(id, accountSubjects) {
    // format, input in a 2d array of [[key, data],[key, data]]
    if (!Array.isArray(accountSubjects)) throw new Error("account subjects must be a 2d array in the format [[key, data],[key, data]]");

    for (let i = 0; i < accountSubjects.length; i++) {
        let item = accountSubjects[i];

        let profileData = await readProfileFile(id, "profile");

        if (!Array.isArray(item) || item.length != 2) return new Error("each item must be an array in the format [key, data]");
        if (typeof item[0] !== 'string' || typeof item[1] !== 'string') return new Error("both inputs must be a string");    

        console.log(config);

        switch (item[0]) {
            case "username":
                if (item[1].length > config.profile.maxUsernameLength) return new Error(`username is too long, the max amount of characters is: ${config.profile.profile.maxUsernameLength}`);
                item[1] = await filterText(item[1]);
                profileData.username = item[1];
                
                break;
            case "website_link":
                if (item[1].length > config.profile.maxWebsiteLinkLength) return new Error(`website link is too long, the max amount of characters is: ${config.profile.maxWebsiteLinkLength}`);
                item[1] = await filterText(item[1]);
                profileData.website = item[1];
                break;
            case "pronouns":
                let splitPronouns = item[1].split("/");

                if (splitPronouns.length > config.profile.maxPronounCount) return new Error(`too many pronouns, there is a max limit of ${config.profile.splitPronouns} I appologise for any inconvienience`);
                
                let finalPronouns = [];
                splitPronouns.forEach(async (pronoun) => {
                    if (pronoun.length > config.profile.maxPronounLength) return new Error(`sorry the length of pronoun ${pronoun} has exceed the limit of ${config.profile.maxPronounLength}`);
                    finalPronouns.push(pronoun);
                });

                profileData.pronouns = await filterText(finalPronouns.join("/"));

                break;
            case "bio":
                if (item[1].length > config.profile.maxBioLength) return new Error(`bio is too long, the max amount of characters is: ${config.profile.maxBioLength}`);
                item[1] = await filterText(item[1]);
                profileData.bio = item[1];
                
                break;
            case "color":
                if (item[1].length > config.profile.maxColorLength) return new Error(`what kind of color are you trying to change it to, seriously lmao`);

                if (! await isAdmin(id)) {
                    profileData.color = "#fff"
                } else {
                    profileData.color = item[1];
                }

                break;
        }

        console.log(`case: ${item[0]}. profile data: ${JSON.stringify(profileData)}`);
        await editProfileFile(id, "profile", profileData);        
    }
}