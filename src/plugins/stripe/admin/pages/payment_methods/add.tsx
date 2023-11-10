// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { ClipLoader } from 'react-spinners'
import Editor from 'rich-markdown-editor'
import dynamic from 'next/dynamic'
const CodeMirror = dynamic(
  () => {
    import('codemirror')
    // import('codemirror/mode/javascript/javascript')
    // import('codemirror/mode/css/css')
    // import('codemirror/mode/htmlmixed/htmlmixed')
    // import('codemirror/mode/markdown/markdown')
    return import('react-codemirror2').then(mod => mod.Controlled)
  },
  { ssr: false },
)
import IMDatePicker from '../../../../../admin/components/forms/IMDatePicker'
import { LocationPicker } from '../../../../../admin/components/forms/locationPicker'
import {
  TypeaheadComponent,
  IMObjectInputComponent,
  IMMultimediaComponent,
  IMArrayInputComponent,
  IMColorPicker,
  IMColorsContainer,
  IMColorBoxComponent,
  IMStaticMultiSelectComponent,
  IMStaticSelectComponent,
  IMPhoto,
  IMModal,
  IMToggleSwitchComponent,
} from '../../../../../admin/components/forms/fields'
import styles from '../../../../../admin/themes/admin.module.css'

/* Insert extra imports here */
import PaymentMethodUserTypeaheadComponent from '../../components/PaymentMethodUserTypeaheadComponent.js'


import { pluginsAPIURL } from '../../../../../config/config'
import { authPost } from '../../../../../modules/auth/utils/authFetch'

const beautify_html = require('js-beautify').html
const baseAPIURL = `${pluginsAPIURL}`

