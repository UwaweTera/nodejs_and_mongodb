import  express  from "express";
import "../../middlewares/autho";
import passport from "passport";
import contVal from "../../middlewares/messageMid";
import RequireAuth from "../../utils/forRoutes";
import { ContactContr,messages,deleteMsg} from "../../controller/mesController";
import { checkingAdmin } from "../../middlewares/checkUser";
const router2 = express.Router();

// adding message
router2.post('/',contVal,ContactContr);
//get all messages
router2.get("/",RequireAuth,checkingAdmin, messages)
//delete message
router2.delete("/:id",passport.authenticate('jwt',{session: false}),checkingAdmin, deleteMsg)

export default router2