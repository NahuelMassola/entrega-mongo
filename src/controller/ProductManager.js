import { promises as fs } from "fs" ; 
import { nanoid } from "nanoid";


export default class ProductManager {
    constructor () {
    this.path = "src/json/products.json"
    this.products = [] ;
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path , "utf-8");
        return JSON.parse(respuesta);
    };

    writeProducts = async (product) => {
        await fs.writeFile(this.path , JSON.stringify(product, null , 2));
    }

    existProducts = async (id) => {
        let products = await this.readProducts();
        return products.find((product) => product.id === id);
    }

    // promesa para agregar producto
    addProduct = async (objeto) => {
        objeto.status = true;
        if(objeto.title && objeto.description && objeto.code && objeto.stock && objeto.price  ) {
            let productOld = await this.readProducts();
            objeto.id = nanoid(1).toUpperCase();
            let productAll = [...productOld , objeto];
            await this.writeProducts(productAll);
            return {message: "Product Added succesfully" };
        } else {
            return {message: "All Field Are requerid"};
        }
    }

    getProducts = async () => {
        return await this.readProducts();
    }

    getProductById = async (id) => {
        let exist = await this.existProducts(id);
        if(!exist) return{message: `product ID ${id} NOT FOUND`};
        return exist;
    }

    deleteProduct = async (id) => {
        let respuesta = await this.readProducts();
        let exist = respuesta.some((product) => product.id === id);
        let productFilter = respuesta.filter((products) => products.id !== id);
        if (!exist) {
            return {message: "Pruduct Mising"};
        }  else {
            await this.writeProducts(productFilter,null,2);
            return {message: `Product with ID ${id} are deleted`};
        } 
    } 

    updateProducts = async (id ,producto) => {
        let exist = await this.existProducts(id);
        if(!exist) return {message: `Product with id ${id} NOT FOUND`};
        await this.deleteProduct(id);
        let productOld = await this.readProducts();
        let ProdcutModif = [{...producto , id: id}, ...productOld];
        await this.writeProducts(ProdcutModif);
        return {message: "Product Updated succesfully" };
    }
}
