// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { ClipLoader } from 'react-spinners'
import IMDatePicker from '../../components/forms/IMDatePicker'
import styles from '../../themes/admin.module.css'

import { authPost } from '../../../modules/auth/utils/authFetch'
import { websiteURL } from '../../../config/config'

const AddNewSettingsView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [modifiedNonFormData, setModifiedNonFormData] = useState({})
  const [originalData, setOriginalData] = useState(null)

  useEffect(() => {
    setModifiedNonFormData({
      created_at: Math.floor(new Date().getTime() / 1000).toString(),
    })
  }, [])

  const createSettings = async (data, setSubmitting) => {
    setIsLoading(true)
    const url = `${websiteURL}api/system/settings/add`
    const response = await authPost(
      url,
      JSON.stringify({ ...data, ...modifiedNonFormData }),
    )
    const resData = response.data
    if (resData?.error) {
      alert(resData?.error)
    }
    setSubmitting(false)
    setIsLoading(false)
  }

  const onDateChange = (toDate, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName] = toDate
    setModifiedNonFormData(newData)
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
    <div className={`${styles.FormCard} FormCard`}>
      <div className={`${styles.CardBody} CardBody`}>
        <h1>Create New Settings</h1>
        <Formik
          initialValues={{}}
          validate={values => {
            values = { ...values, ...modifiedNonFormData }
            const errors = {}
            {
              /* Insert all form errors here */
              if (!values.name) {
                errors.name = 'Field Required!'
              }

              if (!values.created_at) {
                errors.created_at = 'Field Required!'
              }

              if (!values.updated_at) {
                errors.updated_at = 'Field Required!'
              }
            }

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            createSettings(values, setSubmitting)
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
              {/* Insert all add form fields here */}
              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Settings Name
                </label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.name && touched.name && errors.name}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Settings Value
                </label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="value"
                  name="value"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.value}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.value && touched.value && errors.value}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Created Date
                </label>
                <IMDatePicker
                  selected={modifiedNonFormData.created_at}
                  onChange={toDate => onDateChange(toDate, 'created_at')}
                />
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Updated Date
                </label>
                <IMDatePicker
                  selected={modifiedNonFormData.updated_at}
                  onChange={toDate => onDateChange(toDate, 'updated_at')}
                />
              </div>

              <div
                className={`${styles.FormActionContainer} FormActionContainer`}>
                <button
                  className={`${styles.PrimaryButton} PrimaryButton`}
                  type="submit"
                  disabled={isSubmitting}>
                  Create settings
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddNewSettingsView
