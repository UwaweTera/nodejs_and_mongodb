import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserRegSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Registration schema to admin

const regSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  requestAdminRole: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
});

/* regSchema.path('email').validate(async (email)=>{
    const emailCount = await mongoose.models.Signup.countDocuments({email})
    return !emailCount
}, 'Email already exists'); */

//create contact model
const Signup = mongoose.model("Signup", regSchema);
const UserReg = mongoose.model("UserReg", UserRegSchema);

export { UserReg, Signup };
