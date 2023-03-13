import { Server } from "socket.io";

class mensajesChat {
    constructor( ) {
    }

    emitMessage = (newMessage) => {
        let io = new Server()
        console.log(`new message sed: ${JSON.stringify(newMessage)}`)
        io.emit('add-message' , newMessage)
    }

    emitDeleteMj = (message)=>{
        let io = new Server()
        console.log(`Mensaje Eliminado: ${JSON.stringify(message)}`)
        io.emit('delete-message', message)
    }
}

export default mensajesChat;