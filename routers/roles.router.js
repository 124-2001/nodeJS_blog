const express = require("express");
const router = express.Router();
const roleService = require("../services/roles.service");

// GET all roles
router.get("/", async (req, res, next) => {
  try {
    const roles = await roleService.getMultipleRoles(req.query.page);
    res.json(roles);
  } catch (err) {
    console.error(`Error while getting roles: ${err.message}`);
    next(err);
  }
});

// POST a new role
router.post("/", async (req, res, next) => {
  try {
    const result = await roleService.createRole(req.body);
    res.json(result);
  } catch (err) {
    console.error(`Error while creating a role: ${err.message}`);
    next(err);
  }
});

// PUT (Update) a role by ID
router.put("/:id", async (req, res, next) => {
  try {
    const result = await roleService.updateRole(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.error(`Error while updating a role: ${err.message}`);
    next(err);
  }
});

// DELETE a role by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await roleService.removeRole(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(`Error while deleting a role: ${err.message}`);
    next(err);
  }
});

module.exports = router;
