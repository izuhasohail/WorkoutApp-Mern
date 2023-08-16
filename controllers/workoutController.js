const Workout=require('../models/workoutModel')
const mongoose=require('mongoose')

//get all workouts
    const getWorkouts=async(req,res)=>{
        const user_id=req.user._id;
        const workouts=await Workout.find({user_id:user_id}).sort({createdAt:-1})//descending order
        res.status(200).json(workouts)
    }

//get a single workout
    const getSingleWorkout=async(req,res)=>{
        const { id }=req.params;

          /*This is a check so that 
          if an invalid id is being searched
          ,the app will not crash,however specific
         error message will be displayed */
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No such workout'});
        }
        
        const workout=await Workout.findById(id);

        if(!workout){
           return res.status(404).json({eoor:'No such workout'})
        }

        res.status(200).json(workout)




    }




//create new workout
const createWorkout=async(req,res)=>{



    const {title,reps,load}=req.body;

    let emptyFields=[];

    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill al the fields',emptyFields})
    }

    try{
        const user_id=req.user._id;
        const workout=await Workout.create({title,reps,load,user_id})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}



//delete a workout

    const deleteWorkout=async(req,res)=>{
        //get id from the url params
        const { id }=req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({errpr:'No such workout'})
        }

        const workout=await Workout.findOneAndDelete({_id:id});

        if(!workout){
            return res.status(400).json({error:'No such workout'})
        }

        res.status(200).json(workout);

    }


//update a workout

    const updateWorkout=async(req,res)=>{

        const { id }=req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No such workout'})
        }

        const workout=await Workout.findByIdAndUpdate(
            {_id:id},
            {
                ...req.body
            }
            )

    if(!workout){
        return res.status(400).json({error:'No such workout'})
    }   

    res.status(200).json(workout);

    }



//-----------------



module.exports={
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}