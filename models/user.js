const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { generateToken } = require("../authentication/auth");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    salt:{
      type:String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: 
      {
        type: String,
        enum: ["user", "admin"], // Define the possible roles here
        default: "user", // Set a default role if needed
      }
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next(); 

  const salt = randomBytes(10).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt=salt;
  user.password=hashedPassword
  next();
});

userSchema.static('matchPasswordGenerateToken',async function(email,password){
  const user=await this.findOne({email});
  console.log(user);
  if(!user) return false;
  const providedPassword = createHmac("sha256", user.salt)
  .update(password)
  .digest("hex");
  
  if(user.password===providedPassword){
    const token=generateToken(user);
    return token
  }

  return token==null;
})

const User = mongoose.model("User", userSchema);


module.exports = User;
