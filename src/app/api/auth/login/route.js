import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { loginWithEmailAndPassword } from '../../../../core/db/auth'

const jwt = require('jsonwebtoken')

const secretOrKey = process.env.JWT_SECRET
const Validator = require('validator')
const isEmpty = require('is-empty')

const validateLoginInput = data => {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
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
  return {
    errors,
    isValid: isEmpty(errors),
  }
}

export async function POST(req) {
  const res = NextResponse
  const json = await req.json()
  if (!json) {
    return res.json({}, { status: 500 })
  }

  // Form validation
  const { errors, isValid } = validateLoginInput(json)
  // Check validation
  if (!isValid) {
    return res.json(errors, { status: 400 })
  }
  const { email, password } = json

  const result = await loginWithEmailAndPassword(email, password)
  if (result.error) {
    return res.json(result.error, { status: 400 })
  }
  const userData = result.payload
  // Sign token
  const signPromise = new Promise(resolve => {
    jwt.sign(
      { id: userData.id },
      secretOrKey,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (err, token) => {
        resolve(token)
      },
    )
  })
  const token = await signPromise
  cookies().set('dopebase.session-token', token)

  return res.json(
    {
      success: true,
      token: `Bearer ${token}`,
      userData,
      errors: null,
    },
    { status: 200 },
  )
}
