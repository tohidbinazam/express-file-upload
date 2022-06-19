const mongoose = require('mongoose')


const connectMongoDB = async () => {
    try {
        let connect = await mongoose.connect(process.env.MONGODB)
        console.log(`MongoDB connect successfully HOST ${connect.connection.host}`.bgMagenta);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectMongoDB