const express = require("express");
const { getHolidays } = require("./controller");

const router = express.Router();
router.get("/holidays/:begin/:end", getHolidays);

module.exports = router;
