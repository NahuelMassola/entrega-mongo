import { Router } from 'express';
import chatController from '../controller/chatController.js'


const chatsRouter = Router();

chatsRouter.get("/" , chatController);



export default chatsRouter;