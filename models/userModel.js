const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const validator=require('validator')
const Schema = mongoose.Schema;


const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//static signup method
userSchema.statics.signup=async function(email,password){ 
/*its needs to a regular ftn not an
 arrow ftn , otherwise 'this' keyword won't work*/

 //validation
 if(!email || !password){
    throw Error('All fields must be filled')
 }

 if(!validator.isEmail(email)){
    throw Error('Email is not valid')
 }

 if(!validator.isStrongPassword(password)){
    throw Error('Password is not strong enough')
 }

    const exist=await this.findOne({email})

    if(exist){
        throw Error('Email already in use')
    }

    //mypassword785464fvd4dvr45v  ---salt
    //mypassword154dfgt656521fvr

    const salt=await bcrypt.genSalt(10);

    const hash=await bcrypt.hash(password,salt);//bcrypt is hasing the password

    const user=await this.create({email,password:hash})

    return user;
}

//static login metho
userSchema.statics.login=async function(email,password){
    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user=await this.findOne({email});

    if(!user){
       throw Error('Incorrect email')
    }

    const match=await bcrypt.compare(password,user.password);//either true or false

    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}

module.exports=mongoose.model('User',userSchema);