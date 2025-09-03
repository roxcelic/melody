import { writeDataFile } from "../files.js";
import { config } from "../../config.js";

export async function clearChat() {
    await writeDataFile("chat", [config.chat.defaultChatMessage]);
}