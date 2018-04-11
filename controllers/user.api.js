 var express = require("express"),
 router = express.Router(),
 user = require("../models/user.js");
 var hat = require('hat');

//var serverpath="http://localhost:8000/"
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});
 
 
router.post("/", function(req, res) {

    var obj = req.body;
    var eml = req.body.email;
    console.log(eml);
    obj.accesstoken = hat();
    obj.active = false;
    
    var model = new user(obj);
    var myquery = {email : eml };
    user.findOne(myquery,function(err,result){
        if(err){
            res.send(err);
        }
        else if(result){
            res.status(200);
            console.log("Already Exist");
            res.send("Already Exist");
        }
        else{ 
            model.save(function(err) {
              if (err) 
              {

                  res.json({ success: false, message: 'Data Save failed.', error:err});
                  return;
              }
            else
            {
                 var path = "https://localhost:8000/emailverify.html?id="+obj.accesstoken;
                 var mailOptions = 
                    {
                               from: 'youremail@gmail.com',
                               to: req.body.email,
                               subject: "Email verification require",
                               text: 'That was easy!',
                               html:'<p>Please click below the link</p><a href="'+path+'">Verify Email</a>'
                    };

                       transporter.sendMail(mailOptions, function(error, info){
                       if (error) {
                         console.log(error);
                       } 
                        else {
                           res.status(200);
                         console.log('Email sent: ' + info.response);
                         res.json({ success: true, message: 'Account created please check your email for verification' });
                       }
                 });


              }
             })
        }
    })
                        
})
router.post("/login", function(req, res) {
    var eml = req.body.email;
    var pss = req.body.pwd;
    //var myquery = {pass: pss};
    var myquery = {email: eml,pass: pss};
    
    console.log(pss);
    user.findOne(myquery,function(err, result){
       if(err){
           console.log(err);
            res.json({status:false, message: 'unknown error' }); 
        }
        else if(result){
            if(!result.active){
                console.log("dkkjd")
                 res.json({status:false, message: 'You have not verified your account. Please check your email  for verification link' });
            }
            else{
                var resUser = new Object();
                resUser.name = result.name;
                resUser.admin = result.admin;
                resUser.email = result.email;
                res.json({status:true, message:"login successfull", data:resUser });
            }
        }
        else{
            res.json({status:false, message: "incorrect user and password" });
        }
     })
})
router.put("/:id", function(req, res) {

  var id = req.param("id");
  user.findOneAndUpdate({accesstoken:id},{$set:{active : true }},{new : true},function(err,result){
    if(err){
        res.send(err);
    }
    else if(!result)
    {
        res.send("invalid accesstoken or token expird")
    }
    else
    {
         result.active = true;
           result.save(function(err) {
                if (err){
                    res.json({ success: false, message: err});
                }  
               else{
                   res.status(200);
                    res.json({ success: true, data: "Record updated successfully" });
               }
           });
   }
    
  })

})
module.exports = router;



router.get("/", function(req, res) {
    
    user.find(function(err,data)
              {if(err){res.json({ success: false, message:'Data Fetch Failed', error:err});
                 return;}
        else{
            res.status(200);
             res.send(data);
        }
    })
   
})
router.get("/:id", function(req, res) {
    var id = req.param("id");
    console.log(id)
    var myquery = { _id:  id};
    user.findOne(myquery,function(err, result){
       if(err){
            res.json({ success: false, message: 'Record fetching failed' });
       }
       else{
            res.status(200);
            res.send(result);
       }
     })

})
router.delete("/:id", function(req, res) {
    
  var id = req.param("id");

    console.log(id)
    var myquery = { _id:  id};
    user.findOneAndRemove(myquery,function(err){
        if(err){
             res.json({ success: false, message:'Data Fetch Failed', error:err});
                 return;
        }
        else{
             res.status(200);
             res.json({ success: true, message:'Record Deleted Successfully', error:err});
                 return;
        }
    })
   
})
/*
router.put("/:id", function(req, res) {
    
  var id = req.param("id");

    console.log(id)
    //var myquery = { _id:  id};
    user.findById(id,function(err){
        if(err){
             res.json({ success: false, message:'Data Fetch Failed', error:err});
                 return;
        }
        else{
             res.status(200);
             res.json({ success: true, message:'Record Deleted Successfully', error:err});
                 return;
        }
    })
   
})
*/
