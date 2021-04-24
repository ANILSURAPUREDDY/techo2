'use strict';
var database = {}

var mongodb = require('mongodb');
var config = require('../config.json');
var dbref=null;

database.getdb = function(next){
    if(!dbref){
        mongodb.MongoClient.connect(config.dbUrl,function(err,db){
            if(err){
                console.log("Unable to connect to the database!!");
				next(err,null)
            } else {
                // const db = client.db("test")
				dbref = {
					db:db,
                    item: db.collection('item'),
                    bill: db.collection('bill')
                };
                db.collection('item').createIndex({"item_name":1 },{ unique : true }, function(err){

					if(err)
					console.log("Error","Can't be connect"+err)
                })
                db.collection('bill').createIndex({"bill_number":1}, { unique : true}, function(err){
                    if(err)
                    console.log("Error","Con't be connect"+err);
                })
                next(null, dbref);
            }
        });
    } else {
        next(null,dbref);
    }
}

module.exports = database;