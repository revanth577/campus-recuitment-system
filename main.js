const express=require("express");
const app=express();
const cors=require("cors")
app.use(cors());
app.use(express.json());
require("./db.js");



//student routes
const studentRoutes=require("./routes/studentRoutes.js");
app.use("/api/student",studentRoutes)



//company routes
const companyRoutes=require("./routes/companyRoutes.js");
app.use("/api/company",companyRoutes)









const port=3000;

app.listen(port,()=>{
    
    console.log(`server is running at ${port}`)
})


