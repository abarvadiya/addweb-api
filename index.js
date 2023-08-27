const express = require("express");
const routes = require("./routes");
const db = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
db.connect();
app.use(express.json());

app.use(cors());
app.options("/*", cors());

// Routes
app.use("/api/v1", routes);

app.use((req, res) => {
  return res.status(404).json({
    status: 404,
    error: "Not Found",
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
