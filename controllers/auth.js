
const studentModel=require("../models/studentModel.js");
const companyModel=require("../models/companyModel.js");

const {SECRET_KEY}=require("../secrets.js")
const jwt=require("jsonwebtoken")
exports.isLogin=async (req,res,next)=>{
    
    try{
        
        // console.log(req.headers.token)
        console.log("protected")
        const token=req.headers.token

        const {id}=await jwt.verify(token,SECRET_KEY);
        
        // const student=await studentModel.findById(id);
        if(id)
        {
            console.log("inside protected")
            req.id=id;
            console.log("out to go protected")
            next();
        }
        else{
            throw new Error("Your not authorized");
        }
        
        
    }
    catch(err)
    {
        res.status(200).json({
            status:"failuer",
            message:err.message
        })
    }
    
    
}

exports.isStudent=async(req,res,next)=>{
    
    try{
        
        const student=await studentModel.findById(req.id);
        if(student&& student.pani=="student")
        {
            req.student=student;
            next();
        }
        else{
            throw new Error("Your Not authorized")
        }
        
    }
    catch(err)
    {
        res.status(200).json({
            status:"failuer",
            message:err.message
        })
    }
    
    
}



exports.isCompany=async(req,res,next)=>{
    
    try{
        
        const company=await companyModel.findById(req.id);
        if(company&& company.pani=="company")
        {
            req.company=company;
            next();
        }
        else{
            throw new Error("Your Not authorized")
        }
        
    }
    catch(err)
    {
        res.status(200).json({
            status:"failuer",
            message:err.message
        })
    }
    
    
}
