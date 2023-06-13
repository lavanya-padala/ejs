const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User } = require('../models/user.model');
const fs = require('fs')

module.exports.protectUser = asyncHandler(async (req, res, next) => {

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      var cert = fs.readFileSync('jwtRS256.pem');  // get private key
  
      const decoded = jwt.verify(token, cert, { algorithms: ['RS256']});
      console.log(decoded)
      req.user = await User.findById(decoded.id);
     
      if (req.user === null) {
        res.status(401);
        throw new Error('Not authorized1');
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized2');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized3');
  }
});
