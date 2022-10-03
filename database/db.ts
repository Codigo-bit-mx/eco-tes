import mongoose from 'mongoose'


const mongoConnection = {
    isConnected: 0
}

export const connect = async ( ) => {
    
    if(mongoConnection.isConnected) {
        console.log('ya estabamos Conectados')
    }

    if(mongoose.connect.length > 0){
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if(mongoConnection.isConnected === 1) {
            console.log("Usando conexion anterior")
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '')
    mongoConnection.isConnected = 1
    console.log('conectado a mongoBD') 
}


export const disconnect = async () => {
 if( process.env.NODE_ENV === 'development') return; 

    if(mongoConnection.isConnected === 0 ){
        return
    }

    await mongoose.disconnect()
    console.log("Desconectado de mongoBD")
}