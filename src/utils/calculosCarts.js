import BdProductManager from "../dao/mongoManager/BdProductManager.js";

const productManagerBD = new BdProductManager;

    class calculosCarts {
        constructor() {}

        CalculateCartTotal = (products) =>{
            return products.reduce((acc, prod )=> acc + prod.price * prod.quantity,0)
        }
        CalculateQuantityTotal = (products) =>{
            return products.reduce((acc, prod )=> acc + prod.quantity ,0)
        }
        
        mapProductCart = async (products)=>{
            let productCartList =[]
            let productsNotFound = []
            
            for(const id of products) {
            
                const indexProducts = productCartList.findIndex(({product})=> product === id)
                
                
                if (indexProducts === -1){
                    const productBd = await productManagerBD.getProductId(id)
                    
                    if(productBd){
                        productCartList.push({
                            product: id,
                            quantity: 1,
                            price:productBd.price,
                              
                        }) 
                    }else{
                         productsNotFound.push(id)
                    }
                } else{
                    productCartList[indexProducts].quantity++
                }
              }
               
                return {productCartList, productsNotFound}
            
            }
    }

    export default calculosCarts;