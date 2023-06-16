const multer=require("multer")
module.exports.upload =multer({storage: multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'itemPic') {
      cb(null, 'uploads/itemPic');
    } else if (file.fieldname === 'proofImage') {
      cb(null, 'uploads/proofImage');
    } else if (file.fieldname === 'returnProofImage') {
      cb(null, 'uploads/returnProofImage');
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, `${uniqueSuffix}.${extension}`);
  },
})
})
