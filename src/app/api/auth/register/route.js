import { NextResponse } from 'next/server'
import { register } from '../../../../core/db/auth'

const Validator = require('validator')
const isEmpty = require('is-empty')

const validateRegisterInput = data => {
  const errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : ''
  // Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required'
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
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

export async function POST(req) {
  console.log('Registering user')
  const json = await req.json()

  const res = NextResponse

  // Form validation
  if (!json) {
    return res.json({}, { status: 500 })
  }
  const { errors, isValid } = validateRegisterInput(json)

  // Check validation
  if (!isValid) {
    return res.json(errors, { status: 400 })
  }

  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    profilePictureURL,
    role,
  } = json

  const user = await register(
    email,
    password,
    firstName,
    lastName,
    phone,
    profilePictureURL,
    role,
  )

  return res.json({ ...user }, { status: 200 })
}
