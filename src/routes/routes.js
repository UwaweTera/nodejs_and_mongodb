import express  from "express";
import router1 from "./api/articleRoutes";
import router2 from "./api/contactRoutes";
import router3 from "./api/regRoutes";

const router = express.Router();

router.use('/blogs', router1)
router.use('/messages', router2)
router.use('/user', router3)

router.all('*',(req,res)=>{
    res.status(404).json('Page not found')
})
export default router