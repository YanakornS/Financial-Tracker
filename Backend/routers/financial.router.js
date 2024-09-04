const financialController = require("../controllers/financial.controller");
const express = require("express");
const router = express.Router();

//create a new financial
router.post("/",financialController.create);

//GetAll
router.get("/",financialController.findAll);

//GET BY UserID
router.get("/:userId", financialController.findAllByUserId);
    
// Update a Financial records
router.put('/:id', financialController.update);


// Delete a Financial records
router.delete('/:id', financialController.delete);


module.exports = router;