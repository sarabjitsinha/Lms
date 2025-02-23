import mongoose from "mongoose";
import express from "express";
import cors from "cors"
// import jwt from "jsonwebtoken"
import { student } from "./Model/Student.js";

const app=new express();
app.use(cors())
app.use(express.json())
app.listen(2700,()=>{
    console.log("server started")
});

mongoose.connect("mongodb://127.0.0.1:27017/LMS");
const db=mongoose.connection;

db.on("open",()=>{
    console.log("Connection to database is successful")
})

db.on("error",()=>{
    console.log("error connecting to server")
})

app.post('/register',(req,res)=>{
    async function insert() {
        const {name,email,password}=req.body;
    const newrec=new student({
        name,
        email,
        password
    }) 
    await newrec.save();
    res.status(201);
    }
   
   insert();
// student.create(req.body).then((student)=>res.json(student)).catch((err)=>res.json(err))

})

app.post('/login', (req,res)=>{
    const {name,password}=req.body
    student.findOne({name:name}).then((stud)=>{
       if(stud){
        if(stud.password===password){
            res.json("success")
        }
        else{
            res.json('login failed')
        }
    }
    else{
        res.json("user not registered")
    }
    }).catch(err=>console.log(err))
})