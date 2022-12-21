import mongoose from "mongoose"



export const connectDB = async () => {
    return await mongoose.connect("mongodb://localhost:27017/socketSaturday")
    .then(res=>console.log("Connected DB"))
    .catch(res=>console.log("Fai to connect DB"))   
}