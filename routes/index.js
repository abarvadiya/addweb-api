const express = require("express");
const { authenticate } = require("../middlewares/authenticate.middleware");

const studentRoute = require("./student");
const userRoute = require("./user");

const router = express.Router();

router.use("/user", userRoute);
router.use("/student", authenticate, studentRoute);

module.exports = router;
