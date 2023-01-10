import  express  from "express";
import {verifyTokens,UserVald,signupVald} from "../middlewares/autho.js";
import {UserRegistration, userLogin,register,signedIn, login}  from "../controller/regController.js";
const router3 = express.Router();

//User registration
router3.post('/user/signup',UserVald,UserRegistration)
//user login
router3.post('/user/login/',userLogin)

//Admin registration 
router3.post('/signup',signupVald,register);
//Get all admin registered
router3.get('/signup',verifyTokens,signedIn);

//login for admin
router3.post('/login',login);

export default router3