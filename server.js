var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/index.html');
return res.send("Welcome to BotCare");
});

io.on('connection', function (socket) {
    socket.emit('start', {hello: 'user'});
    socket.on('demo', (data)=>{
        console.log(data);
    });
});

//port activation
server.listen(8081, (req, res) => {
    console.log("Listening on 8081");
});
