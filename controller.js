const db = require("./db");

const getHolidays = async (req, res) => {
  const { year } = req.params;

  const selectStament = `SELECT * FROM holidays WHERE holidayDate >= "${year}-01-01" AND holidayDate <= "${year}-12-31" ORDER BY holidayDate ASC`;
  db.query(selectStament, (err, results) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (results.length > 0) {
      return res.status(200).json({ results: results });
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  });
};

module.exports = { getHolidays };
