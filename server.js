var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
//var generator = require('generate-password');
//var random = require('random-number');
var {Random} = require('random-js');
var random = new Random();
const axios = require('axios');
var mysql = require('mysql');
var cors = require('cors');
app.use(cors());
//Socket
const io = require("socket.io")(server)

//mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.database_user,
    password: process.env.database_password,
    //user: 'root',
    //password: 'shadrak',
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
      else{
        connection.query("Insert into pendings values(?,?,?)",[patient_id, myvar, ""], function (err, result, fields) {
          if (err) throw err;
        });
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
            json_response["date"] = appointment_date;
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
          else if(current_hour<21){
            json_response["time"] = "9:00pm";
          }
          else{
            json_response["time"] = "9:00am";
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

app.get('/testSocket', function(req, res) {
  connection.query("SELECT * FROM Prescription where p_id = 101", function (err, result, fields) {
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
    else if(current_hour<21){
      json_response["time"] = "9:00pm";
    }
    else{
      json_response["time"] = "9:00am";
    }
    console.log(json_response)
    string_response = "Hey, Don't forget to take your " + json_response["unit"] + " of " + json_response["drug"] + " at " + json_response["time"];
    io.sockets.emit('newAlert',string_response)
    io.sockets.emit('newDose',json_response)
  });
  return res.send("Request Sent")
})

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.get("/", (req,res)=>{
   return res.send("Welcome to BotCare");
});

app.post('/addQuery', (req, result) => {
  queryQuestion = req.body.ques
  queryAnswer = req.body.ans
  console.log("in")
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

app.post('/prescription', (req, res) => {
    console.log('prescription page loaded');
    connection.query('select name,age from Patient where p_id=101;', function(err, result, fields){
        if (err) throw err;
        var json_response = {}
        json_response["id"] = "103"
        json_response["name"] = result[0].name
        json_response["age"] = result[0].age
        return res.send(json_response);
    });

});

app.post('/prescriptionSubmit', (req, res) => {
    prescription_id = random.integer(301, 400);
    console.log(prescription_id);
    patient_id = "101"
    diagnose = req.body.SELECT;
    name = req.body.PATIENT;
    age = req.body.age;
    drug = req.body.DRUG;
    unit = req.body.UNIT;
    dose = req.body.DOSE;
    app_date = req.body.DATE;
    date = new Date();
    precaution = req.body.PRECAUTION;
    doctor_id = '201';
    console.log('data received from prescription after submit.');
    connection.query('insert into Prescription values(?,?,?,?,?,?,?,?,?,?)',[prescription_id, patient_id, date, app_date, diagnose, drug, unit, dose, doctor_id, precaution], function(err, result, fields){
        if(err) throw err;
        console.log("data inserted");
        io.sockets.emit('newRegular',"Thank you for visiting the doctor, here is the details for your next appointment")
        connection.query("Select * from Doctor where d_id = ?",[doctor_id],function(err, result, fields) {
          if(err) throw err;
          doctor_name = result[0].name;
          var json_response = {}
          json_response["type"] = "appointment";
          json_response["name"] = doctor_name;
          json_response["date"] = app_date;
          console.log(json_response)
          io.sockets.emit('newAppointment',json_response)
          return res.send("Success")
        });
    });
});

app.post('/getQuery', (req, result) => {
  console.log("IND")
  axios.post('http://localhost:5000/getQuery', {
  })
  .then((res) => {
    return result.send(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
});

app.get('/getPendings', (req, result) => {
  connection.query('select * from pendings where p_id=101', function(err, res, fields){
    if (err) throw err;
    json_response = []
    for(i=0;i<res.length;i++){
      json_object = {}
      json_object["id"] = res[i].p_id
      json_object["question"] = res[i].question
      json_response.push(json_object)
    }
    return result.send(json_response)
  });
});

app.post('/updateAppointment', (req, res) => {
  p_id = "101"
  app_date = req.body.app_date
  connection.query('update Prescription set app_date = ? where p_id = ?',[app_date, p_id], function(err, res, fields){
    if (err) throw err;
    return res.send("Success")
  });
});

//port activation
server.listen(8081, () => {
    console.log("Listening on 8081");
});
