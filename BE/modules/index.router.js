

import { Router } from "express";
import { productModel } from "../DB/model/product.model.js";
import userModel from "../DB/model/User.model.js";
import { getIo } from "../service/socket.service.js";

const router = Router()




router.post("/product", async (req, res, next) => {
    console.log(req.body.id );
    await productModel.create(req.body)
    const products = await productModel.find({})
    const { socketId } = await userModel.findById({ _id: req.body.id }).select('socketId')
    getIo().to(socketId).emit("returnProductList", products)
    res.status(201).json({ message: "Done" })
})





export default router