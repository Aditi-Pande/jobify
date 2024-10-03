import "express-async-errors"
import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary";

// routers
import JobRouter from './routes/JobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

// public
import {dirname } from 'path'
import { fileURLToPath } from "url"
import path from 'path'

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"
import { authMiddleware } from './middleware/authMiddleware.js'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url))

if(process.env.NODE_DEV === 'development'){
    app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, './public')))
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/api/v1/test', (req, res) => {
    res.json({msg:'test route'})
})

app.use('/api/v1/jobs',authMiddleware, JobRouter);
app.use('/api/v1/users', authMiddleware, userRouter);
app.use('/api/v1/auth', authRouter);

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./public", "index.html"));
//   });

app.use("*", (req, res) => {
    res.status(404).json({msg:"Not found!"})
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100;

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, ()=>{
        console.log(`server running! on PORT ${port}...`)
    })
} catch (error) {
    console.log(error)
    process.exit(1);
}