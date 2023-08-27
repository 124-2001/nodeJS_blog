const express = require("express");
const router = express.Router();
const userService = require("../services/users.service");

//GET User
router.get("/",async (req,res,next)=>{
    try {
        const users = await userService.getMultipleUser(req.query.page);
        res.json(users);
    }catch (err){
        console.error(`Error while getting user: ${err.message}`);
        next(err);
    }
});

// POST a new tag
router.post("/", async (req, res, next) => {
    try {
        const result = await userService.createUser(req.body);
        res.json(result);
    } catch (err) {
        console.error(`Error while creating user: ${err.message}`);
        next(err);
    }
});

// PUT (Update) a tag by ID
router.put("/:id", async (req, res, next) => {
    try {
        const result = await userService.updateUser(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        console.error(`Error while updating  user: ${err.message}`);
        next(err);
    }
});


module.exports = router;

