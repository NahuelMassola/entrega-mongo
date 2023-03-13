import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/viewsRouter.router.js";
import handlebars from "express-handlebars"
import * as path from "path"
import { fileURLToPath } from "url";
import connectionSocket from "./utils/socket.io.js";
import ProductManager from "./Controller/ProductManager.js";
import mongoose from 'mongoose';
import productRouterDB from "./routes/products.router.bd.js";
import cartRouterDB from "./routes/carts.router.bd.js";
import chatsRouter from "./routes/chats.router.js";


const app = express();
const Product = new ProductManager();

const __filename = fileURLToPath(import.meta.url);
const __dirmame = path.dirname(__filename);

//static
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/" , express.static(__dirmame + "/public"))

//handlebars

app.engine("handlebars" , handlebars.engine())
app.set("view engine" , "handlebars");
app.set("views" , path.resolve(__dirmame + "/views"))


// Rutas

app.use("/api/products" , productRouter);
app.use("/api/cart" , cartRouter);
app.use("/" , viewsRouter);
app.use('/api/productDB' , productRouterDB );
app.use('/api/cartBD' , cartRouterDB );
app.use('/api/chats' , chatsRouter);


// creo el Puerto

const PORT = 8080 ;

const server = app.listen (PORT , () => { 
    console.log(`Local host ${server.address().port}` )
});


mongoose.connect('mongodb://localhost:27017/Eccomerce')
.then(() => console.log('Connected to MongoDB'));


// inicializo el servidor 
connectionSocket(server);
server.on("error" , (error) => console.log(`Error on ${error}`));