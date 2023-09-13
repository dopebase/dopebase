import instamobileDB from './db'

const Validator = require('validator')
const isEmpty = require('is-empty')

const validateRegisterInput = data => {
  const errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.password = !isEmpty(data.password) ? data.password : ''
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : ''

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is required'
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match'
  }
  return {
    errors,
    isValid: isEmpty(errors),
  }
}

export default async function reset(req, res) {
  console.log(req.body)

  // Form validation
  if (!req.body) {
    return res.status(500).json({})
  }
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { token, password } = req.body

  const response = await instamobileDB.resetPassword(token, password)

  console.log('Password reset for user ', response)

  console.log(response)

  res.status(200).json({ ...response })
}
