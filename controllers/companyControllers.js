
const comapanyModel=require("../models/companyModel.js")
const postJobModel=require("../models/postJobModel.js")

const jwt = require('jsonwebtoken');
const {SECRET_KEY}=require("../secrets.js");

exports.signup=async (req,res)=>{
    
    
    
    try{
        
      const data=req.body;
      
      if(!data.name || !data.description|| !data.email || !data.password||!data.confirmPassword)
      {
          throw new Error("Required All Fields");
      }
      
      if(data.password!=data.confirmPassword)
      {
          throw new Error("passwords are mismatch");
      }
      
      const emailExists=await comapanyModel.findOne({email:data.email});
      
      
      if(emailExists)
      {
          throw new Error("Email already exists");
      }
      
      if(data.pani)
      {
          data.pani="company"
      }
      
      const newCompany=await comapanyModel.create(data);
      
      newCompany.password=undefined;
      
      res.status(201).json({
            status:"success",
            data:newCompany
            
        })
      
      
      
        
    }
    catch(err)
    {
        res.status(200).json({
            status:"failure",
            message:err.message
        })
    }
    
    
    
}

exports.login=async(req,res)=>{
    
    try{
        const data=req.body;
        
        
        
       if(!data.email||!data.password)
       {
           throw new Error("Required all fileds");
       }
       
       
        let company=await comapanyModel.findOne({email:data.email});
        if(!company)
        {
            throw new Error("No company Found");
        }
        
        
         company=await comapanyModel.findOne({email:data.email,password:data.password})
        
        if(company)
        {
            const token=await jwt.sign({id:company._id},SECRET_KEY,{expiresIn:'1h'});
            company.password=undefined
            res.status(201).json({
            status:"success",
            data:company,
            token:token
        })
        }
        else{
            throw new Error("credientials are invalid");
        }
        
         
        
    }
    catch(err)
    {
        res.status(200).json({
            status:"failure",
            message:err.message
        })
    }
}

exports.postJob=async(req,res)=>{
    
    try{
        const data=req.body;
       
        if(!data.name || !data.eligibility||!data.experience)
        {
            throw new Error("Required Fields");
        }
        
        let job=new postJobModel(data);
        job.company=req.company._id;
        job=await job.save();
        
          res.status(201).json({
            status:"success",
            data:job
        })
    }
    catch(err)
    
    {
        res.status(200).json({
            status:"failure",
            message:err.message
        }) 
    }
    
    
}

exports.getAllJobs=async(req,res)=>{
    
    
    try{
        
        const allJobs=await postJobModel.find({})
        
        res.status(201).json({
            status:"success",
            data:allJobs
        })
    }
    catch(err)
    {
        res.status(200).json({
            status:"failure",
            message:err.message
        }) 
    }
}

exports.getPostsByCompany=async(req,res)=>{
    
    try{
        
        const company=req.company;
        
        const allPosts=await postJobModel.find({company:company._id});
        
        
        
        res.status(201).json({
            status:"success",
            data:allPosts
        })
    }
    catch(err)
    {
        res.status(200).json({
            status:"failure",
            message:err.message
        }) 
    }
}

exports.getStudentByPost=async(req,res)=>{
    try{
        
        const pid=req.params.id;
        
        
        const post=await postJobModel.findById(pid);
        
        const studentsApplied=post.applied;
        
        
        
        res.status(201).json({
            status:"success",
            data:studentsApplied
        })
        
    }
    catch(err)
    {
        
        res.status(200).json({
            status:"failure",
            message:err.message
        }) 
    }
}