const Student = require("../models/student.model");
const { errorHandler } = require("../utils");

exports.addStudent = async (createdBy, studentDetails) => {
  try {
    const newUser = new Student({ ...studentDetails, createdBy });
    await newUser.save();
  } catch (error) {
    throw error;
  }
};

exports.getStudentDetails = async id => {
  try {
    const student = await Student.findOne({ _id: id });

    if (!student) {
      throw errorHandler("Student not found", 404);
    }

    return student;
  } catch (error) {
    throw error;
  }
};

exports.getStudentList = async (createdBy, pageNumber) => {
  const skipData = (pageNumber - 1) * 12;

  try {
    const students = await Student.find({ createdBy })
      .skip(skipData)
      .limit(12)
      .exec();
    return students;
  } catch (error) {
    throw error;
  }
};

exports.updateStudentByID = async (id, updateData) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();

    return updatedStudent;
  } catch (error) {
    throw error;
  }
};

exports.deleteStudentByID = async id => {
  try {
    await Student.deleteOne({ _id: id });
    return {};
  } catch (error) {
    throw error;
  }
};
