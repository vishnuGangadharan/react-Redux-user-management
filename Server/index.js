import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRouter.js'

dotenv.config()
mongoose.connect(process.env.mongo).then(()=>{
    console.log('connected to database');
}).catch((err)=>{
    console.log(err);
})

const app = express()

//to recive json data
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.listen(3000,()=>{
    console.log('server running on 3000assaa');
})


app.use('/api/user',userRouter);
app.use('/api/auth',authRouter)