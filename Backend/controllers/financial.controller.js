const Financial = require("../models/financial.model");

// Create a new Financial record
exports.create = (req, res) => {
  const { userId, date, description, amount, category, paymentMethod } =
    req.body;

  const newRecord = {
    userId,
    date,
    description,
    amount,
    category,
    paymentMethod,
  };

  Financial.create(newRecord)
    .then((record) => {
      res.send(record);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while creating the financial record.",
      });
    });
};

// Get all Financial records
exports.findAll = (req, res) => {
  Financial.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while retrieving the financial records.",
      });
    });
};

// Retrieve Financial records by  Id
exports.findAllById = (req, res) => {
  const { id } = req.params;

  Financial.findAll({ where: { id } })
    .then((records) => {
      if (records.length > 0) {
        res.send(records);
      } else {
        res.status(404).send({ message: "No records found for this user." });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while retrieving the financial records by userId.",
      });
    });
};
// Retrieve Financial records by User Id
exports.findAllByUserId = (req, res) => {
  const { userId } = req.params;

  Financial.findAll({ where: { userId } })
    .then((records) => {
      if (records.length > 0) {
        res.send(records);
      } else {
        res.status(404).send({ message: "No records found for this user." });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while retrieving the financial records by userId.",
      });
    });
};
// Update Financial records
exports.update = (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  Financial.update(updates, { where: { id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated > 0) {
        res.send({ message: "Record updated successfully." });
      } else {
        res.status(404).send({ message: "No record found with the given ID." });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while updating the financial record.",
      });
    });
};

//Delete Financial records
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Financial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Financial was Delete successfully" });
      } else {
        res.send({
          message:
            "Cannot Delete Financial with id=" +
            id +
            "Maybe Financial was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Error Delete Financial with id=" + id,
      });
    });
};
