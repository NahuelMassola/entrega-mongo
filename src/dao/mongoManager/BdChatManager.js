import chatModel from "../models/chatmodel.js";

class BdChatsManager {
   
    getMessage = async () => {
        try {
            return await chatModel.find();
        } catch (error) {
            return ({message: "dont see the message"})
        }
    }

    sendMessage = async (message) => {
        try {
            return await chatModel.create(message)
        } catch (error) {
            return {message: "dont send the message"}
        }
    }

    deleteMessage = async () => {
        try {
            const deleteMj = await chatModel.findByIdAndDelete(id)
            return deleteMj
        } catch (error) {
            return {msg:'No se puedo Mostrar mensajes'}
        }
    }
}

export default BdChatsManager;