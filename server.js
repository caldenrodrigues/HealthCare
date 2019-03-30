var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
app.use(cors());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.get("/", (req,res)=>{
   return res.send("Welcome to BotCare");
 });

io.on('connection', function (socket) {
    console.log("Socket is connected...");
    // socket.emit('start', {hello: 'user'});
    // socket.on('demo', (data)=>{
    //     console.log(data);
    // });
    

    socket.on('disconnect', ()=>{
         console.log('socket disconnected');
    });
});

//port activation
server.listen(8081, () => {
    console.log("Listening on 8081");
});
