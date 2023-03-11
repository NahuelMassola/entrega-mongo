import {Router} from 'express';
import productControllerBD  from '../controller/productControllerBD.js';

const productController = new productControllerBD;
const productRouterDB = Router();

productRouterDB.get ("/", productController.getProductBd)
productRouterDB.post("/", productController.addProductBD)
productRouterDB.get ("/:pid",  productController.getProductId)
productRouterDB.delete ("/:pid",  productController.deleteProductBD)
productRouterDB.put ("/:pid",  productController.UpdateProductBD)





export default productRouterDB;