const AddNewPaymentMethodView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [modifiedNonFormData, setModifiedNonFormData] = useState({})
  const [originalData, setOriginalData] = useState(null)

  useEffect(() => {
    setModifiedNonFormData({
      created_at: Math.floor(new Date().getTime() / 1000).toString(),
    })
  }, [])

  const createPaymentMethod = async (data, setSubmitting) => {
    setIsLoading(true)
    const url = `${baseAPIURL}admin/stripe/payment_methods/add`
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

  const onTypeaheadSelect = (value, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName] = value
    setModifiedNonFormData(newData)
  }

  const onMultipleTypeaheadSelect = (value, fieldName) => {
    var newData = { ...modifiedNonFormData }
    if (newData[fieldName] != undefined) {
      newData[fieldName].push(value)
    } else {
      newData[fieldName] = [value]
    }
    setModifiedNonFormData(newData)
  }

  const onMultipleTypeaheadDelete = (index, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName].splice(index, 1)
    setModifiedNonFormData(newData)
  }

  const handleSwitchChange = (value, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName] = value ^ true
    setModifiedNonFormData(newData)
  }

  const handleSelectChange = (value, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName] = value
    setModifiedNonFormData(newData)
  }

  const handleColorChange = (value, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName] = value
    setModifiedNonFormData(newData)
  }

  const handleColorDelete = fieldName => {
    var newData = { ...modifiedNonFormData }
    delete newData[fieldName]
    setModifiedNonFormData(newData)
  }

  const handleColorsChange = (value, fieldName) => {
    var newData = { ...modifiedNonFormData }
    if (newData[fieldName] != undefined) {
      newData[fieldName].push(value)
    } else {
      newData[fieldName] = [value]
    }
    setModifiedNonFormData(newData)
  }

  const handleColorsDelete = (index, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName].splice(index, 1)
    setModifiedNonFormData(newData)
  }

  const handleArrayInput = (value, fieldName) => {
    var newData = { ...modifiedNonFormData }
    if (newData[fieldName] != undefined) {
      newData[fieldName].push(value)
    } else {
      newData[fieldName] = [value]
    }
    setModifiedNonFormData(newData)
  }

  const handleArrayDelete = (index, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName].splice(index, 1)
    setModifiedNonFormData(newData)
  }

  const handleObjectInput = (key, value, fieldName) => {
    var newData = { ...modifiedNonFormData }
    if (newData[fieldName] != undefined) {
      newData[fieldName][key] = value
    } else {
      newData[fieldName] = { [key]: value }
    }
    setModifiedNonFormData(newData)
  }

  const handleObjectDelete = (key, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName] = Object.keys(newData[fieldName]).reduce(
      (object, keys) => {
        if (keys !== key) {
          object[keys] = newData[fieldName][keys]
        }
        return object
      },
      {},
    )
    setModifiedNonFormData(newData)
  }

  const onDateChange = (toDate, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName] = toDate
    setModifiedNonFormData(newData)
  }

  const onLocationChange = (addressObject, fieldName) => {
    var newData = { ...modifiedNonFormData }
    if (!addressObject || !addressObject.location || !addressObject.gmaps) {
      return
    }
    const location = {
      longitude: addressObject.location.lng,
      latitude: addressObject.location.lat,
      address: addressObject.label,
      placeID: addressObject.placeId,
      detailedAddress: addressObject.gmaps.address_components,
    }
    newData[fieldName] = location
    setModifiedNonFormData(newData)
  }

  const onSimpleLocationChange = (addressObject, fieldName) => {
    var newData = { ...modifiedNonFormData }
    if (!addressObject || !addressObject.location) {
      return
    }
    const location = {
      lng: addressObject.location.lng,
      lat: addressObject.location.lat,
      // address: addressObject.label,
    }
    newData[fieldName] = location
    setModifiedNonFormData(newData)
  }

  const onCodeChange = (value, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName] = value
    setModifiedNonFormData(newData)
  }

  const onMarkdownEditorChange = (value, fieldName) => {
    var newData = { ...modifiedNonFormData }
    newData[fieldName] = value
    setModifiedNonFormData(newData)
  }

  const handleImageUpload = (event, fieldName, isMultiple) => {
    const files = event.target.files
    const formData = new FormData()
    for (var i = 0; i < files.length; ++i) {
      formData.append('photos', files[i])
    }

    fetch(pluginsAPIURL + '../media/upload', {
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

  const handleMultimediaUpload = (event, fieldName, isMultiple) => {
    const files = event.target.files
    const formData = new FormData()
    for (var i = 0; i < files.length; ++i) {
      formData.append('multimedias', files[i])
    }
    fetch(pluginsAPIURL + '../media/uploadMultimedias', {
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
          // multiple media
          const data =
            response.data &&
            response.data.map(item => {
              return { url: item.url, mime: item.mimetype }
            })
          if (
            !modifiedNonFormData[fieldName] ||
            modifiedNonFormData[fieldName].length <= 0
          ) {
            newData[fieldName] = data
          } else {
            newData[fieldName] = [...modifiedNonFormData[fieldName], ...data]
          }
        }
        setModifiedNonFormData(newData)
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleMultimediaDelete = (srcToBeRemoved, fieldName, isMultiple) => {
    if (isMultiple) {
      var newData = { ...modifiedNonFormData }
      var currentData = newData[fieldName]
      if (currentData) {
        const finalData = currentData.reduce((arrayAcumulator, curVal) => {
          if (srcToBeRemoved !== curVal.url) {
            arrayAcumulator.push(curVal)
          }
          return arrayAcumulator
        })
        newData[fieldName] = finalData
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
    <div className={`${styles.FormCard} FormCard`}>
      <div className={`${styles.CardBody} CardBody`}>
        <h1>Create New PaymentMethod</h1>
        <Formik
          initialValues={{}}
          validate={values => {
            values = { ...values, ...modifiedNonFormData }
            const errors = {}
            {
              /* Insert all form errors here */
        if (!values.provider) {
            errors.provider = 'Field Required!'
        }

        if (!values.details) {
            errors.details = 'Field Required!'
        }

            }

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            createPaymentMethod(values, setSubmitting)
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
                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>ID</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="id"
                            name="id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.id}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.id && touched.id && errors.id}
                        </p>
                    </div>
    

              <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                  <label className={`${styles.FormLabel} FormLabel`}>Provider</label>
                  <IMStaticSelectComponent
                      options={["Stripe","PayPal","Other"]}
                      name="provider"
                      onChange={handleSelectChange}
                  />
                  <p className={`${styles.ErrorMessage} ErrorMessage`}>
                      {errors.provider && touched.provider && errors.provider}
                  </p>
              </div>
          

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Details</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="details"
                            name="details"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.details}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.details && touched.details && errors.details}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Is Default</label>
                        <IMToggleSwitchComponent isChecked={modifiedNonFormData.is_default} onSwitchChange={() => handleSwitchChange(modifiedNonFormData["is_default"], "is_default")} />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.is_default && touched.is_default && errors.is_default}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Stripe Customer ID</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="stripeCustomerID"
                            name="stripeCustomerID"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.stripeCustomerID}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.stripeCustomerID && touched.stripeCustomerID && errors.stripeCustomerID}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Brand</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="brand"
                            name="brand"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.brand}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.brand && touched.brand && errors.brand}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Last 4</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="last4"
                            name="last4"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last4}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.last4 && touched.last4 && errors.last4}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Expiry Month</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="expiryMonth"
                            name="expiryMonth"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.expiryMonth}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.expiryMonth && touched.expiryMonth && errors.expiryMonth}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Expiry Year 4</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="expiryYear"
                            name="expiryYear"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.expiryYear}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.expiryYear && touched.expiryYear && errors.expiryYear}
                        </p>
                    </div>
    

          <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
              <label className={`${styles.FormLabel} FormLabel`}>User</label>
              <PaymentMethodUserTypeaheadComponent onSelect={(value) => onTypeaheadSelect(value, "userID")} id={originalData && originalData.userID} name={originalData && originalData.userID} />
          </div>
      


              <div
                className={`${styles.FormActionContainer} FormActionContainer`}>
                <button
                  className={`${styles.PrimaryButton} PrimaryButton`}
                  type="submit"
                  disabled={isSubmitting}>
                  Create payment_method
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddNewPaymentMethodView
