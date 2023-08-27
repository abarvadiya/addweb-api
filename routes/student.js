const express = require("express");
const router = express.Router({ mergeParams: true });
const createValidatorMiddleware = require("../middlewares/validator.middleware");
const {
  getStudentById,
  getStudentList,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");

const { studentSchema } = require("../utils/validationSchema");

const validateAddStudentData = createValidatorMiddleware(studentSchema);

router.get("/list", getStudentList);
router.get("/", getStudentById);
router.post("", validateAddStudentData, addStudent);
router.put("/", validateAddStudentData, updateStudent);
router.delete("/", deleteStudent);

module.exports = router;
