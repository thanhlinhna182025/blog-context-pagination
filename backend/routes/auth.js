const router = require("express").Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  //Check required
  if (!username || !email || !password) {
    return res.status(401).json({
      success: false,
      message: "Username , email , password is required",
    });
  }
  try {
    //Check username unique
    let user = await User.findOne({ username: username });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "Username has been aldready",
      });
    }
    user = await User.findOne({ email: email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "Email has been aldready",
      });
    }

    //All good
    const hashPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SEC_PASSWORD
    ).toString();
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Register successfull",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credential" });
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SEC_PASSWORD
    );
    const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originPassword !== req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credential" });
    }

    const { password, ...others } = user._doc;
    res
      .status(200)
      .json({ success: true, message: "Login Success", user: others });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
