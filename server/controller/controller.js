var model = require('../model/model.js');
var router = {};

router.addItem = function(req,res){
    var ip = req.body.params
    if(!ip.item_name && !ip.price ){
        res.status(200).send("All Conditions are not met.");
    }
    model.addItem(ip,function(err,resp){
        if(err){
            res.status(200).send(JSON.stringify({status:"Error",msg:"we are facing some issues with server."}));
        } else {
            res.status(200).send({status:"Success",msg:resp});
        }
    })
}

router.getItems = function(req, res){
    console.log(req.body);
    var ip = req.body.params
    model.getItems(ip, function(err, resp){
        if(err && !resp){
            res.status(200).send(JSON.stringify({status:"Error", msg:err}))
        } else {
            res.status(200).send(JSON.stringify({status:"Success", msg:resp}))
        }
    })
}

router.updateItem = function(req, res){
    var ip = req.body.params;
    console.log("ip for updateing",ip)
    if( !ip.id && !ip.item_name && !ip.price ){
        res.status(200).send("All Conditions are not met.");
    }
    model.updateItem(ip, function(err,resp){
        if(err){
            res.status(200).send(JSON.stringify({status:"Error",msg:"we are facing some issues with server."})); 
        } else {
            res.status(200).send({status:"Success",msg:resp}); 
        }
    })
}

router.generateBill = function(req, res){
    var ip = req.body.params;
    if( !ip.id && !ip.item_name && !ip.total && !ip.quantity ){
        res.status(200).send("All Conditions are not met.");
    }
    model.generateBill(ip, function(err, resp){
        if(err){
            res.status(200).send(JSON.stringify({status:"Error",msg:"we are facing some issues with server."}));
        } else {
            res.status(200).send({status:"Success",data:resp});
        }
    })
}

router.getMyNewBill = function(req, res){
    var ip = req.body.params;
    model.getMyNewBill(ip, function(err, resp){
        if(err){
            res.status(200).send(JSON.stringify({status:"Error",msg:"we are facing some issues with server."}));
        } else {
            res.status(200).send({status:"Success",data:resp});
        }
    }) 
}

module.exports = router;