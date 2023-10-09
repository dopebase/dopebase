// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Formik } from 'formik'
import { ClipLoader } from 'react-spinners'
import IMDatePicker from '../../../../../admin/components/forms/IMDatePicker'
import { LocationPicker } from '../../../../../admin/components/forms/locationPicker'
import {
  TypeaheadComponent,
  IMColorPicker,
  IMMultimediaComponent,
  IMObjectInputComponent,
  IMArrayInputComponent,
  IMColorsContainer,
  IMColorBoxComponent,
  IMStaticMultiSelectComponent,
  IMStaticSelectComponent,
  IMPhoto,
  IMModal,
  IMToggleSwitchComponent,
} from '../../../../../admin/components/forms/fields'
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
import styles from '../../../../../admin/themes/admin.module.css'

/* Insert extra imports here */
import DriverInProgressTripTypeaheadComponent from '../../components/DriverInProgressTripTypeaheadComponent.js'

const beautify_html = require('js-beautify').html
import { pluginsAPIURL } from '../../../../../config/config'
import {
  authFetch,
  authPost,
} from '../../../../../modules/auth/utils/authFetch'
const baseAPIURL = `${pluginsAPIURL}admin/taxi/`

const UpdateUserView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)
  const [modifiedNonFormData, setModifiedNonFormData] = useState({})

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch(baseAPIURL + 'users/view?id=' + id)
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
    if (originalData.role) {
      nonFormData['role'] = originalData.role
    }

    if (originalData.carPictureURL) {
      nonFormData['carPictureURL'] = originalData.carPictureURL
    }

    if (originalData.banned) {
      nonFormData['banned'] = originalData.banned
    }

    if (originalData.createdAt) {
      nonFormData['createdAt'] = originalData.createdAt
    }

    if (originalData.updatedAt) {
      nonFormData['updatedAt'] = originalData.updatedAt
    }

    console.log(nonFormData)
    setModifiedNonFormData(nonFormData)
  }

  const saveChanges = async (modifiedData, setSubmitting) => {
    const response = await authPost(
      baseAPIURL + 'users/update?id=' + id,
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
    newData[fieldName] = null
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
              if (!values.email) {
                errors.email = 'Field Required!'
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
                <label className={`${styles.FormLabel} FormLabel`}>Role</label>
                <IMStaticSelectComponent
                  options={['passenger', 'driver', 'admin', 'other']}
                  name="role"
                  onChange={handleSelectChange}
                  selectedOption={modifiedNonFormData.role}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.role && touched.role && errors.role}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Car Photo
                </label>
                {modifiedNonFormData.carPictureURL && (
                  <IMPhoto
                    openable
                    dismissable
                    className="photo"
                    src={modifiedNonFormData.carPictureURL}
                    onDelete={src =>
                      handleDeletePhoto(src, 'carPictureURL', false)
                    }
                  />
                )}
                <input
                  className="FormFileField"
                  id="carPictureURL"
                  name="carPictureURL"
                  type="file"
                  onChange={event => {
                    handleImageUpload(event, 'carPictureURL', false)
                  }}
                />
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Car Model
                </label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="carName"
                  name="carName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.carName}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.carName && touched.carName && errors.carName}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  License Plate
                </label>
                <input
                  className={`${styles.FormTextField} FormTextField`}
                  type="carNumber"
                  name="carNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.carNumber}
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.carNumber && touched.carNumber && errors.carNumber}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  In Progress Order ID
                </label>
                <DriverInProgressTripTypeaheadComponent
                  onSelect={value =>
                    onTypeaheadSelect(value, 'inProgressOrderID')
                  }
                  id={originalData && originalData.inProgressOrderID}
                  name={originalData && originalData.inProgressOrderID}
                />
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Banned
                </label>
                <IMToggleSwitchComponent
                  isChecked={modifiedNonFormData.banned}
                  onSwitchChange={() =>
                    handleSwitchChange(modifiedNonFormData['banned'], 'banned')
                  }
                />
                <p className={`${styles.ErrorMessage} ErrorMessage`}>
                  {errors.banned && touched.banned && errors.banned}
                </p>
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Created At
                </label>
                <IMDatePicker
                  selected={modifiedNonFormData.createdAt}
                  onChange={toDate => onDateChange(toDate, 'createdAt')}
                />
              </div>

              <div
                className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>
                  Updated At
                </label>
                <IMDatePicker
                  selected={modifiedNonFormData.updatedAt}
                  onChange={toDate => onDateChange(toDate, 'updatedAt')}
                />
              </div>

              <div
                className={`${styles.FormActionContainer} FormActionContainer`}>
                <button
                  className={`${styles.PrimaryButton} PrimaryButton`}
                  type="submit"
                  disabled={isSubmitting}>
                  Save user
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
