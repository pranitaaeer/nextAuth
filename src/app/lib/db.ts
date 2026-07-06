import mongoose from "mongoose";

type connectionObj = {
    connected?: number //optional
}
const connection: connectionObj = {};

const connectDB = async () => {
    try {
        if (connection.connected) {
            console.log("MongoDB is already connected")
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("db", db)
        connection.connected = db.connection.readyState;
        console.log(`MongoDB connected to ${db.connection.host}`)

    } catch (err) {
        console.log("Error in connecting to database", err)
        process.exit(1)
    }
}
export default connectDB;