const express= require('express')
const mongoose =require("mongoose")
const userRoute = require("./routes/user.js")
require('dotenv').config();



const app = express() 


//middleware that fires before routes(prepares app for sending data to server)
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

//router handler 
app.use("/api/user", userRoute)

//connecting to db 
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listen for request
    const port=process.env.PORT
    app.listen(port, ()=>{
        console.log("connected to db & listening at "+ port)
    })
})
.catch((err)=>(
    console.log(err)
))