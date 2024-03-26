const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

const port = 9000
const path = require("path")

app.use(express.static(path.join(__dirname + "/public")))


io.on("connection", (socket) => {
    socket.on("newuser", (username) => {
        socket.broadcast.emit("update", username + " join the conversation")
    })
    socket.on("exituser", (username) => {
        socket.broadcast.emit("update", username + " left the conversation")
    })
    socket.on("chat", (message) => {
        socket.broadcast.emit("chat", message)
    })
})

server.listen(port, (err) => {
    err ? console.log(err) : console.log("server running on", port)
})