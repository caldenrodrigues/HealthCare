var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var server = require('http').Server(app);
app.use(cors());
const axios = require('axios');
var mysql = require('mysql');
//Socket
const io = require("socket.io")(server)

//mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.database_user,
    password: process.env.database_password,
    database: 'CsiManagementSystem'
});

connection.connect(function(err) {
    if (!err) {
        console.log('Connected to MySql!\n');
    } else {
        console.log(err);
    }
});

io.on('connection', (socket) => {
  console.log('New User')
  patient_id = '101'
  console.log(patient_id)
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

        connection.query("SELECT * FROM Prescription where p_id = ?",[patient_id], function (err, result, fields) {
          if (err) throw err;
          connection.query("Select * from Doctor where d_id = ?",[],function(err, result, fields) {
            if (err) throw err;
            doctor_name = result[0].name;
            doctor_contact = result[0].contact;
            doctor_spec = result[0].specializtion;
            var json_response = {}
            json_response["type"] = "doctor"
            json_response["name"] = doctor_name
            json_response["contact"] = doctor_contact
            json_response["spec"] = doctor_spec
            console.log(json_response)
            io.sockets.emit('newResponse',json_response)
          })
       });

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
      else{
        io.sockets.emit('newResponse',strResponse)
      }

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

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.get("/", (req,res)=>{
   return res.send("Welcome to BotCare");
 });
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
