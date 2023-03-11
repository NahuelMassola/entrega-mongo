import BdChatManager from "../dao/mongoManager/BdChatManager.js";

const Chats = new BdChatManager;

class chatController {

        getSenMessage = async (req ,res) => {
        console.log('hola');
    }
}

export default chatController; 