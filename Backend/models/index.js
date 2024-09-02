const sequeliza = require("./db");
const Sequeliza = require("sequeliza");
const Financial = require("./financial.model")

const db ={};
db.Sequeliza = Sequeliza;
db.sequeliza = sequeliza;
db.Financial = Financial;

module.exports = db