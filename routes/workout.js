const express=require('express');


const {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}=require('../controllers/workoutController')


const requireAuth=require('../middleware/requireAuth')

const router=express.Router()
//require auth for all workout routes
router.use(requireAuth)//fire middleware ftn

//Get all workouts---------------------------
router.get('/',getWorkouts)

//----------------------------

///GET a single workout
router.get('/:id',getSingleWorkout)
//------------------------------


///POST a new workout

router.post('/',createWorkout)
//--------------------------------

///Delete a specific workout

router.delete('/:id',deleteWorkout)
//--------------------------------


///UPDATE a new workout

router.patch('/:id',updateWorkout)
//--------------------------------
module.exports=router