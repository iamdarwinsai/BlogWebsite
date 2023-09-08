const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const { checkForCookie } = require("./middlewares/auth");
const app = express();
const PORT = 2000; // Use process.env.PORT for production deployment

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/blognow")
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware to parse form data
app.use(cookieParser());
app.use(checkForCookie('token'))
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get("/", (req, res) => {
  res.render("home",{
    user:req.user
  });
});
app.use("/user", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at Port: ${PORT}`);
});
