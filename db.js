const mongoose=require("mongoose");



mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("db connected");
}).catch(()=>{
    console.log("error in database connection")
});