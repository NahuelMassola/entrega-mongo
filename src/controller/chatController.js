import BdChatManager from "../dao/mongoManager/BdChatManager.js";
import mensajesChat from "../utils/mensajesChats.js";

const Chats = new BdChatManager;
const mensajesChats = new mensajesChat;

class chatController {
    constructor() {}
        getSendMessage = async (req ,res) => {
            const getMessage = await Chats.getMessage()
            if (!getMessage){
                return res.json({
                msg: 'No se puedo Visualizar Mensajes',
            });      
            }else{
                return res.json({
                msg: 'Chats',
                chats:getMessage
            });     
        }
    }

    sendMessage = async (req , res) => {
        const message = req.body
        const saveMessage = await Chats.sendMessage(message)

        if (!saveMessage){
            return res.json({
            msg: 'No se puedo enviar Mensaje',
        });      
        }else{
            mensajesChats.emitMessage(saveMessage)     
            return res.json({
                msg: 'Mensaje Enviado',
                playlist:saveMessage,
            })  
        }
    }

    deleteMessage = async (req, res)=>{
        const id = req.params.chid
        const deleteMessaje = await Chats.deleteMessage(id)
        if (!deleteMessaje){
            return res.json({
            msg: 'No se pudo eliminar',
        });      
        }else{
            mensajesChats.emitDeleteMj(deleteMessaje)
            return res.json({
            msg: 'Mensaje Eliminado',
            chats: deleteMessaje
        });      
        } 
    }
}

export default chatController; 