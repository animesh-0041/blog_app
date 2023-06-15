const express=require("express")
const {BlogModel}=require("../model/blog.model")
const blogRouter=express.Router()




blogRouter.post("/blogs",async(req,res)=>{
    try {
        const blog =new BlogModel(req.body)
        await blog.save()
res.send({"msg":"Blog has been posted"})
        
    } catch (error) {
        res.send(error)
    }
})
blogRouter.get("/blogs",async(req,res)=>{
    try {
       const blogs=await BlogModel.find()
res.send(blogs)
        
    } catch (error) {
        res.send(error)
    }
})





module.exports={
    blogRouter
}