const mongoose=require("mongoose");

const companySchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    employees: [
        {type: mongoose.Schema.Types.ObjectId,ref:'Student'}
    ],
    pani:{
        type:String,
        default:"company"
    }

    
})


const companyModel=mongoose.model("Company",companySchema);


module.exports=companyModel;

