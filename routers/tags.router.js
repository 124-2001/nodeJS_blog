const express = require("express");
const router = express.Router();
const tagService = require("../services/tags.service");

// GET all tags
router.get("/", async (req, res, next) => {
  try {
    const tags = await tagService.getMultipleTags(req.query.page);
    res.json(tags);
  } catch (err) {
    console.error(`Error while getting tags: ${err.message}`);
    next(err);
  }
});

// POST a new tag
router.post("/", async (req, res, next) => {
  try {
    const result = await tagService.createTag(req.body);
    res.json(result);
  } catch (err) {
    console.error(`Error while creating a tag: ${err.message}`);
    next(err);
  }
});

// PUT (Update) a tag by ID
router.put("/:id", async (req, res, next) => {
  try {
    const result = await tagService.updateTag(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.error(`Error while updating a tag: ${err.message}`);
    next(err);
  }
});

// DELETE a tag by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await tagService.removeTag(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(`Error while deleting a tag: ${err.message}`);
    next(err);
  }
});

//GET posts in a tag by ID
router.get("/get-posts/:id",async(req,res,next)=>{
  try{
    const result = await tagService.getPostsInTag(req.params.id);
    res.json(result);
  }
  catch(err){
    console.error(`Error while getting posts: ${err.message}`);
    next(err);
  }
});

module.exports = router;
