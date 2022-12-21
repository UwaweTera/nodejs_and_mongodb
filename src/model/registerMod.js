import mongoose from "mongoose";
const Schema =  mongoose.Schema;

const UserRegSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserRegSchema.path('email').validate(async (email)=>{
    const emailCount = await mongoose.models.UserReg.countDocuments({email})
    return !emailCount
}, 'Email already exists');

const UserReg = mongoose.model("UserReg",UserRegSchema);

// Registration schema to admin

const regSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

regSchema.path('email').validate(async (email)=>{
    const emailCount = await mongoose.models.Signup.countDocuments({email})
    return !emailCount
}, 'Email already exists');

//create contact model
const Signup = mongoose.model("Signup",regSchema);

export {UserReg, Signup}