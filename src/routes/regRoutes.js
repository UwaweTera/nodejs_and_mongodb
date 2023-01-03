import  express  from "express";
import {UserVald,adminVald} from "../../middlewares/autho";
import "../../middlewares/autho";
import { checkingAdmin,checkingUser } from "../../middlewares/checkUser";
import {UserRegistration, userLogin,register,signedIn,deleteUser}  from "../../controller/regController";
import passport from "passport";
const router3 = express.Router();

//User registration
router3.post('/signup',UserVald,UserRegistration)
//user login
router3.post('/login',passport.authenticate('local',{session: false}),userLogin)

//Admin registration 
router3.post('/adminsignup',adminVald,register);
//Get all admin registered
router3.get('/',passport.authenticate('jwt',{session: false}),checkingAdmin,signedIn);

//delete users
router3.delete('/:id',passport.authenticate('jwt',{session: false}),checkingAdmin,deleteUser);
export default router3