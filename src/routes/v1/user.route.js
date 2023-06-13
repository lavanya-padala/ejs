const express = require('express');
const multer=require("multer")
const { protectUser } = require('../../middlewares/authMiddleware');
const{ 
    register,
    login,
    addwatch,
    watches,
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
router.post("/addwatch",verifyuser,upload.fields([{ name: 'watch_main_pic', maxCount: 1 },
{ name: 'model_case_pic', maxCount: 1 },
{ name: 'movement_pic', maxCount: 1 },
{ name: 'bracelet_pic', maxCount: 1 },
{ name: 'dial_pic', maxCount: 1 },
{ name: 'pdf_download_userguide', maxCount: 1 },
{ name: 'pdf_download_brochure', maxCount: 1 }]),addwatch)
router.post("/watches",verifyuser,watches)
router.post("/watches/:id/rent",verifyuser,rentrequest)
router.post("/requests",verifyuser,requests)
router.post("/requests/:id/accept",verifyuser,acceptrequest)
router.post("/acceptedrequests",verifyuser,acceptedrequests)
router.post("/rentals",verifyuser,rentals)
router.post("/rentals/:id/create",verifyuser,upload.fields([{ name: "proofImage",maxCount : 1}]),createRentalRecord)
router.post("/pendingrentals",verifyuser,pendingRentalRecords)
router.post("/closerentalrecord/:id",verifyuser,upload.fields([{ name: "returnProofImage",maxCount : 1}]),closeRentalRecord)
module.exports = router;