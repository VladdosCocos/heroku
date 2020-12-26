let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require("socket.io").listen(server);

server.listen(6699)

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

io.sockets.on("connection", function (s) {
	connections.push(s);

	s.on('sendMessage', function (msg) {
		io.sockets.emit("addMessage", msg);
	})

	s.on('disconnect', function (data) {
		connections.splice(connections.indexOf(s), 1);
	});
});
