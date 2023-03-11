import productModel from "../models/products.model.js";

class BdProductManager{
    constructor() {
        this.products = [];
    }
    getProduct = async (limite) => {
		try{  
            if (limite){
                const products = await productModel.find().limit(limite);
                return products
            } else {
                const products = await productModel.find();
                    return products
                }
            } catch (error) {
                return {msg:"Error al Obtener Productos"}     
            }
        }
    
        addProduct = async (product) => {
            try {
                await productModel.create(product);
                return ({message: "Product Created"})
            } catch (error) {
                return ({message: "Error to created Product"} , error)
            }
        }

        getProductId = async (id) => {
            try {
                const getProductId = await productModel.findById(id);
                return getProductId
            } catch (error) {
                return ({message: `Error to find product with id ${id}`});
            }
        }

        deleteProductId = async (id) => {
            try {
                await productModel.findByIdAndDelete(id);
                return ({message: "product deleted"})
            } catch (error) {
                return ({message: "Error to delete product"});
            }
        }

        UpdateProduct = async ( id , product) => {
            const {title , description , price , code , stock} = product
            try {
                await productModel.findByIdAndUpdate(id, {title , description , price , code , stock});
                return ({message: "Product Updated"})
            } catch (error) {
                return ({message: "ERROR to Updated"});
            }
        }
};


export default BdProductManager;