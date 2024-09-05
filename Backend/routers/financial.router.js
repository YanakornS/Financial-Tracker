const financialController = require("../controllers/financial.controller");
const express = require("express");
const router = express.Router();

//create a new financial
router.post("/", financialController.create);

//GetAll
router.get("/", financialController.findAll);

//GET BY User ID
router.get("/user/:userId", financialController.findAllByUserId);

//GET BY ID
router.get("/:id", financialController.findAllById);

// Update a Financial records
router.put("/:id", financialController.update);

// Delete a Financial records
router.delete("/:id", financialController.delete);

module.exports = router;
