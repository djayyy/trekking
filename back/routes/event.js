const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const eventModel =require('../models/eventModel');
router.get('/',function(req,res){
   eventModel.find()
   .exec()
   .then(pr =>{
       res.json(pr).status(200);
   })
});
var upload = multer({dest: './public/uploads'});
router.post('/',upload.single('eventImage'),function(req,res){
    if(req.file){
        console.log('Uploading File....');
        var eventImage = req.file.filename;
    } else{
        console.log('No File Uploaded....');
        var eventImage = 'noimage.jpg';
    }
     
  const newEvent = new eventModel({
      _id:new mongoose.Types.ObjectId(),
      leader : req.body.leader,
      trek_start : req.body.trek_start,
      trek_end : req.body.trek_end,
      meeting_date : req.body.meeting_date,
      meeting_address : req.body.meeting_address,
      meeting_time : req.body.meeting_time,
      email:req.body.email,
      password:req.body.password,
      eventImage:eventImage,
      joinerscount : req.body.joinerscount,
      price : req.body.price
  });
  newEvent.save(function(err,newEntry){
      if(err){
          console.log(err);
          res.json(err).status(400);
      }
      else {
          res.json(newEntry).status(201);
      }
  });
  })

router.get('/login', function(req,res){
    eventModel.findOne({email: req.query.email, password:req.query.password})
    .exec()
    .then(data=>{
        res.json(data).sendStatus(200);
    })
    .catch(err=>{
        console.log(err);
    });
});


router.get('/:eventId',function(req,res){
    const id = req.params.eventId;
    eventModel.find({_id:id})
    .exec()
    .then(prod=>{
        res.json(prod).status(200);
    })
});

router.put('/:eventid',function(req,res){
    const id=req.params.eventid;
    const newjoinerscount=req.body.joinerscount;
    eventModel.updateOne({_id:id},{$set:{joinerscount:newjoinerscount}})
    .exec()
    .then(data=>{
        res.json(data).sendStatus(200)
    })
    .catch(err=>{
        console.log(err);
    });
});
router.get('/',function(req,res){
    eventModel.find()
    .exec()
    .then(result=>{
        res.json(result);
    })
    });
router.get('/:leaderName',function(req,res){
    const ledr=req.params.leaderName;
    eventModel.find({leader: ledr})
    .exec()
    .then(pro=>{
        res.json(pro).status(200);
    })
});
module.exports = router;
