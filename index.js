const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const app = express();

app.use(express.static(__dirname + "/public"));

server.listen(3000, () => {
	console.log("listening on port 3000");
});

const io = new Server(server);

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("chat message", (msg) => {
		console.log("message: " + msg);
		io.emit("chat message", msg);
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});
