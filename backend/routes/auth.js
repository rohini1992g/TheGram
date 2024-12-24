const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//Register
router.post("/register", async (req, res) => {
  try {
    //generate bcrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newuser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword,
    });

    //save user and respond
    const user = await newuser.save();

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//Login page
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("Invalid credentials");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Invalid credentials");
    }

    const { password, updatedAt, ...other } = user._doc;
    const token = jwt.sign({ username: user.username }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 36000000 });
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json("An error occurred");
  }
});

//Forgot Password

router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("user not found");
    }

    const encodedtoken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rohini.gondane123@gmail.com",
        pass: "cajp xxgc iqxk lomw",
      },
    });

    var mailOptions = {
      from: "rohini.gondane123@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:3000/resetPassword/${encodedtoken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(400).json("Error Sending Mail");
      } else {
        res.status(200).json({ status: true, message: "Email sent" });
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Reset Password

router.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const id = decoded.id;
    console.log("id is" + id);
    const hashpassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashpassword });
    return res.status(200).json("password updated successfully");
  } catch (err) {
    res.status(500).json("Invalid Token");
  }
});

const verifyUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_TOKEN);
  } catch (err) {
    return res.status(500).json(err);
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.status(200).json("Autherised");
});

//logout the page
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json("");
});

module.exports = router;
