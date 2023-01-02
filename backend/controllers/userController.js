const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


/*const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRETE, {expiresIn:"3d"})
}*/

//login 
const loginUser= async (req, res)=>{
    const {email, password} = req.body; 

    try{
       const user= await User.login( email, password )
       res.status(200).json(user)
    }catch(error){
       res.status(400).json({error: error.message})
   }
}

//signup 
const signupUser = async(req, res)=>{
    const{email, password, fname, lname, gender, phone, profession}=req.body 

    try{
        const user= await User.signup(email, password, fname, lname, gender, phone, profession)
        res.status(200).json({email})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports={
    signupUser,
    loginUser
}