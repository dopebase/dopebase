// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Formik } from 'formik'
import { ClipLoader } from 'react-spinners'
import { IMPhoto } from '../../components/forms/fields'
import styles from '../../themes/admin.module.css'
import { authFetch, authPost } from '../../../modules/auth/utils/authFetch'
import { websiteURL } from '../../../config/config'
import useCurrentUser from '../../../modules/auth/hooks/useCurrentUser'
const baseAPIURL = `${websiteURL}api/`

const UpdateUserView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)
  const [modifiedNonFormData, setModifiedNonFormData] = useState({})

  const [user] = useCurrentUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch(
          baseAPIURL + 'users/view?id=' + user?.id,
        )
        if (response?.data) {
          setOriginalData({
            ...response.data,
            password: '',
            confirmPassword: '',
          })

          initializeModifieableNonFormData(response.data)
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    if (user?.id) {
      fetchData()
    }
  }, [user?.id])

  const initializeModifieableNonFormData = originalData => {
    var nonFormData = {}

    if (originalData.profilePictureURL) {
      nonFormData['profilePictureURL'] = originalData.profilePictureURL
    }

    console.log(nonFormData)
    setModifiedNonFormData(nonFormData)
  }

  const saveChanges = async (modifiedData, setSubmitting) => {
    const response = await authPost(
      baseAPIURL + 'users/update?id=' + user?.id,
      JSON.stringify({
        ...modifiedData,
        ...modifiedNonFormData,
      }),
    )
    const { data } = response
    if (data.success == true) {
      window.location.reload()
    } else {
      alert(data.error)
    }
    setSubmitting(false)
  }

  const handleImageUpload = (event, fieldName, isMultiple) => {
    const files = event.target.files
    const formData = new FormData()
    for (var i = 0; i < files.length; ++i) {
      formData.append('photos', files[i])
    }
    fetch(baseAPIURL + 'media/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(response => {
        var newData = { ...modifiedNonFormData }
        if (!isMultiple) {
          const url = response.data && response.data[0] && response.data[0].url
          newData[fieldName] = url
        } else {
          // multiple photos
          const urls = response.data && response.data.map(item => item.url)
          if (
            !modifiedNonFormData[fieldName] ||
            modifiedNonFormData[fieldName].length <= 0
          ) {
            newData[fieldName] = urls
          } else {
            newData[fieldName] = [...modifiedNonFormData[fieldName], ...urls]
          }
        }
        setModifiedNonFormData(newData)
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleDeletePhoto = (srcToBeRemoved, fieldName, isMultiple) => {
    if (isMultiple) {
      var newData = { ...modifiedNonFormData }
      var currentURLs = newData[fieldName]
      if (currentURLs) {
        const newURLs = currentURLs.filter(src => src != srcToBeRemoved)
        newData[fieldName] = newURLs
        setModifiedNonFormData(newData)
      }
    } else {
      var newData = { ...modifiedNonFormData }
      newData[fieldName] = null
      setModifiedNonFormData(newData)
    }
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
    <div className={`${styles.Card} ${styles.FormCard} Card FormCard`}>
      <div className={`${styles.CardBody} CardBody`}>
        <h1>Edit Profile</h1>
        <Formik
          initialValues={originalData}
          validate={values => {
            values = { ...values, ...modifiedNonFormData }
            const errors = {}
            {
              /* Insert all form errors here */

              if (!values.email) {
                errors.email = 'Email Required'
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address'
              }
              if (
                values.password?.length > 6 &&
                values.confirmPassword !== values.password
              ) {
                errors.confirmPassword = "Passwords didn't match."
              }

              if (values.password?.length > 0 && values.password?.length < 6) {
                errors.password =
                  'Password is too short. Please use at least six characters.'
              }
            }

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            saveChanges(values, setSubmitting)
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
              {/* Insert all edit form fields here */}
              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Email</label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.email && touched.email && errors.email}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  First Name
                </label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="firstName"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.firstName && touched.firstName && errors.firstName}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Last Name
                </label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="lastName"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.lastName && touched.lastName && errors.lastName}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Phone</label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="phone"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.phone && touched.phone && errors.phone}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Profile Picture
                </label>
                {modifiedNonFormData.profilePictureURL && (
                  <IMPhoto
                    openable
                    dismissable
                    className="photo"
                    src={modifiedNonFormData.profilePictureURL}
                    onDelete={src =>
                      handleDeletePhoto(src, 'profilePictureURL', false)
                    }
                  />
                )}
                <input
                  className="FormFileField"
                  id="profilePictureURL"
                  name="profilePictureURL"
                  type="file"
                  onChange={event => {
                    handleImageUpload(event, 'profilePictureURL', false)
                  }}
                />
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Password
                </label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.password && touched.password && errors.password}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Confirm Password
                </label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </p>
              </div>

              <div
                className={`${styles.FormActionContainer} FormActionContainer`}>
                <button
                  className={`${styles.PrimaryButton} PrimaryButton`}
                  type="submit"
                  disabled={isSubmitting}>
                  Update account
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UpdateUserView
