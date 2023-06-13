const jwt = require('jsonwebtoken');
const fs = require('fs')


const generateToken = (id, time = '90d') => {

  var cert = fs.readFileSync('jwtRS256.pem');  // get private key

  return jwt.sign({ id }, cert, {
    expiresIn: time,
    algorithm:'RS256'
  });
};

module.exports = { generateToken };
