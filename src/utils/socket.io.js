import ProductManager from "../Controller/ProductManager.js";
import { Server } from "socket.io";


const Product = new ProductManager();
const connectionSocket = (server)=>{
    let io = new Server(server);
    io.on ('connection', async (socket)=>{
        console.log("Nuevo Clinte conectado")
        let products = await Product.getProducts();
        socket.emit('init-products', products)

        socket.on('addProd' , async prod => await Product.addProduct(prod))
        socket.on('delProd' , async (id) => await Product.deleteProduct(id))
    })
}

export default  connectionSocket ;  
