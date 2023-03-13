import cartsModel from "../models/carts.model.js";

class BdCartManager {
    constructor() {
        this.carts = []
    }

    getAllCart = async (req , res) => {
        let getAll = await cartsModel.find({})
        return res.status(200).json(getAll)
    }

    Create = async (cart) => {
        try {
            await cartsModel.create(cart);
            return ({message: "cart created sussesfully"})
        } catch (error) {
            return error
        }
    }  

    getCartId = async (id) => {
            return await cartsModel.findById(id);
    }

    addProductToCart = async (newCart) => {
        await cartsModel.create(newCart)
        return ({message: "product adddeded"});
    }

    updateToCart = async (cart) => {
        await cartsModel.updateOne({_id: cid } , cart)
        return ({message: "pruduct updated"});
    }
}


export default BdCartManager;