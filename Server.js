const express= require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
const { errorHandler } = require("./Middleware/errorHandaler");
const routes=require("./routes");
const cors=require("cors");
dotenv.config();
const server=express();
server.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{console.log("DB connected")})
.catch((e)=>console.log(e))

server.use(express.json());
server.use(cookieParser());

server.use("/api",routes);
server.use((req,res,next) =>{
const error=new Error("undefined route error");
error.statusCode=400;
throw next(error)
})
server.use(errorHandler)
server.listen(5000,()=>{
    console.log("server connected")
})



