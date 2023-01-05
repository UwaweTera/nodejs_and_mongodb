import express from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import router from './routes/routes';
const app = express();

const dbURI = process.env.DBURI;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(passport.initialize());
app.use("/",router);

const connect = ()=>{
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.DBTESTURI,{useNewUrlParser: true, useUnifiedTopology: true})
        console.log('connected to database')
    } catch (error) {
        console.log(error)
    }
}
connect()

export default app