import instamobileDB from "./db";

const jwt = require("jsonwebtoken");

const secretOrKey = process.env.JWT_SECRET;
const Validator = require("validator");
const isEmpty = require("is-empty");

const validateLoginInput = (data) => {
  const errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
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
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default async function login(req, res) {
  if (!req.body) {
    return res.status(500).json({});
  }
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;

  const result = await instamobileDB.loginWithEmailAndPassword(email, password);
  if (result.error) {
    return res.status(400).json(result.error);
  }
  const userData = result.payload;
  // Sign token
  const signPromise = new Promise((resolve) => {
    jwt.sign(
      { id: userData.id },
      secretOrKey,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (err, token) => {
        resolve(token);
      }
    );
  });
  const token = await signPromise;
  res.status(200).json({
    success: true,
    token: `Bearer ${token}`,
    userData,
    errors: null,
  });
}
