var express = require('express');
var app = express();
var port = 4444;
var controller = require('./controller/controller.js');
var model = require('./model/model.js');
var bodyParser = require('body-parser');
var config = require('./config.json');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({}));


app.post('/techapi',(req,res) => {
    console.log(req.body)
    if(!req.body.cmd){
        res.status(404).send({status:"Error",msg:"please check you are command name."});
        return
    }
    var cmd = req.body.cmd;
    console.log("cmd",cmd)
    //check for cmd is existing or not in controller;
    if(controller[cmd]){
        //if yes process the request.
        controller[cmd](req,res);
    } else {
        //if no retutn error with 404.
        res.status(404).send({status:"Error",msg:"command doesn't exits in the server asas."})
    }
})

app.listen(port,() => {
    console.log("server listining"+port);
})

