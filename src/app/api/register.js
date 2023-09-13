import instamobileDB from "./db";

const Validator = require("validator");
const isEmpty = require("is-empty");

const validateRegisterInput = (data) => {
  const errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";
  // Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default async function register(req, res) {
  console.log(req.body);

  // Form validation
  if (!req.body) {
    return res.status(500).json({});
  }
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    profilePictureURL,
    role,
  } = req.body;

  const user = await instamobileDB.register(
    email,
    password,
    firstName,
    lastName,
    phone,
    profilePictureURL,
    role
  );

  res.status(200).json({ ...user });
}
