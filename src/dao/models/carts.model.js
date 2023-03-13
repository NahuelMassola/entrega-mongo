import mongoose from "mongoose";


const cartsSchema = new mongoose.Schema(
    {
    priceTotal:{
        type:Number,
       // default:0,
    }, 
    quantityTotal:{
        type:Number,
        default:0,
    },
    products: {
        type:Array,
        default:[],
    }
} , {
    versionKey: false,
    timestamps:true
}
);
/* const cartsSchema = new mongoose.Schema({
    priceTotal: Number,
    quantityTotal: Number,

    products: {
        type: [{
            products: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"products"
            } ,
            quantity: Number,
            price: Number
        }],
        default: [],
    }
}) */

const cartsModel = mongoose.model('carts', cartsSchema);

export default cartsModel;


/* const cartsSchema = new mongoose.Schema([
    {
    priceTotal:{
        type:Number,
        default:0,
    }, 
    quantityTotal:{
        type:Number,
        default:0,
    },
    products: {
        _id:false,
        type:Array,
        default:[],
    }
}
]); */