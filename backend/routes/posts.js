const router = require("express").Router();
const Post = require("../models/Post");

//CREATE
router.post("/", async (req, res) => {
  const { title, category, desc } = req.body;
  //Check required
  if (!title || !category || !desc) {
    return res
      .status(400)
      .json({ success: false, message: "Title, category, desc is required" });
  }
  //Check unique
  const post = await Post.findOne({ title });
  if (post) {
    return res
      .status(400)
      .json({ success: false, message: "Title has been aldready" });
  }

  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({ success: true, message: "Succesfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.username === req.body.username) {
        try {
          await Post.findByIdAndDelete(req.params.id);
          res
            .status(200)
            .json({ success: true, message: "Post has been delete !" });
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "You not allow that !" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Post not found" });
    }
  } catch (error) {
    res.status.json({ success: false, message: error.message });
  }
});
// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({ success: true, message: "Succesfully" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    } else {
      res.status(400).json({ success: false, message: "You not allow that !" });
    }
  } catch (error) {
    res.status.json({ success: false, message: error.message });
  }
});
//GET ALL POST
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    if (posts) {
      return res.status(200).json({ success: true, posts });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      return res.status(200).json({ success: true, post });
    }
    res.status(200).json({ success: false, message: "Post not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// GET ALL POST WHIT QUERY CATEGORY
router.get("/:category", async (req, res) => {
  const category = req.params.category;
  if (category) {
    try {
      const posts = await Post.find({ category: category });
      if (posts) {
        return res.status(200).json({ success: true, posts });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = router;
