const express = require("express");
const holidays = require("./routes");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/", holidays);

app.listen(5002, () => {
  console.log("listening on port 5002");
});
