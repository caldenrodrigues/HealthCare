var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(cors());
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req,result)=>{
  myvar = "What is the name of the doctor"
  axios.post('http://localhost:5000/train', {
    myvar
  })
  .then((res) => {
    console.log(res.data);
    return result.send(res.data);
  })
  .catch((err) => {
    console.log(err)
  })
});

io.on('connection', function (socket) {
    console.log("Socket is connected...");
    socket.emit('start', {hello: 'user'});
    socket.on('demo', (data)=>{
        console.log(data);
    });
});

//port activation
server.listen(8081, () => {
    console.log("Listening on 8081");
});
