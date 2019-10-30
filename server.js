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
    // user: 'root',
    // password: 'shadrak',
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
  flag = false
  patient_id = '101'
  //io.sockets.emit("changeAppointment")
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
        else if(strResponse == "reschedule"){
          console.log("In")
          io.sockets.emit("changeAppointment")
        }
        else if(strResponse == "reshedule"){
          console.log("In")
          io.sockets.emit("changeAppointment")
        }
        else{
          io.sockets.emit('newRegular',strResponse)
        }
      }
      else{
        const queryQuestion = myvar
        axios.post('http://localhost:5000/nlpQuery', {
          queryQuestion
        })
        .then((res) => {
          console.log(res.data)
          strResponse = res.data
          io.sockets.emit('newRegular',strResponse)
          if(strResponse.substring(0,3) == "I a"){
            connection.query("Insert into pendings(p_id, question, answer) values(?,?,?)",[patient_id, myvar, ""], function (err, result, fields) {
              if (err) throw err;
            });
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  })
  socket.on("changedAppointment", (data) => {
    p_id = "101"
    app_date = data
    connection.query('update Prescription set app_date = ? where p_id = ?',[app_date, p_id], function(err, res, fields){
      if (err) throw err;
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
          io.sockets.emit('newRegular',"Your appointment has been rescheduled as follows")
          io.sockets.emit('newAppointment',json_response)
        });
      });
    });
  });
  socket.on("forgotMeds", (data) => {
    console.log(data)
    io.sockets.emit('newRegular',"Missing your medication too frequently is not advicable")
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
    /*
    connection.query('select name,age from Patient where p_id=101;', function(err, result, fields){
        if (err) throw err;
        console.log(result[0])
        var json_response = {}
        json_response["id"] = result[0].p_id
        json_response["name"] = result[0].name
        json_response["age"] = result[0].age
        return res.send(json_response);
    });
	*/
	connection.query('Select p_id, name from Patient', function(err,results,fields){
		if(err) throw err;
		return res.send(results)
	});
});

app.post('/prescriptionSubmit', (req, res) => { //Enters prescription details into Database
    console.log(req.body);
    patient_id = req.body.ID
    diagnose = req.body.SELECT;
    drug = req.body.DRUG;
    unit = req.body.UNIT;
    dose = req.body.DOSE;
    app_date = req.body.DATE;
    date = new Date();
    precaution = req.body.PRECAUTION;
    doctor_id = '201';
    connection.query('delete from Prescription where p_id=101', function(err, result, fields){
        if(err) throw err;
        connection.query('insert into Prescription values(?,?,?,?,?,?,?,?,?,?)',["69", patient_id, date, app_date, diagnose, drug, unit, dose, doctor_id, precaution], function(err, result, fields){
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

app.post('/getPendings', (req, result) => { //Sends list of all pending queries
  console.log("getPendings loaded!");
  connection.query('select * from pendings where p_id=101', function(err, res, fields){
    if (err) throw err;
    json_response = []
    for(i=0;i<res.length;i++){
      json_object = {}
      json_object["patient_id"] = res[i].p_id
      json_object["questions"] = res[i].question
      json_object["question_id"] = res[i].q_id
      json_response.push(json_object)
    }
    console.log(json_response)
    return result.send(json_response)
  });
});

app.post('/getAnswers', (req, res) => { //Retrieve answers from hospital portal for pending queries
  console.log(req.body);
  answer = req.body.ANSWER;
  question_id = req.body.q_id;
  person_id = req.body.p_id;
  console.log(req.body);
  connection.query('update pendings set answer=? where q_id=? and p_id=?',[answer, question_id, person_id],function(err, result, fields){
    if(err) throw error;
    console.log("Answers filled");
    console.log(result);
    io.sockets.emit('newAlert',"The doctor has answered your query: " + answer)
    return res.send("Success")
  });
});

app.post('/register', (req,res) => {
	console.log(req.body);
	name = req.body.name;
	address = req.body.address;
	age = req.body.age;
	contact = req.body.contact;
	email = req.body.email;
	password = req.body.password
	connection.query('Insert into Patient(name,address,age,contact,email,password) values(?,?,?,?,?,?)', [name, address, age, contact,email,password], function(err,results,fields){
		if(err) {console.log(err);throw err};
		return res.sendStatus(200);
	});
})

app.post('/login', (req,res) => {
	console.log(req.body)
	email = req.body.email;
	password = req.body.password
	connection.query('Select password from Patient where email = ?', [email], function(err,results,fields){
		if(err) throw error;
		if(results[0].password == password)
			return res.sendStatus(200)
		else
			return res.sendStatus(400)
	});
})

//port activation
server.listen(8100, () => {
    console.log("Listening on 8100");
});
