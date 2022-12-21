import express from 'express'
import cors from 'cors'
import { productModel } from './DB/model/product.model.js'
import { connectDB } from './DB/connection.js'
import { initIO } from './service/socket.service.js'
import indexRouter from './modules/index.router.js'
import userModel from './DB/model/User.model.js'
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({}))
app.use(indexRouter)


async function addStaticUsers() {


    await userModel.insertMany([
        {
            userName: "Mahmoud",
            email: "mmgmail.com",
            password: "mm@123",

        },

        {
            userName: "Maged",
            email: "mm2gmail.com",
            password: "mm@123",

        },

        {
            userName: "Elwan",
            email: "mm3gmail.com",
            password: "mm@123",

        },
    ])
}
// addStaticUsers()

app.get('/', (req, res) => res.send('Hello World!'))
connectDB()
const httpServer = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const io = initIO(httpServer)

io.on('connection', async (socket) => {
    console.log(socket.id);
    socket.on("saveSocketId", async (data) => {
        await userModel.findOneAndUpdate({ _id: data }, { socketId: socket.id })
    })
    // socket.on('FETOBE', (data) => {
    //     console.log({ privateId: socket.id });
    //     console.log(data);
    //     // socket.emit("BETOFE" , "From BE TO FE") // respond to the sender only
    //     socket.broadcast.emit('BETOFE', "From BE TO FE")
    //     // io.emit("BETOFE" , "From BE TO FE") // respond to all clients  
    // })

    // socket.on('privateMessage', (data) => {
    //     // console.log(data.message);
    //     // io.to(data.sId).emit('reply' , data.message)
    //     io.except(data.sId).emit('reply' , data.message)
    // })

    async function getProducts() {
        const products = await productModel.find({})
        return io.emit("returnProductList", products)
    }
    getProducts()


    // socket.on("addProduct", async (data) => {
    //     console.log(data);
    //     const newProduct = await productModel.create(data)
    //     // socket.emit("returnProductList", data)
    // })
    socket.on("requestProducts", async () => {
        getProducts()
    })
})