const multer=require("multer")
module.exports.upload =multer({storage: multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'watch_main_pic') {
      cb(null, 'uploads/watch_main_pic');
    } else if (file.fieldname === 'model_case_pic') {
      cb(null, 'uploads/model_case_pic');
    } else if (file.fieldname === 'movement_pic') {
      cb(null, 'uploads/movement_pic');
    }
      else if (file.fieldname === 'bracelet_pic') {
        cb(null, 'uploads/bracelet_pic');
    } 
    else if (file.fieldname === 'dial_pic') {
      cb(null, 'uploads/dial_pic');
    }
      else if (file.fieldname === 'pdf_download_brochure') {
        cb(null, 'uploads/pdf_download_brochure');
  }
  else if (file.fieldname === 'pdf_download_userguide') {
    cb(null, 'uploads/pdf_download_userguide');
}else {
      cb(null , "uploads/proof_image");
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, `${uniqueSuffix}.${extension}`);
  },
})
})
