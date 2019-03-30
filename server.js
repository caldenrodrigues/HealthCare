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
    database: 'Healthcare'
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

      strResponse = res.data;
      if(strResponse.substring(0,3) != "I a"){
        strResponse = strResponse.substring(2);
      }
      console.log(strResponse)
      if(strResponse == "doctor"){

        connection.query("SELECT * FROM Prescription where p_id = ?",[patient_id], function (err, result, fields) {
          if (err) throw err;
          doctor_id = result[0].d_id;
          connection.query("Select * from Doctor where d_id = ?",[doctor_id],function(err, result, fields) {
            if (err) throw err;
            doctor_name = result[0].name;
            doctor_contact = result[0].contact;
            doctor_spec = result[0].specialization;
            var json_response = {}
            json_response["type"] = "doctor"
            json_response["name"] = doctor_name
            json_response["contact"] = doctor_contact
            json_response["spec"] = doctor_spec
            console.log(json_response)
            io.sockets.emit('newDoctor',json_response)
          })
       });

      }
      else if(strResponse == "hospital"){
        io.sockets.emit('newRegular',strResponse)
      }
      else if(strResponse == "appointment"){

        connection.query("SELECT * FROM Prescription where p_id = ?",[patient_id], function (err, result, fields) {
          if (err) throw err;
          appointment_date = result[0].app_date;
          doctor_id = result[0].d_id;
          connection.query("Select * from Doctor where d_id = ?",[doctor_id],function(err, result, fields) {
            doctor_name = result[0].name;
            var json_response = {}
            json_response["type"] = "appointment";
            json_response["name"] = doctor_name;
            console.log(json_response)
            io.sockets.emit('newAppointment',json_response)
          });
        });

      }
      else if(strResponse == "dose"){
        connection.query("SELECT * FROM Prescription where p_id = ?",[patient_id], function (err, result, fields) {
          if (err) throw err;
          var json_response = {}
          json_response["drug"] = result[0].drugs;
          json_response["unit"] = result[0].unit;
          var date = new Date();
          var current_hour = date.getHours();
          if(current_hour<9){
            json_response["time"] = "9:00am";
          }
          else if(current_hour<13){
              json_response["time"] = "1:00pm";
          }
          else{
            json_response["time"] = "9:00pm";
          }
          console.log(json_response)
          io.sockets.emit('newDose',json_response)
        });
      }
      else{
        io.sockets.emit('newRegular',strResponse)
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
