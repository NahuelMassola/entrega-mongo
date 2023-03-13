import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    userMail: {
        type: String, 
        require: true
    },

    message: {
        type: String,
        require: true
    }
})

const chatModel = mongoose.model('messages' , chatSchema);

export default chatModel;