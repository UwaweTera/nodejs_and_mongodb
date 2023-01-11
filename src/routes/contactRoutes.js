import  express  from "express";
import {verifyTokens , verifyUserTokens} from "../middlewares/autho.js";
import contVal from "../middlewares/messageMid.js";
import { ContactContr,messages,deleteMsg} from "../controller/mesController.js";
const router2 = express.Router();


// adding message
router2.post('/contacts',contVal,ContactContr);
//get all messages
router2.get("/contacts",verifyTokens, messages)
//delete message
router2.get("/contacts/:id/delete",verifyTokens, deleteMsg)

export default router2