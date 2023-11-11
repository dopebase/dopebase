// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Formik } from 'formik'
import { ClipLoader } from 'react-spinners'
import IMDatePicker from '../../components/forms/IMDatePicker'
import styles from '../../themes/admin.module.css'

/* Insert extra imports here */

import { authFetch, authPost } from '../../../modules/auth/utils/authFetch'
import { websiteURL } from '../../../config/config'

const UpdateSettingsView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)
  const [modifiedNonFormData, setModifiedNonFormData] = useState({})

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch(
          websiteURL + 'api/system/settings/view?id=' + id,
        )
        if (response?.data) {
          setOriginalData(response.data)
          initializeModifieableNonFormData(response.data)
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  const initializeModifieableNonFormData = originalData => {
    var nonFormData = {}

    /* Insert non modifiable initialization data here */
    if (originalData.created_at) {
      nonFormData['created_at'] = originalData.created_at
    }

    if (originalData.updated_at) {
      nonFormData['updated_at'] = originalData.updated_at
    }

    setModifiedNonFormData(nonFormData)
  }

  const saveChanges = async (modifiedData, setSubmitting) => {
    const response = await authPost(
      websiteURL + 'api/system/settings/update?id=' + id,
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
    <div className={`${styles.Card} ${styles.FormCard} Card FormCard`}>
      <div className={`${styles.CardBody} CardBody`}>
        <h1>{originalData && originalData.name}</h1>
        <Formik
          initialValues={originalData}
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
                  Save settings
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UpdateSettingsView
