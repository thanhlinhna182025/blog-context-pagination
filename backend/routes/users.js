const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
var CryptoJS = require("crypto-js");

// UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SEC_PASSWORD
      ).toString();
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "User successfully updated",
        user: updateUser,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(500).json("You only can update your account !");
  }
});
//DELETE USER AND DELETE ALL POST OF USER

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        try {
          await User.findByIdAndDelete(req.params.id);
          await Post.deleteMany({ username: user.username });
          res
            .status(200)
            .json({ success: true, message: "User has been delete" });
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }
      }
    } catch (error) {
      res.status(500).json("User not found");
    }
  } else {
    res.status(400).json("You not allow that !");
  }
});
// GET ONE USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ success: true, user: others });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
