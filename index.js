var express = require("express");
var app = express();
var port = process.env.PORT || 8080;


app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("page");
});

app.get("/", function(req, res){
    res.send("It works!");
});

var io = require('socket.io').listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});