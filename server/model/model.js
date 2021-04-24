var Sequence = require('sequence').Sequence;
var database = require("./database");
var ObjectID = require('mongodb').ObjectID;

exports.addItem = function(ip,cb){
    var db;
    var sequence = Sequence.create();
    sequence.then(function(next){
        database.getdb(function(err,dbref){
            if(err){
                process.exit(1);
                console.log("connection faild");
            } else {
                db = dbref;
                next();
            }
        })
    }).then(function(next){
        ip.created_date = new Date();
        db.item.insertOne(ip, function(err,res){
            if( err && !res ){
                cb(err,null)
            } else {
                cb(null,res)
            }
        })
    })
}

exports.getItems = function(ip, cb){
    var db;
    var sequence = Sequence.create();
    sequence.then(function(next){
        database.getdb(function(err, dbref){
            if(err){
                process.exit(1);
            } else {
                db = dbref;
                next();
            }
        })
    }).then(function(next){
        console.log(ip)
        db.item.find({}).toArray(function(err,res){
            console.log("resp",res)
            if(err){
                cb(err,null);
            } else {
                cb(null,res);
            }
        })
    })
} 

exports.updateItem = function(ip, cb){
    var db;
    var sequence = Sequence.create();
    sequence.then(function(next){
        database.getdb(function(err, dbref){
            if(err){
                process.exit(1);
            } else {
                db = dbref;
                next();
            }
        })
    }).then(function(next){
        ip.updated_date = new Date();
        console.log("ip in model",ip)
        db.item.update({_id:ObjectID(ip.id)},{$set:{item_name:ip.item_name,price:ip.price,updated_date:ip.updated_date}},function(err, res){
            if( err &!res ){
                cb(err,null)
            } else {
                cb(null,res )
            }
        })
    })
}

exports.generateBill = function(ip, cb){
    var db;
    var sequence = Sequence.create();
    sequence.then(function(next){
        database.getdb(function(err,dbref){
            if(err){
                process.exit(1);
            } else {
                db = dbref;
                next(); 
            }
        })
    }).then(function(next){
        ip.bill_number = Math.trunc(Math.random()*1000 +1 );
        ip.created_date = new Date();
        ip.id = ObjectID(ip.id);
        db.bill.insertOne(ip, function(err, res){
            if( err&&!res ){
                cb(err,null);
            } else {
                cb(null,res);
            }
        })
    })
}

exports.getMyNewBill = function(ip, cb){
    var db;
    var sequence = Sequence.create();
    sequence.then(function(next){
        database.getdb(function(err,dbref){
            if(err){
                process.exit(1);
            } else {
                db = dbref;
                next();
            }
        })
    }).then(function(next){
        db.bill.find({}).toArray(function(err,res){
            if(err){
                cb(err,null)
            } else {
                cb(null,res)
            }
        })
    })
}