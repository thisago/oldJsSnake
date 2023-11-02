"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = socket_io_1.default.listen(server);
var PORT = 8090;
server.listen(PORT, function () {
    console.log("OPENED");
});
app.get("/elements", function (req, res) {
    res.sendFile(__dirname + "/elements/snake.html");
});
app.get("/online/elements", function (req, res) {
    res.sendFile(__dirname + "/elementsOnline/snake.html");
});
app.use("/elementsOnline/", express_1.default.static("elementsOnline/src"));
app.use("/elements/", express_1.default.static("elements/src"));
app.use("/canvas/", express_1.default.static("canvas/src"));
var snakes = [];
io.on("connection", function (socket) {
    console.log("New connection");
    socket.emit("id", snakes.lenght);
    socket.on("snake", function (conf) {
        var has = false;
        snakes.forEach(function (e) {
            if (conf.id == e.id) {
                has = true;
            }
        });
        if (has == false) {
            snakes.push(conf);
        }
        socket.emit("snake", snakes);
    });
});
