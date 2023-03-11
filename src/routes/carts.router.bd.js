import {Router} from 'express';
import cartControllerBD  from '../controller/cartControllerBD.js';
import BdCartManager from '../dao/mongoManager/bdCartManager.js';

const cartController = new cartControllerBD;
const BdCartManagerbd = new BdCartManager 
const cartRouterDB = Router();

cartRouterDB.get ("/:cid", cartController.getCartIdBd)
cartRouterDB.get ("/", BdCartManagerbd.getAllCart)
//cartRouterDB.post("/" , cartController.addProduct  )
cartRouterDB.post("/:cid/product/:pid", cartController.addProductToCart)




export default cartRouterDB;


