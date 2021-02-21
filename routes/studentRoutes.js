const express=require("express");

const router=express.Router();

const {login,register,getStudent,addProject,allProjects,updateStudent,applyForJob,allStudents,getStudentId}=require("../controllers/studentController.js");
const {isLogin,isStudent}=require("../controllers/auth.js")
router.post('/login',login)

router.post("/register",register)

router.get("/all",isLogin,allStudents)
router.get("/",isLogin,isStudent,getStudent)
router.get("/:id",isLogin,getStudentId)

router.post("/:id/addProject",isLogin,isStudent,addProject)
router.get("/:id/allProjects",isLogin,allProjects)
router.patch("/:id",isLogin,isStudent,updateStudent)

router.patch("/applyForJob/:id",isLogin,isStudent,applyForJob)
module.exports=router;