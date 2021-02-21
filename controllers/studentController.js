const studentModel=require("../models/studentModel.js")
const postJobModel=require("../models/postJobModel.js")

const jwt = require('jsonwebtoken');
const {SECRET_KEY}=require("../secrets.js");
const projectModel=require("../models/projectModel.js")

exports.login=async(req,res)=>{
    
    try{
        const data=req.body;
        
       if(!data.email||!data.password)
       {
           throw new Error("Required all fileds");
       }
       
       
        let student=await studentModel.findOne({email:data.email});
        if(!student)
        {
            throw new Error("No student Found");
        }
        
        
         student=await studentModel.findOne({email:data.email,password:data.password})
        
        if(student)
        {
            const token=await jwt.sign({id:student._id},SECRET_KEY,{expiresIn:'7d'});
            student.password=undefined
            res.status(201).json({
            status:"success",
            data:student,
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

exports.register=async(req,res)=>{
    
    try{
        const data=req.body;
        
        if(data.pani)
        {
            data.pani="student";
        }
        if(!data.email||!data.collegeId||!data.collegeName||!data.password||!data.confirmPassword||!data.branch||!data.year||!data.resume)
        {
            throw new Error("Required All Fields")
        }
      
        
        const emailExists=await studentModel.findOne({email:data.email});
       
        
        if(emailExists)
        {
            throw new Error("email alreay exists");
        }

        
        
        if(data.password!=data.confirmPassword)
        {
            throw new Error("passwords are mismatch");
        }

        
        const student=await studentModel.create(data);
        
        student.password=undefined
      
        res.status(201).json({
            status:"success",
            message:"registered succesffully,Please Login"
            
            
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



exports.allStudents=async(req,res)=>{
    try{
          
          console.log("all stduents")
          const students=await studentModel.find({})
          
          
           res.status(200).json({
            status:"success",
            data:students
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

exports.getStudentId=async (req,res)=>{
    try
    {
        
        const id=req.params.id;
        
        const student=await studentModel.findById(id);
          res.status(200).json({
            status:"success",
            data:student
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
exports.getStudent=async(req,res)=>{
    
    try{
        const student =await studentModel.findById(req.id);
        student.password=undefined;
        res.status(200).json({
            status:"success",
            data:student
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


exports.addProject=async(req,res)=>{
    
    
    try{
        const data=req.body;
        const id=req.params.id;
        const student=req.student;
        if(id!=student._id)
        {
            throw new Error("Your Not Authorized to add Project")
        }
        if(!data.name)
        {
            throw new Error("Name is required");
        }
        
        const project=new projectModel(data);
        
        project.student=student._id;
        await project.save();
        
         res.status(200).json({
            status:"success",
            data:project
            
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


exports.allProjects=async (req,res)=>{
    
    try{
        
        
        const id=req.id;
        
        
        const allProjects=await projectModel.find({student:id});
        
        
        
        res.status(200).json({
            status:"success",
            projects:allProjects
            
            
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


exports.updateStudent=async(req,res)=>{
    
    
    try{
        
        const data=req.body;
        const id=req.params.id;
        const studentId=req.student._id;
        if(data.collegeId||data.brach||data.pani)
        {
            throw new Error("Your Not authorized to modify");
        }
        if(studentId!=id)
        {
            throw new Error("Your not authorized to update");
        }
        
        const student=await studentModel.findById(studentId);
        if(data.name)
        {
            student.name=data.name;
        }
        if(data.year)
        {
            student.year=data.year;
        }
        if(data.branch)
        {
            student.branch=data.branch;
        }
        if(data.resume)
        {
            student.resume=data.resume;
        }
        if(data.email)
        {
            student.email=data.email;
        }
        if(data.activeBacklogs)
        {
            student.activeBacklogs=data.activeBacklogs
        }
        if(data.section)
        {
            student.section=data.section
        }
        if(data.percentage)
        {
            student.percentage=data.percentage
        }
        if(data.studentId)
        {
            studentId.studentId=data.studentId
        }
        if(data.gender)
        {
            student.gender=data.gender
        }
        if(data.graduationYear)
        {
            student.graduationYear=data.graduationYear
        }
        if(data.image)
        {
            student.image=data.image
        }
        if(data.bio)
        {
            student.bio=data.bio
        }
        const updatedStudent=await student.save({validateBeforeSave:false});
        updatedStudent.password=undefined;
        updatedStudent.pani=undefined;
         res.status(200).json({
            status:"success",
            data:updatedStudent
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


exports.applyForJob=async(req,res)=>{
    
    try{
        
        
        const pid=req.params.id;
        
        const post=await postJobModel.findById(pid);
        
        post.applied.push(req.student);
        
        await post.save({validateBeforeSave:false});
        
        
         res.status(201).json({
            status:"success",
            data:post
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