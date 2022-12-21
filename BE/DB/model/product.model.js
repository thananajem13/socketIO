import { Schema, model } from "mongoose";


const productSchema = new Schema({

    title:String,
    description:String,
    price:String,

}, {
    timestamps: true
})

export  const productModel  = model("Product" , productSchema)