import cartsModel from "../models/carts.model.js";

class BdCartManager {
    constructor() {
        this.carts = []
    }

    getAllCart = async (req , res) => {
        let getAll = await cartsModel.find({})
        return res.status(200).json(getAll)
    }

    CreateCart = async (cart) => {
        try {
            await cartsModel.create(cart);
            return ({message: "cart created sussesfully"})
        } catch (error) {
            return ({message: "Error To created Cart"})
        }
    }  

    getCartIdBd = async (id) => {
        try {
            await cartsModel.findById(id);
            return ({message: "carrito encontrado"});
        } catch (error) {
            return({message: "carrito inexistente"});
        }
    }

    addProductToCart = async (newCart) => {
        await cartsModel.create(newCart)
        return ({message: "product adddeded"});
    }

    updateToCart = async (cart) => {
        await cartsModel.findByIdAndUpdate(cart.id ,cart , {new:true})
        return ({message: "pruduct updated"});
    }
}


export default BdCartManager;