const mongoose=require("mongoose");

const projectSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    photos:Array,
    url:{
        type:String
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,ref:'Student'
        
    }
    
})



const projectModel=mongoose.model("Project",projectSchema);


module.exports=projectModel;


