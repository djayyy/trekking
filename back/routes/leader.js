const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const leaderModel =require('../models/leaderModel');
router.get('/',function(req,res){
    leaderModel.find()
    .exec()
    .then(ldr=>{
        res.json(ldr).status(200);
    })
 });
router.post('/',function(req,res){
const newleader = new leaderModel({
    _id:new mongoose.Types.ObjectId(),
    name:req.body.name,
    email : req.body.email,
    password:req.body.password
});
leaderModel.find({email:req.body.email})
.exec()
.then(ldr =>{
    if(ldr.length>0){
      res.send("leader already exist").status(400);
    }else{
        newleader.save();
        res.send("leader added").status(200);
    }
})
.catch(err =>{
    console.log(err);
});
});
router.get('/:leaderId',function(req,res){
    const id = req.params.leaderId;
    leaderModel.findById(id)
    .exec()
    .then(ldr=>{
        res.json(ldr).status(200);
    })
});
router.delete('/:leaderId',function(req,res){
    const id=req.params.leaderID;
    leaderModel.deleteOne({_id:id})
    .exec()
    .then(data=>{
        res.json(data).status(200);
    })
});
module.exports = router;