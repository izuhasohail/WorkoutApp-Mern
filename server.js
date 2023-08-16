require('dotenv').config() /*this method will attach the environment variables to the process object */
const cors= require('cors');
const express=require('express');
const mongoose=require('mongoose')
const workoutRoutes=require('./routes/workout');
const userRoutes=require('./routes/user')
//express app
const app=express();

//middleware //global middleware
app.use(express.json())//this is required to use the req object inside the routes
app.use(cors())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})




//routes
 app.use('/api/workouts',workoutRoutes)
 app.use('/api/user',userRoutes)


 //connect to database
 mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    //listen to a certain port no
   app.listen(process.env.PORT || 5000,()=>{
       console.log('listening on port ',process.env.PORT)
   })
 })
 .catch(error=>{
    console.log(error)
 })



