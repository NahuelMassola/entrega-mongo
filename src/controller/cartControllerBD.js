import BdCartManager from "../dao/mongoManager/bdCartManager.js";
import BdProductManager from "../dao/mongoManager/BdProductManager.js";

const Carts = new BdCartManager;
const Product = new BdProductManager;

class cartControllerBD {
    constructor() {}

    getCartIdBd = async (res , req) => {
        const id = req.params.cid
        const cart = await Carts.getCartIdBd(id);
        if(!cart) {
            return res.status(400).json({
                message: "Cart inexistente",
                ok: false,
            })
        } else {
            res.status(200).json(cart)
        }
    }

    addProductToCart = async (req ,res) => {
        const { cid , pid } = req.params;
        const product = await Product.getProductId(pid)
        if (product) {
            return res.status(400).json({
                message: "product not found",
                ok:false
            }) 
        }

        const cart = await Carts.getCartIdBd(cid);
        if (!cart){
            const newCart = {
                priceTotal: product.price,
                quantityTotal: 1 ,
                products: [{id: product.id , title: product.title , description: product.description , price: product.price , quantity: 1}]
            }

            const createCart = await Carts.addProductToCart(newCart);
            return res.status(200),json({
                message: "cart created" ,
                cart: createCart,
            })
        }

        const FindProductInCart = Carts.product.find(prod => prod.id === pid)

        if(!FindProductInCart) {
            Carts.product.push({id: product.id , title: product.title , description: product.description , price: product.price , quantity: 1})
            Carts.quantityTotal = Carts.quantityTotal + 1
            const total = Carts.product.reduce((acumulador , total) => acumulador + total.price, 0);
            Carts.priceTotal = total
            const cartToUpdate = await Carts.updateToCart(cart)
            return res.status(200).json({
                message: "Product Adedded",
                cart: cartToUpdate,
            })
        } else {
            FindProductInCart.quantity++
            Carts.quantityTotal = Carts.quantityTotal + 1
            const total = Carts.product.reduce((acumulador , total) => acumulador + total.price, 0);
            Carts.priceTotal = total
            const cartToUpdate = await Carts.updateToCart(cart)
            return res.status(200).json({
                message: "Product Adedded",
                cart: cartToUpdate,
            })
        }
    }

    
}


export default cartControllerBD;