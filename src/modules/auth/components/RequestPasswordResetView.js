import React, { useState } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import styles from '../styles/Auth.module.css'
import { websiteURL } from '../../../config/config'

const RequestPasswordResetView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '' })
  const [message, setMessage] = useState(null)

  const requestReset = async (data, setSubmitting) => {
    setMessage(null)
    setFormData(data)
    setIsLoading(true)
    try {
      const res = await axios.post(
        `${websiteURL}api/auth/` + 'requestPasswordReset',
        data,
      )
    } catch (err) {}
    setMessage(
      'If you have an account, we sent an e-mail to the address associated with it. Check your email for a reset link.',
    )
    setSubmitting(false)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="sweet-loading card">
        <div className="spinner-container">
          <ClipLoader
            className="spinner"
            sizeUnit={'px'}
            size={50}
            color={'#123abc'}
            loading={isLoading}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.LoginCard}>
      <div>
        <h1 className={styles.title}>Reset Your Password</h1>
        {message && <p className={styles.ErrorMessage}>{message}</p>}

        <Formik
          initialValues={formData}
          validate={values => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            requestReset(values, setSubmitting)
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.FormFieldContainer}>
                <label className={styles.FormLabel}>E-mail</label>
                <input
                  className={styles.FormTextField}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <p className={styles.ErrorMessage}>
                  {errors.email && touched.email && errors.email}
                </p>
              </div>

              <div>
                <button
                  className={styles.PrimaryButton}
                  type="submit"
                  disabled={isSubmitting}>
                  Reset Password
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className={styles.SignupInsteadContainer}>
          <p>
            Did you remember your password? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RequestPasswordResetView
