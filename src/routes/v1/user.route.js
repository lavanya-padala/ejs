const express = require('express');
const app=express()
const path=require("path");
const multer=require("multer");
const dotenv = require('dotenv');
dotenv.config();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const ejs=require("ejs")
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"..","/views"))
app.use(express.json())
const{ 
    register,
    login,
    additem,
    items,
    rentrequest,
    requests,
    acceptrequest,
    acceptedrequests,
    rentals,
    createRentalRecord,
    pendingRentalRecords,
    closeRentalRecord
} = require("../../controllers/user.controller")
const verifyuser=require("../../middlewares/verifyuser")
const router = express.Router();
const {upload}=require("../../config/multerUpload")
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,"..","..",'/views/register.html'));
  });
  router.post('/register',register)
  router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,"..","..",'/views/login.html'));
  });
  router.post('/login',login);
router.get('/additem',(req, res) => {
    res.sendFile(path.join(__dirname,"..","..",'/views/addItem.html'));
  });
  router.get('/createrental',(req, res) => {
    res.sendFile(path.join(__dirname,"..","..",'/views/createRental.html'));
  });
  router.get('/closerental',(req, res) => {
    res.sendFile(path.join(__dirname,"..","..",'/views/closeRental.html'));
  });
router.get("/items",(req,res)=>{
  const apiUrl = `${process.env.BASE_URL}/api/v1/users/items`;
const headers = {
  'Content-Type': 'application/json',
  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkwMGUzZmY0OTQ4ZDIyMGMyYTliZWMiLCJpYXQiOjE2ODczMTA2NTJ9.YRHr8JbJTMgWa9ynel8gjxxPmDxCJguqEdoo2UujCqE',
};

fetch(apiUrl, {
  method: 'POST',
  headers: headers,
})
  .then(response => response.json())
  .then(data => {
    res.render('items', { items: data.items });
  })
  .catch(error => {
    res.send({ error });
      console.log('Fetch error:', error);
  })
})
router.get("/requests",(req,res)=>{
  const apiUrl = `${process.env.BASE_URL}/api/v1/users/requests`;
const headers = {
  'Content-Type': 'application/json',
  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkwMGUzZmY0OTQ4ZDIyMGMyYTliZWMiLCJpYXQiOjE2ODczMTA2NTJ9.YRHr8JbJTMgWa9ynel8gjxxPmDxCJguqEdoo2UujCqE',
};

fetch(apiUrl, {
  method: 'POST',
  headers: headers,
})
  .then(response => response.json())
  .then(data => {
    res.render('requests', { data: data});

  })
  .catch(error => {
    res.send({ error });
      console.log('Fetch error:', error);
  })
})
router.post("/additem",verifyuser,additem)
router.post("/items",verifyuser,items)
router.post("/items/:id/rent",verifyuser,rentrequest)
router.post("/requests",verifyuser,requests)
router.post("/requests/:id/accept",verifyuser,acceptrequest)
router.get("/acceptedrequests",(req,res)=>{
  const apiUrl = `${process.env.BASE_URL}/api/v1/users/acceptedrequests`;
const headers = {
  'Content-Type': 'application/json',
  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkwMTk1YTAxYjNmZDAwMzJkN2NlNDQiLCJpYXQiOjE2ODczMjI1MjB9.lF6HzR9CgGiaY7uW0-35f5UQy50c5N318Z6tHwMVHBA',
};

fetch(apiUrl, {
  method: 'POST',
  headers: headers,
})
  .then(response => response.json())
  .then(data => {
    res.render('acceptedRequests', { data: data });

  })
  .catch(error => {
    res.send({ error });
      console.log('Fetch error:', error);
  })
})
router.post("/acceptedrequests",verifyuser,acceptedrequests)
router.post("/rentals",verifyuser,rentals)
router.post("/rentals/:id/create",verifyuser,upload.fields([{ name: "proofImage",maxCount : 1}]),createRentalRecord)
router.get("/pendingrentals",(req,res)=>{
  const apiUrl = `${process.env.BASE_URL}/api/v1/users/pendingrentals`;

const headers = {
  'Content-Type': 'application/json',
  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkwMGUzZmY0OTQ4ZDIyMGMyYTliZWMiLCJpYXQiOjE2ODczMTA2NTJ9.YRHr8JbJTMgWa9ynel8gjxxPmDxCJguqEdoo2UujCqE',
};

fetch(apiUrl, {
  method: 'POST',
  headers: headers,
})
  .then(response => response.json())
  .then(data => {
    res.render('pendingRentals', { filteredrequests: data});

  })
  .catch(error => {
    res.send({ error });
      console.log('Fetch error:', error);
  })
})
router.post("/pendingrentals",verifyuser,pendingRentalRecords)
router.post("/closerentalrecord/:id",verifyuser,upload.fields([{ name: "returnProofImage",maxCount : 1}]),closeRentalRecord)
module.exports = router;