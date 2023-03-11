import { Router } from "express";
import ProductManager from "../Controller/ProductManager.js";
import emitDeleteProduct from "../utils/socket.io.js"

const viewsRouter = Router(); 
const Product = new ProductManager();

viewsRouter.get("/" , async (req ,res) => {
    const  allProducts  = await Product.getProducts();
    res.render( "home" , {
    title: "express handlebars" ,
    allProducts
    })
})

viewsRouter.get("/realtimeproducts" , async (req ,res) => {
    const  allProducts  = await Product.getProducts();
    res.status(200).render('realTimeProducts' , {
    allProducts
    })
})

viewsRouter.delete('/realtimeproducts/:pid' , async (req , res ) => {
    const id = req.params.pid 
    const Delete = await Product.deleteProduct(id);
    res.status(200).json(Delete)
})


export default viewsRouter;