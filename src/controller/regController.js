import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcryptjs";
import { UserReg, Signup } from "../model/registerMod";

//some global variable
const SecretKey = process.env.JWT_SECRET;
const userSecret = process.env.USER_SECRET;

//User registration
const UserRegistration = (req, res) => {
  const { name, email, password } = req.body;
  //hashing password
  bcrypt.hash(password, 10, async (err, hashPin) => {
    if (err) {
      res.json(err);
    } else {
      const enterUser = new Signup({
        name,
        email,
        password: hashPin,
      });

      const emailExist = await Signup.findOne({ email: req.body.email });

      if (emailExist) {
        res.status(400).json("already there");
      } else {
        await enterUser.save();
        res.status(200).json({status: 200, user: enterUser});
      }
    }
  });
};

//User login
const userLogin = async (req, res) => {
  let token = jwt.sign({ id: req.user._id }, userSecret);
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    token,
  });
};

//admin user registration
const register = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10, async (error, hashedPass) => {
      if (error) {
        res.json({
          error: "not hashed",
        });
      }
      const { name, email, password } = req.body;
      const enterUser = new Signup({
        name,
        email,
        role: "admin",
        password: hashedPass,
      });
  
      const emailExist = await Signup.findOne({ email: req.body.email });
  
      if (emailExist) {
        res.status(400).json("already there");
      } else {
        enterUser.save();
        res.json({status: 200, user: enterUser});
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
 
};

//getting all admin signed in

const signedIn = async (req, res) => {
  const result = await Signup.find();
  res.status(200).json(result);
};

//delete users
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Signup.deleteOne({ _id: id });
    res.status(200).json({ msg: "user deleted" });
  } catch (error) {
    res.status(404).json({ error: "user not found" });
  }
};

//assign user role
const assignRole = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Signup.findOne({ _id: id });
    const { role } = req.body;
    if (role) {
      user.role = role;
    }
    await user.save();
    res
      .status(200)
      .json({ status: 200, message: `User Assigned to ${role} role` });
  } catch (error) {
    res.status(500).json({ status: 500, message: "server error" });
  }
};

// get user profile
const getProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const result = await Signup.findOne({_id : id});
        res.status(200).json({status: 200, user: result});
    } catch (error) {
        res.status(500).json({ status: 500, message: "server error" });
    }
};

//update user profile
const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    
    const user = await Signup.findOne({ _id: id });
    const { name, email } = req.body;
    if (name) {
      user.name = name;
    }

    if (email) {
      const emailExist = await Signup.findOne({ email });
      user.email = email;
    }

    await user.save();
    res.status(200).json({ status: 200, message: `Your profile updated` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "server error" });
  }
};

// get request admin role
const getReqAdminRole = async (req, res) => {
    try {
        const result = await Signup.find({requestAdminRole : true});
        res.status(200).json({status: 200, users: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "server error" });
    }
};

//request admin role
const requestAdminRole = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await Signup.findOne({ _id: id });
    
    if(user){
        user.requestAdminRole = true
    }
    await user.save();
    res.status(200).json({ status: 200, message: `Request received` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "server error" });
  }
};

//request admin role
const rejectReqAdminRole = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await Signup.findOne({ _id: id });
    
    if(user){
        user.requestAdminRole = false
    }
    await user.save();
    res.status(200).json({ status: 200, message: `Request admin role rejected` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "server error" });
  }
};

export {
  UserRegistration,
  userLogin,
  register,
  signedIn,
  deleteUser,
  assignRole,
  getProfile,
  updateProfile,
  getReqAdminRole,
  requestAdminRole,
  rejectReqAdminRole
};
