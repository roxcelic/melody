export let config = {
    profile: {
        maxUsernameLength: 20,
        maxWebsiteLinkLength: 100,
        maxPronounLength: 5,
        maxPronounCount: 4,
        maxBioLength: 500,
        maxColorLength: 10
    },
    system: {
        owner: "1279883108342304862",
        loginDuration: 9000000
    },
    chat: {
        clearOnStart: true,
        size: 100,
        clearRate: 1000 * 60 * 60 * 24,
        defaultChatMessage: {
            chatID: 1,
            message: "Welcome to the chat, This message will appear upon clearing of the chat (which happens at a scheduled interval). This chatroom is intended to be a demonstration of what I can do. It has a large focus on security and the sourcecode can be seen here: https://git.roxcelic.love/roxcelic/melody This chat has many features such as supporting content embeding and customising profile. Please enjoy your time here, To chat you will need to log in as well as read the TOS https://roxcelic.love/api/login/#TOS_&_TAO (currently under development as of relasing this update)",
            user: {
                id: "000",
                username: "system",
                pfp: "/api/users/1279883108342304862/pfp"
            }
        }
    }
}