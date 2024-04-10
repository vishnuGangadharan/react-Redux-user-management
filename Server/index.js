import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRouter.js'
import cookieParser from 'cookie-parser';
import adminRoute from './routes/admin/authRouter.js'

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

app.use(cookieParser());

app.listen(3000,()=>{
    console.log('server running on 3000');
})


app.use('/api/user',userRouter);
app.use('/api/auth',authRouter)
app.use('/api/adminAuth',adminRoute)
app.use('/api/static',express.static("public"))

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode
    })
})