const asyncHandler = require('express-async-handler');
const userSchema=require("../models/user.model")
const WatchSpecification=require("../models/watch_specification.model")
const { generateToken } = require('../utils/generateToken');
const jwt=require("jsonwebtoken")
const e = require('express');
const dotenv=require('dotenv')
const mongoose = require("mongoose")
const requestsSchema=require("../models/requests.model")
dotenv.config()
var fs = require('fs');
const path = require('path');

module.exports.register = asyncHandler(async (req, res) => {
        try {
          const { email, password,mobileNumber } = req.body;
      
          // Check if user already exists
          const existingUser = await userSchema.findOne({ email });
          if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
          }
      
          // Create a new user
          const newUser = new userSchema({
            email,
            password,
            mobileNumber // Plain password (not hashed)
          });
      
          // Save the user to the database
          await newUser.save();
      
          res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      
})
module.exports.login = asyncHandler(async (req, res) => {
        try {
          const { email, password } = req.body;
      
          // Find the user in the database based on email
          const user = await userSchema.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Check if the provided password is valid
          const isPasswordValid = user.checkPassword(password);
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
          }
      
          // Password is valid, generate a JWT token and return it to the client
          const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
          return res.header("auth-token",token).send({ message : "Login Successful" , token : token})
        } catch (error) {
          console.error('Error logging in:', error);
          res.status(500).json({ message: 'Error logging in' });
        }
      

});
module.exports.addwatch=asyncHandler(async(req,res)=>{
  try{
    const{brand,model,reference_number,version_number,web_link,price,price_currency,model_case,oyster_architecture,diameter,material,bezel,winding_crown,crystal,water_resistance,movement,calibre,precision,functions,oscillator,winding,power_reserve,bracelet,bracelet_material,dial,details,certification}=req.body;
    const newWatch= new WatchSpecification({
      brand,
      model,
      reference_number,
      version_number,
      web_link,
      price,
      price_currency,
      model_case,
      oyster_architecture,
      diameter,
      material,
      bezel,
      winding_crown,
      crystal,
      water_resistance,
      movement,
      calibre,
      precision,
      functions,
      oscillator,
      winding,
      power_reserve,
      bracelet,
      bracelet_material,
      dial,
      details,
      certification,
      owner:req.user._id
    })
    if(req.files){
    if(req.files["watch_main_pic"]){
        newWatch.watch_main_pic=req.files["watch_main_pic"][0].filename
    }
    if(req.files["model_case_pic"]){
        newWatch.model_case_pic=req.files["model_case_pic"][0].filename
    }
    if(req.files["movement_pic"]){
        newWatch.movement_pic=req.files["movement_pic"][0].filename
    }
    if(req.files["bracelet_pic"]){
        newWatch.bracelet_pic=req.files["bracelet_pic"][0].filename
    }
    if(req.files["dial_pic"]){
        newWatch.dial_pic=req.files["dial_pic"][0].filename
    }
    if(req.files["pdf_download_userguide"]){
        newWatch.pdf_download_userguide=req.files["pdf_download_userguide"][0].filename
    }
    if(req.files["pdf_download_brochure"]){
        newWatch.pdf_download_brochure=req.files["pdf_download_brochure"][0].filename
    }
}
    await newWatch.save()
    return res.status(201).json({ message: 'Watch added successfully' });
  }
  catch(error){
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' ,error:error});
   
  }
})
//To search for a watch
module.exports.watches = asyncHandler(async(req,res)=>{
  try {
    const { brand, model } = req.query;

    // Build the search query
    const searchQuery = {};
    if (brand) {
      searchQuery.brand = brand;
    }
    if (model) {
      searchQuery.model = model;
    }

    // Find watches based on the search query
    const watches = await WatchSpecification.find(searchQuery);

    res.status(200).json({ watches });
  } catch (error) {
    console.error('Error searching watches:', error);
    res.status(500).json({ message: 'Error occured' });
  }
})
//To place a rent request by user
module.exports.rentrequest = asyncHandler(async(req,res)=>{
  try {
    const { id } = req.params;

    // Find the watch by ID
    const watch = await WatchSpecification.findById(id);
    if (!watch) {
      return res.status(404).json({ message: 'Watch not found' });
    }
    const newRequest = new requestsSchema({
        watch:id,
        requestBy:req.user._id,
    })
    await newRequest.save()
    res.status(200).json({ message: 'Rent request placed' });
  } catch (error) {
    console.error('Error placing rent request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})
//Owner can view the all the pending request to the watches
module.exports.requests = asyncHandler(async(req,res)=>{

  await requestsSchema.find({isAccepted:false}).populate("watch")
  .exec((err,requests)=>{
    if(err){
      return res.send({message:"No new requests"})
    }
    //console.log(requests)
    const filteredrequests=requests.filter(request=>request.watch.owner==req.user._id)
    res.status(500).json({filteredrequests})
  })
})
//Owner can accept the requets of the user
module.exports.acceptrequest = asyncHandler(async(req,res)=>{
  try {
    const requestId = mongoose.Types.ObjectId(req.params.id);
    console.log("requestId"+requestId)
    await requestsSchema.findByIdAndUpdate(requestId, { isAccepted: true });
    return res.status(200).json({ message: "Request Accepted Successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid request ID",error:error });
  }
})
//user can view the mobile number of owner for accepted requests
module.exports.acceptedrequests=asyncHandler(async(req,res)=>{
  const data=await requestsSchema.find({isAccepted:true,requestBy:req.user._id}).populate({
    path: "watch",
    populate: {
      path: "owner",
      select: "mobileNumber"
    }
  })
  if(data=={}){
    return res.json({message:"No Accepted requests"})
  }
  else{
    return res.json({message:data})
  }
})

//Owner can view the all the accepted request to the watches by him previously to create rental record

module.exports.rentals=asyncHandler(async(req,res)=>{
  
  await requestsSchema.find({isAccepted:true,status:false}).populate("watch")
  .exec((err,requests)=>{
    if(err){
      return res.send({message:"No new requests"})
    }
    const filteredrequests=requests.filter(request=>request.watch.owner==req.user._id)
    res.status(201).json({filteredrequests})
  })
})

//owner selects a accepted request to create rental record

module.exports.createRentalRecord=asyncHandler(async(req,res)=>{
  try {
    const {returnDate,startDate}=req.body
    const proofImage=req.files["proofImage"][0].filename
    const requestId = mongoose.Types.ObjectId(req.params.id);
    await requestsSchema.updateMany({_id:requestId},{$set:{returnDate:returnDate,startDate:startDate,proofImage:proofImage}});
    return res.status(200).json({ message: "Request Accepted Successfully" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Error while accepting request", error:error });
  }
})

//owner can view pending rental records
module.exports.pendingRentalRecords=asyncHandler(async(req,res)=>{
  try{
    await requestsSchema.find({isAccepted:true,status:false}).populate("watch")
  .exec((err,requests)=>{
    if(err){
      return res.send({message:"No new pending rental records"})
    }
    const filteredrequests=requests.filter(request=>request.watch.owner==req.user._id & request.startDate!="")
    res.status(201).json({filteredrequests})
  })
}
  catch(error){
    return res.send({message:"Error while retrieving"})
  }
})
//owner can mark the status as true after the item is returned
module.exports.closeRentalRecord=asyncHandler(async(req,res)=>{
  try {
    const returnProofImage=req.files["returnProofImage"][0].filename
    const requestId = mongoose.Types.ObjectId(req.params.id);
    await requestsSchema.updateMany({_id:requestId},{$set:{status:true,returnProofImage:returnProofImage}});
    return res.status(200).json({ message: "Watch return recorded successfully" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Error while accepting request", error:error });
  }
})
