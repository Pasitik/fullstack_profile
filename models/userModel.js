const mongoose= require('mongoose')
const validator = require("validator")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema 

const userSchema= new Schema({
    fname:{
        type:String,
        required: true
    },
    lname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type: String, 
        required:true
    },
    phone:{
        type:String,
        required: true
    },
   /* dob:{
        type: Date ,
        required: true
    },*/
    gender:{
        type:String,
        required: true
},
    profession:{
        type:String,
        required: true
}

})

//login method
userSchema.statics.login=async function(email, password){
    if(!email || !password){
        throw Error("All fields are required!!!")

    }
    const user= await this.findOne({email})


    if(!user){
        throw Error("Incorrect Email")
    }
    //using compare from bcrypt to compare passwords
    const match= await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect Password")
    } 
    
    return user
}

//signup method 
userSchema.statics.signup=async function(email, password, fname, lname, gender, phone, profession){
    if(!email || !password || !fname|| !lname|| !gender|| !phone|| !profession){
        throw Error("All fields required!!!")

    }

    if(!validator.isEmail(email)){
        throw Error("invalid email")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password is weak")
    }

    const exists= await this.findOne({email})

    if(exists){
        throw Error("Email already in use")
    }
    //using bcrypt to encrypt password before submitting to db 
    const salt = await bcrypt.genSalt(10)
    const hash =await bcrypt.hash(password,salt)
    //creating user data in db
    const user = await this.create({fname, lname,phone, email, password:hash, gender, profession})
}

module.exports= mongoose.model("User", userSchema)