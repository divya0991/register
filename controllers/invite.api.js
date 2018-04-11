 var express = require("express"),
 router = express.Router(),
 invite = require("../models/userinvite.js");
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
  
    var eml = req.body.email;
    var obj = new Object();
    obj.email = eml;
    obj.type = req.body.type;
    var invited = req.body.aemail;
    obj.invitedby = invited;
 
   // console.log(req.body.invitedby);
    console.log(req.body.type);
    //console.log(req.body.active);
    console.log(eml);
    obj.accesstoken = hat();
    obj.active = false;

    
    
    var model = new invite(obj);
    var myquery = {email : eml };
    user.findOne(myquery,function(err,result){
        if(err){
            res.send(err);
        }
        else if(result){
            res.status(200);
            res.json({ success: true, message: 'already registered', flag:false});
            return;
        }
     else{ 
          invite.findOne(myquery,function(err,result1)
                {
                    if(err){
                        res.send(err);
                    }
                    else if(result1){
                        res.status(200);
                        res.send({ success: true, message: 'Do you want to resend email', flag: true});
                        return;
                    }
              else{
                   model.save(function(err) 
                    {
                      if (err) 
                      {

                          res.json({ success: false, message: 'Data Save failed.', error:err,flag:false});
                          return;
                      }
                        else
                        {
                             var path = "https://localhost:8000/emailverify.html?id="+obj.accesstoken;
                             var mailOptions = 
                                {
                                           from: 'youremail@gmail.com',
                                           to: req.body.email,
                                           subject: "You are invited by " +invited,
                                           text: 'That was easy!',
                                           html:'<p>Please click below the link</p><a href="'+path+'">Verify Email</a>'
                                };

                                transporter.sendMail(mailOptions, function(error, info)
                                {
                                   if (error) {
                                     console.log(error);
                                   } 
                                    else {
                                       res.status(200);
                                     console.log('Email sent: ' + info.response);
                                     res.send('Account created please check your email for verification');
                                   }
                                })
                        }
                    });
              }
                   
            })
            }
                       
             })
        })
router.post("/resend", function(req, res) {

   
    var eml = req.body.email;
    var myquery = {email : eml };
     
          invite.findOne(myquery,function(err,result)
                {
                    if(err){
                        res.send(err);
                    }
                    else if(result){
                        console.log(result.accesstoken);
                        var path = "https://localhost:8000/register.html?id="+result.accesstoken;
                             var mailOptions = 
                                {
                                           from: 'youremail@gmail.com',
                                           to: req.body.email,
                                           subject: "complete your registration",
                                           text: 'That was easy!',
                                           html:'<p>Please click below the link</p><a href="'+path+'">Verify Email</a>'
                                };

                                transporter.sendMail(mailOptions, function(error, info)
                                {
                                   if (error) {
                                     console.log(error);
                                   } 
                                    else {
                                       res.status(200);
                                     console.log('Email sent: ' + info.response);
                                     res.send('invitation mail send to ' +eml+ ' successfull');
                                   }
                                })
                        
                    }
              
                   
            })         
             })
/*router.put("/:id", function(req, res) {

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

})*/
module.exports = router;






