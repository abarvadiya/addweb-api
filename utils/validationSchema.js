const joi = require("joi");

exports.signInSchema = joi.object({
  userNameOrEmail: joi.string().required(),
  password: joi.string().required().min(6),
});

exports.signUpSchema = joi.object({
  fullName: joi.string().required(),
  profilePic: joi.string(),
  userName: joi.string().required(),
  email: joi.string().required().email(),
  mobileNo: joi
    .string()
    .length(10)
    .regex(/^\d+$/)
    .message("${label} must be exactly 10 digits"),
  password: joi.string().required().min(6),
});

exports.studentSchema = joi.object({
  firstName: joi.string().required(),
  middleName: joi.string().required(),
  lastName: joi.string().required(),
  photos: joi.array().items(joi.string()),
  email: joi.string().email().required(),
  address: joi.string(),
  mobileNo: joi
    .string()
    .length(10)
    .message("Mobile Number must be exactly 10 digits")
    .regex(/^\d+$/)
    .message("Only number allowed"),
  gender: joi.string().valid("male", "female", "other").required(),
  dob: joi.string().required(),
  country: joi.string(),
});
