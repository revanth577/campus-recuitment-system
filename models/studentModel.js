const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    studentId:{
      type:String,
      required:true
    },
    email:{
        type:String,
        required:true
    },
    collegeId:{
        type:String,
        required:true
    },
    collegeName:{
    
        type:String,
        required:true
    },
    password:{
      type:String,
      required:true
    },
    branch:{
        type:String,
        required:true,
        enum:['cse','ece','eee','civil','mech','it']
    },
    graduationYear:{
      type:String,
      required:true
    },
    bio:{
      
      type:String,
      required:true
    },
    year:{
        type:Number,
        required:true
    },
    placedCompanies:Array,
    resume:{
        type:String
    },
    pani:{
    type:String,
    default:"student"
    
    },
    gender:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    },
    activeBacklogs:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        default:"data:image/jpeg;base64,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"
    }
 
})


const studentModel=mongoose.model("Student",studentSchema);

module.exports=studentModel;