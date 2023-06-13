const jwt=require("jsonwebtoken");
const dotenv=require('dotenv')

dotenv.config()
module.exports=async function(req,res,next){
    const token=await req.header("auth-token");
    if(!token) return res.status(400).send("Access denied")
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        console.log(verified._id)
        next();
    }
    catch(err){
        res.status(400).send("Invalid token")
    }
}