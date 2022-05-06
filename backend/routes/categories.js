const router = require("express").Router();
const Category = require("../models/Category");

//CREATE

router.post("/", async (req, res) => {
  const { name } = req.body;
  //Check required
  if (!name) {
    res.status(400).json("name is required");
  }
  //Check unique
  try {
    const cat = await Category.findOne({ name: name });
    if (cat) {
      return res.status(400).json("Name is invalid");
    }
    //all good
    const newCat = new Category({ name });
    await newCat.save();
    res.status(201).json(newCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL CATEGORY
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json({ success: true, cats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
