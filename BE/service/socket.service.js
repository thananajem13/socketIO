import { Server } from "socket.io";

let io;

export const initIO = (httpServer) => {
    io = new Server(httpServer, {
        cors: "*"
    })
    return io
}


export const getIo = () => {
    if (!io) {
        throw new Error("Fail to catch io")
    } else {
        return io
    }
}