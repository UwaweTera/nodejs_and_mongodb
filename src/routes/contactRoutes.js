import  express  from "express";
import Contact from "../model/messageMod";
import {verifyTokens , verifyUserTokens} from "../middlewares/autho";
import contVal from "../middlewares/messageMid";
import { ContactContr,messages,deleteMsg} from "../controller/mesController";
import {UserRegistration, userLogin}  from "../controller/regController";
const router2 = express.Router();


// adding message
router2.post('/contacts',contVal,ContactContr);
//get all messages
router2.get("/contacts",verifyTokens, messages)
//delete message
router2.get("/contacts/:id/delete",verifyTokens, deleteMsg)

export default router2