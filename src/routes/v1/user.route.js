const express = require('express');
const multer=require("multer")
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
router.post('/login', login);
router.post('/register', register);
router.post("/additem",verifyuser,upload.fields([{ name: 'itemPic', maxCount: 1 }]),additem)
router.post("/items",verifyuser,items)
router.post("/items/:id/rent",verifyuser,rentrequest)
router.post("/requests",verifyuser,requests)
router.post("/requests/:id/accept",verifyuser,acceptrequest)
router.post("/acceptedrequests",verifyuser,acceptedrequests)
router.post("/rentals",verifyuser,rentals)
router.post("/rentals/:id/create",verifyuser,upload.fields([{ name: "proofImage",maxCount : 1}]),createRentalRecord)
router.post("/pendingrentals",verifyuser,pendingRentalRecords)
router.post("/closerentalrecord/:id",verifyuser,upload.fields([{ name: "returnProofImage",maxCount : 1}]),closeRentalRecord)
module.exports = router;