const express=require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel}=require("../model/user.model")
const userRoute=express.Router()

//register

userRoute.post("/register",async(req,res)=>{
    const {email,username,avtar,password}=req.body
    try {
        const existUser= await UserModel.findOne({username})
        if(existUser){
            res.status(400).send({"msg":"username already exist!"})
        }
        else{

            bcrypt.hash(password, 5, async(err, hash)=> {
                if(hash){
                    const user=new UserModel({username,email,password:hash,avtar})
                   await user.save()
                   res.send({"msg":"Registration successful"})
                }
            });
        }
        
    } catch (error) {
        res.send(error)
    }

})


// login

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    
    
    try {
        const user= await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                   const token= jwt.sign({ username:user.username}, "blogs")
                        res.send({"msg":"Login successful","token":token,"username":user.username})
                }
                else{
                    res.send({"msg":"Password is wrong!"})
                }
            });

        }
        else{
            res.send({"msg":"user not found!"})
        }
        
        
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    userRoute
}

