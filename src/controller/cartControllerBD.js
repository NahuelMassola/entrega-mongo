import BdCartManager from "../dao/mongoManager/bdCartManager.js";
import BdProductManager from "../dao/mongoManager/BdProductManager.js";
import calculosCarts from "../utils/calculosCarts.js";



const Carts = new BdCartManager;
const Product = new BdProductManager;
const calculos = new calculosCarts

class cartControllerBD {
    constructor() {}

    createCart = async (req, res) => {
        try {
            const {products = []} = req.body
            let {productCartList, productsNotFound} = await calculos.mapProductCart(products)
            const cart = {
                priceTotal: calculos.CalculateCartTotal(productCartList),
                quantityTotal: calculos.CalculateQuantityTotal(productCartList),
                products:productCartList,
            }
            await Carts.Create(cart)
            return res.json({
            msg:"Carrito Creado",
            playload: {cart, productsNotFound},
            })
        } catch (error) {
            return res.status(500).json ({
                message:"Error to created cart"
            })
        }
    }


    getCartIdBd = async (res , req) => {
        try {
            const {cid} = req.params
            const cart = await Carts.getCartId(cid);
        if(cart){
        return res.json({
            msg:"Carrito Encontrado",
            playload: cart,
        })}
        } catch (error) {
            return error
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