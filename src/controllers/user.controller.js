const asyncHandler = require('express-async-handler');
const userSchema=require("../models/user.model")
const ItemSpecification=require("../models/item_specification.model")
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
module.exports.additem=asyncHandler(async(req,res)=>{
  try{
    const{brand,model,price,details}=req.body;
    const newItem= new ItemSpecification({
      brand,
      model,
      price,
      details,
      owner:req.user._id
    })
    if(req.files){
    if(req.files["itemPic"]){
        newItem.itemPic=req.files["itemPic"][0].filename
    }

}
    await newItem.save()
    return res.status(201).json({ message: 'Item added successfully' });
  }
  catch(error){
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' ,error:error});
  }
})
//To search for a watch
module.exports.items = asyncHandler(async(req,res)=>{
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
    const items = await ItemSpecification.find(searchQuery);

    res.status(200).json({ items });
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
    const item = await ItemSpecification.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Watch not found' });
    }
    const newRequest = new requestsSchema({
        item:id,
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

  await requestsSchema.find({isAccepted:false}).populate("item")
  .exec((err,requests)=>{
    if(err){
      return res.send({message:"Error occured"})
    }
    //console.log(requests)
    const filteredrequests=requests.filter(request=>request.item.owner==req.user._id)
    res.status(500).json({filteredrequests})
  })
})
//Owner can accept the requets of the user
module.exports.acceptrequest = asyncHandler(async(req,res)=>{
  try {
    const requestId = mongoose.Types.ObjectId(req.params.id);
    await requestsSchema.findByIdAndUpdate(requestId, { isAccepted: true });
    return res.status(200).json({ message: "Request Accepted Successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid request ID",error:error });
  }
})
//user can view the mobile number of owner for accepted requests
module.exports.acceptedrequests=asyncHandler(async(req,res)=>{
  const data=await requestsSchema.find({isAccepted:true,requestBy:req.user._id}).populate({
    path: "item",
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
  
  await requestsSchema.find({isAccepted:true,status:false}).populate("item")
  .exec((err,requests)=>{
    if(err){
      return res.send({message:"No new requests"})
    }
    const filteredrequests=requests.filter(request=>request.item.owner==req.user._id)
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
    return res.status(200).json({ message: "Rental record created" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Error while accepting request", error:error });
  }
})

//owner can view pending rental records
module.exports.pendingRentalRecords=asyncHandler(async(req,res)=>{
  try{
    await requestsSchema.find({isAccepted:true,status:false}).populate("item")
  .exec((err,requests)=>{
    if(err){
      return res.send({message:"No new pending rental records"})
    }
    const filteredrequests=requests.filter(request=>request.item.owner==req.user._id & request.startDate!="")
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
    return res.status(200).json({ message: "item return recorded successfully" });
  } catch (error) {
    console.log("error",error)
    return res.status(400).json({ message: "Error occured", error:error });
  }
})
