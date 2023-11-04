import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Formik } from 'formik'
import { ClipLoader } from 'react-spinners'

import { resetPassword } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../styles/Auth.module.css'

const ResetPasswordView = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    token: '',
  })
  const dispatch = useDispatch()
  const errors = useSelector(state => state.auth.errors)
  const auth = useSelector(state => state.auth)

  const router = useRouter()

  const reset = async (data, setSubmitting) => {
    // console.log(JSON.stringify(data));
    setFormData(data)
    setIsLoading(true)
    const resetData = token ? { ...data, token: token ?? '' } : data

    dispatch(resetPassword(resetData, router, dispatch))
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
        <h1 className={styles.title}>Reset Password</h1>
        {errors?.token?.length > 0 && (
          <p className={styles.ErrorMessage}>{errors.token}</p>
        )}
        <Formik
          initialValues={formData}
          validate={values => {
            const errors = {}
            if (!values.password) {
              errors.password = 'Required'
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = 'Required'
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = "Passwords didn't match!"
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            reset(values, setSubmitting)
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
                <label className={styles.FormLabel}>Password</label>
                <input
                  className={styles.FormTextField}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <p className={styles.ErrorMessage}>
                  {errors.password && touched.password && errors.password}
                  {auth && auth.errors && auth.errors.password}
                </p>
              </div>

              <div className={styles.FormFieldContainer}>
                <label className={styles.FormLabel}>Confirm Password</label>
                <input
                  className={styles.FormTextField}
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <p className={styles.ErrorMessage}>
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                  {auth && auth.errors && auth.errors.confirmPassword}
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
          Don't want to reset password? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordView
