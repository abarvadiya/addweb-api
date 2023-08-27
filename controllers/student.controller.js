const {
  addStudent,
  getStudentList,
  getStudentDetails,
  updateStudentByID,
  deleteStudentByID,
} = require("../services/student.service");
const { errorHandler } = require("../utils");

exports.addStudent = async (req, res) => {
  try {
    await addStudent(req.userId, req.body);

    return res.status(201).send({
      status: 201,
      message: "Registration successfully",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Internal server error",
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      throw errorHandler("Student id required", 400);
    }

    const result = await getStudentDetails(id);
    return res.status(201).send({
      status: 200,
      data: result,
      message: "Student details retrieved",
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      status: err.status,
      message: err.message || "Internal server error",
    });
  }
};

exports.getStudentList = async (req, res) => {
  try {
    const { pageNumber } = req.query;
    if (!pageNumber) {
      throw errorHandler("Page number id required", 400);
    }

    const result = await getStudentList(req.userId, pageNumber);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Student list retrieved",
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      status: err.status,
      message: err.message || "Internal server error",
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      throw errorHandler("Student id required", 400);
    }

    const result = await updateStudentByID(id, req.body);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Student updated successfully",
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      status: err.status,
      message: err.message || "Internal server error",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      throw errorHandler("Student id required", 400);
    }

    await deleteStudentByID(id);
    return res.status(200).send({
      status: 200,
      message: "Student deleted successfully",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Internal server error",
    });
  }
};
