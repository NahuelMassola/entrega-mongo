import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,  
    },
    description: {
        type: String,
        require: true, 
    },
    code:{
        type: String,
        require: true, 
    },
    price:{
        type: Number,
        require: true, 
    },
    status:Boolean,
    stock: {
        type: Number,
        default:1,
    },    
    thumbnail:String,
}, {
    versionKey: false,
    timestamps:true
}

)
const productModel = mongoose.model('products', productSchema);

export default productModel;