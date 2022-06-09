const express = require("express");
const { addTicket } = require("../controllers/tickets");

const router = express.Router();

router.post("/", addTicket);

module.exports = router;

// router.post("/", createTicket);
