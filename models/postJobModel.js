const mongoose=require("mongoose");
const moment=require("moment")
const postJobSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    
    tech:[
        {type:String}
        ],
        
    branches:[
        {type:String}
        ],
        
    eligibility:[
    {type:String}
    ],
    experience:{
        type:String,
        required:true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId
        ,ref:'Company'
        
    },
    applied:[
        {
        type: mongoose.Schema.Types.ObjectId
        ,ref:'Student'
        
    },
        ],
        expireDate:{
            type:String,
            required:true
        }
})



const postJobModel=mongoose.model("Job",postJobSchema);

module.exports=postJobModel;


