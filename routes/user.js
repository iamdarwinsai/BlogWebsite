const {Router}=require("express");
const User = require("../models/user");

const router=Router();

router.get("/signup",(req,res)=>{
    return res.render("signup");
})


router.post("/signup",async (req,res)=>{

    const {fullName,email,password}=req.body
   await User.create({
    fullName,
    email,
    password
   })
   console.log(req.body);
   return res.redirect("/")
})


router.get("/signin",(req,res)=>{
   return res.render("signin")
})

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const token = await User.matchPasswordGenerateToken(email,password);
    console.log("token",token);
    if(token){
      return res.cookie('token',token).redirect("/");
    }else{
      throw new Error("Invalid login");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).render("signin", { error: "Invalid credentials" });
  }
});

module.exports=router