const express = require("express");
const router = express.Router();
const postService = require("../services/posts.service");

// GET posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await postService.getMultiple(req.query.page);
    res.json(posts);
  } catch (err) {
    console.error(`Error while getting posts: ${err.message}`);
    next(err);
  }
});

// POST a new post
router.post("/", async (req, res, next) => {
  try {
    const result = await postService.create(req.body);
    res.json(result);
  } catch (err) {
    console.error(`Error while creating a post: ${err.message}`);
    next(err);
  }
});

// PUT (Update) a post by ID
router.put("/:id", async (req, res, next) => {
  try {
    const result = await postService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.error(`Error while updating a post: ${err.message}`);
    next(err);
  }
});

// DELETE a post by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await postService.remove(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(`Error while deleting a post: ${err.message}`);
    next(err);
  }
});

//GET tags in a post by ID
router.get("/get-tags/:id",async(req,res,next)=>{
  try{
    const result = await postService.getTagsInPost(req.params.id);
    res.json(result);
  }
  catch(err){
    console.error(`Error while getting tags: ${err.message}`);
    next(err);
  }
})

module.exports = router;
