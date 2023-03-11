import mongoose from 'mongoose';




mongoose.prototype.connect = async function connect(DB_URI, options) {
    const DB_URI = `mongodb:localhost:27017/proyectoBackEnd` ;
    const options = {
        keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
    };

    (error)=>{
        if (error) {
          console.log('error de conexion', error);
          process.exit();
        }else {
            const _mongoose = this instanceof mongoose ? this : mongoose;
             const conn = _mongoose.connection;
            console.log('Conexion exitosa');
            return conn.openUri(uri, options).then(() => _mongoose);
        }
}}



/*  Mongoose.prototype.connect = async function connect(uri, options) {
    if (typeof options === 'function' || (arguments.length >= 3 && typeof arguments[2] === 'function')) {
      throw new MongooseError('Mongoose.prototype.connect() no longer accepts a callback');
    }
  
    const _mongoose = this instanceof Mongoose ? this : mongoose;
    const conn = _mongoose.connection;
  
    return conn.openUri(uri, options).then(() => _mongoose);
  };  */


/* const initDB = async () => {
    mongoose.connect(
        DB_URI , {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if(err) {
                console.log("DB: ERROR !!!");
            } else {
                console("conexcion Exitosa");
            }
        }
    )
    connect();
} */