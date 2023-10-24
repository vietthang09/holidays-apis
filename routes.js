const express = require("express");
const { getHolidays } = require("./controller");

const router = express.Router();
router.get("/holidays/:year", getHolidays);

module.exports = router;
