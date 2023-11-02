import express from "express";
import http from "http";
import socketIo from "socket.io";

const app = express();

const server = http.createServer(app);

const io = socketIo.listen(server);

const PORT = 8090;


server.listen(PORT, () => {
    console.log("OPENED");
})
app.get("/elements", function (req, res) {
    res.sendFile(__dirname + "/elements/snake.html")
});
app.get("/online/elements", function (req, res) {
    res.sendFile(__dirname + "/elementsOnline/snake.html")
});



app.use("/elementsOnline/", express.static("elementsOnline/src"))
app.use("/elements/", express.static("elements/src"))
app.use("/canvas/", express.static("canvas/src"))

var snakes: any = [];
io.on("connection", (socket) => {
    console.log("New connection");
    socket.emit("id", snakes.lenght)
    socket.on("snake", (conf) => {
        let has = false;
        snakes.forEach((e: any) => {

            if (conf.id == e.id) {
                has = true;
            }
        });
        if (has == false) {
            snakes.push(conf);
        }
        socket.emit("snake", snakes)
    })
})