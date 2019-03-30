var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var server = require('http').Server(app);
<<<<<<< HEAD
var io = require('socket.io')(server);
var mongoose = require('mongoose');
=======
>>>>>>> 6528d227a7e15b5e64155a633fc75560fe994f56
app.use(cors());
const axios = require('axios');
//Socket
const io = require("socket.io")(server)

io.on('connection', (socket) => {
  console.log('New User')
  socket.on('newMessage', (data) => {
    console.log(data)
    myvar = data
    axios.post('http://localhost:5000/testQuery', {
      myvar
    })
    .then((res) => {
      console.log(res.data)
      strResponse = res.data;
      strResponse = strResponse.substring(1);
      if(strResponse == "doctor"){
        //shadrak get data here
      }
      else if(strResponse == "hospital"){
        //shadrak get data here
      }
      else if(strResponse == "appointment"){
        //shadrak get data here
      }
      else if(strResponse == "dose"){
        //shadrak get data here
      }
      io.sockets.emit('newResponse',strResponse)
    })
    .catch((err) => {
      console.log(err)
    })
  })
})





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

<<<<<<< HEAD
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.get("/", (req,res)=>{
   return res.send("Welcome to BotCare");
 });
=======
app.get("/testQuery", (req,result)=>{
  myvar = "What is the name of the doctor"
  axios.post('http://localhost:5000/testQuery', {
    myvar
  })
  .then((res) => {
    strResponse = res.data;
    strResponse = strResponse.substring(1);
    if(strResponse == "doctor"){
      //shadrak get data here
    }
    else if(strResponse == "hospital"){
      //shadrak get data here
    }
    else if(strResponse == "appointment"){
      //shadrak get data here
    }
    else if(strResponse == "dose"){
      //shadrak get data here
    }
    return result.send(strResponse);
  })
  .catch((err) => {
    console.log(err)
  })
});

app.get('/addQuery', (req, result) => {
  queryQuestion = "Can i remove my plaster?";
  queryAnswer = "No, It is suggested to wait till the next appointment and let the doctor remove it."
  axios.post('http://localhost:5000/addQuery', {
    queryQuestion,
    queryAnswer
  })
  .then((res) => {
    return result.send("Success")
  })
  .catch((err) => {
    console.log(err)
  })
});

app.get('/getQuery', (req, result) => {
  axios.post('http://localhost:5000/getQuery', {
  })
  .then((res) => {
    return result.send(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
});
>>>>>>> 6528d227a7e15b5e64155a633fc75560fe994f56

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
