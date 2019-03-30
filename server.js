var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req,res)=>{
return res.send("Welcome to BotCare");
});

//port activation
app.listen(8081, (req, res) => {
    console.log("Listening on 8081");
});
