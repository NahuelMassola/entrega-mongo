import { Router } from 'express';
import chatController from '../controller/chatController.js'

const chatsController = new chatController


const chatsRouter = Router();

chatsRouter.get("/" , chatsController.getSendMessage);
chatsRouter.post("/" , chatsController.sendMessage);
chatsRouter.delete("/:chid" , chatsController.deleteMessage);


export default chatsRouter;