const express=require("express");

const router=express.Router();
const {signup,login,postJob,getAllJobs,getPostsByCompany,getStudentByPost,getCompany,updateCompany}=require("../controllers/companyControllers.js");

const {isLogin,isCompany}=require("../controllers/auth.js")

router.post("/signup",signup)

router.post("/login",login)

router.get("/",isLogin,isCompany,getCompany)
router.patch("/",isLogin,isCompany,updateCompany)
router.post('/postJob',isLogin,isCompany,postJob)
router.get("/getAllJobs",isLogin,getAllJobs)
router.get("/getPostsByCompany",isLogin,isCompany,getPostsByCompany)
router.get("/getStudentByPost/:id",isLogin,isCompany,getStudentByPost)

// getStudentByPost
// getPostsByCompany
module.exports=router;