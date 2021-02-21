const mongoose=require("mongoose");
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
        ]
})


const postJobModel=mongoose.model("Job",postJobSchema);

module.exports=postJobModel;


