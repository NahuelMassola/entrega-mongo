import ProductManager from "../Controller/ProductManager.js";
import { Server } from "socket.io";
import BdChatsManager from "../dao/mongoManager/BdChatManager.js";


const Product = new ProductManager();
const Chat = new BdChatsManager()

const connectionSocket = (server)=>{
    let io = new Server(server);
    io.on ('connection', async (socket)=>{
        console.log("Nuevo Clinte conectado")
        let products = await Product.getProducts();
        let chat = await Chat.getMessage();
        socket.emit('init-products', products)
        socket.emit('init-chats' , chat)
        socket.on('addProd' , async prod => await Product.addProduct(prod))
        socket.on('delProd' , async (id) => await Product.deleteProduct(id))
        
    })
}

export default connectionSocket ;  
