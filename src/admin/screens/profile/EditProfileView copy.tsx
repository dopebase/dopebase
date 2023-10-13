// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { ClipLoader } from 'react-spinners'
import Editor from 'rich-markdown-editor'

import styles from './Profile.module.css'
import { pluginsAPIURL } from '../../../config/config'

const baseAPIURL = `${pluginsAPIURL}admin/blog/`

const EditProfileView = props => {
  const { user } = props
  const { id } = user
  const userId = id

  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)
  const [modifiedNonFormData, setModifiedNonFormData] = useState({})

  useEffect(() => {
    fetch(baseAPIURL + 'admin/users/view?id=' + userId)
      .then(response => response.json())
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
      .then(data => {
        setOriginalData({ ...data, password: '', confirmPassword: '' })
        if (data) {
          initializeModifieableNonFormData(data)
        }
        setIsLoading(false)
      })
  }, [userId])

  const initializeModifieableNonFormData = originalData => {
    var nonFormData = {}
    if (originalData.bio_description) {
      nonFormData['bio_description'] = originalData.bio_description
    }
    setModifiedNonFormData(nonFormData)
  }

  const saveChanges = async (modifiedData, setSubmitting) => {
    const response = await fetch(baseAPIURL + 'admin/users/update/' + userId, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...modifiedData, ...modifiedNonFormData }), // body data type must match "Content-Type" header
    })

    if (response.ok) {
      response.json().then(res => {
        if (!res.error) {
          window.location.reload()
        }
      })
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

    fetch(baseAPIURL + 'upload', {
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

    fetch(baseAPIURL + 'uploadMultimedias', {
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
    <div className="Card FormCard">
      <div className="CardBody">
        <h1>Manage Your Account</h1>
        <Formik
          initialValues={originalData}
          validate={values => {
            values = { ...values, ...modifiedNonFormData }
            const errors = {}
            {
              /* Insert all form errors here */
              if (!values.email) {
                errors.email = 'Required'
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
              <div className="FormFieldContainer">
                <label className="FormLabel">Email</label>
                <input
                  className="FormTextField"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <p className="ErrorMessage">
                  {errors.email && touched.email && errors.email}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">First Name</label>
                <input
                  className="FormTextField"
                  type="first_name"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                />
                <p className="ErrorMessage">
                  {errors.first_name && touched.first_name && errors.first_name}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">Last Name</label>
                <input
                  className="FormTextField"
                  type="last_name"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                />
                <p className="ErrorMessage">
                  {errors.last_name && touched.last_name && errors.last_name}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">Phone</label>
                <input
                  className="FormTextField"
                  type="phone"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <p className="ErrorMessage">
                  {errors.phone && touched.phone && errors.phone}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">Short Bio</label>
                <input
                  className="FormTextField"
                  type="bio_title"
                  name="bio_title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bio_title}
                />
                <p className="ErrorMessage">
                  {errors.bio_title && touched.bio_title && errors.bio_title}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">Long Bio</label>

                <div className="FormEditorContainer FormTextField">
                  <Editor
                    defaultValue={modifiedNonFormData.bio_description}
                    onChange={value => {
                      onCodeChange(value(), 'bio_description')
                    }}
                  />
                </div>
                <p className="ErrorMessage">
                  {errors.bio_description &&
                    touched.bio_description &&
                    errors.bio_description}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">Website URL</label>
                <input
                  className="FormTextField"
                  type="website_url"
                  name="website_url"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.website_url}
                />
                <p className="ErrorMessage">
                  {errors.website_url &&
                    touched.website_url &&
                    errors.website_url}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">Username</label>
                <input
                  className="FormTextField"
                  type="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <p className="ErrorMessage">
                  {errors.username && touched.username && errors.username}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">Password</label>
                <input
                  className="FormTextField"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <p className="ErrorMessage">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className={'FormLabel'}>Confirm Password</label>
                <input
                  className="FormTextField"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <p className="ErrorMessage">
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </p>
              </div>

              <div className="FormActionContainer">
                <button
                  className="PrimaryButton"
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

export default EditProfileView
