import BdProductManager from "../dao/mongoManager/BdProductManager.js";

const Products = new BdProductManager();

class productControllerBD {
    constructor() {}
    
    getProductBd = async (req ,res) => {
        const { limit: limit = ""} = req.body
        const products = await Products.getProduct(limit);
        if(products) {
            res.status(200).json(products)
        } else {
            res.status(200).json(products)
        }
    }

    addProductBD = async (req ,res) =>{
        const product = req.body;
        if(product) {
            const newProduct = await Products.addProduct(product);
            res.status(200).json(newProduct)
        } else {
            return ({message: "All Field Required"}) 
        }
    }

    getProductId = async (req , res) => {
        const id = req.params.pid 
        let getProductId = await Products.getProductId(id);
        if(getProductId) { 
            res.status(200).json(getProductId);
        } else {
            res.json(getProductId);        
        }
    }


    deleteProductBD = async (req , res) => {
        const id = req.params.pid
        const deleteProduct = await Products.deleteProductId(id);
        if (deleteProduct) {
            res.json(deleteProduct);
        } else {
            return ({message: " product not foun"})
        }
    }

    UpdateProductBD = async (req, res) => {
        const id = req.params.pid
        const product = req.body
        const UpdateProduct = await Products.UpdateProduct(id ,product);
        if (UpdateProduct) {
            res.json(UpdateProduct)
        } else {
            return ({message: "Produc NOT Updated"});
        }
    }
}



export default productControllerBD;