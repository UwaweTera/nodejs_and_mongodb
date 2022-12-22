import  express  from "express";
import {verifyTokens, verifyUserTokens,UserVald,loginVald,signupVald} from "../middlewares/autho";
import {UserRegistration, userLogin,register,signedIn, login}  from "../controller/regController";
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