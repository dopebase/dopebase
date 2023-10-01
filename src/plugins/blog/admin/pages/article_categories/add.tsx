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
  IMTypeaheadComponent,
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
// import IMParentArticleCategoryTypeaheadComponent from '../../ui/IMParentArticleCategoryTypeaheadComponent.js'
import { pluginsAPIURL } from '../../../../../config/config'
import { authPost } from '../../../../../modules/auth/utils/authFetch'

const beautify_html = require('js-beautify').html
const baseAPIURL = `${pluginsAPIURL}`

const AddNewCategoryView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [modifiedNonFormData, setModifiedNonFormData] = useState({})
  const [originalData, setOriginalData] = useState(null)

  useEffect(() => {
    setModifiedNonFormData({
      created_at: Math.floor(new Date().getTime() / 1000).toString(),
    })
  }, [])

  const createCategory = async (data, setSubmitting) => {
    console.log(JSON.stringify(data))
    setIsLoading(true)
    const url = `${baseAPIURL}admin/blog/article_categories/add`
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
    <div className={styles.FormCard}>
      <div className="CardBody">
        <h1>Create New Category</h1>
        <Formik
          initialValues={{}}
          validate={values => {
            values = { ...values, ...modifiedNonFormData }
            const errors = {}
            {
              /* Insert all form errors here */
            }

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            createCategory(values, setSubmitting)
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
              <div className={styles.FormFieldContainer}>
                <label className={styles.FormLabel}>Name</label>
                <input
                  className={styles.FormTextField}
                  type="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <p className={styles.ErrorMessage}>
                  {errors.name && touched.name && errors.name}
                </p>
              </div>

              <div className={styles.FormFieldContainer}>
                <label className={styles.FormLabel}>Description</label>

                <div
                  className={`${styles.FormEditorContainer} ${styles.FormTextField}`}>
                  <Editor
                    defaultValue={modifiedNonFormData.description}
                    onChange={value => {
                      onCodeChange(value(), 'description')
                    }}
                  />
                </div>
                <p className={styles.ErrorMessage}>
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </p>
              </div>

              <div className={styles.FormFieldContainer}>
                <label className={styles.FormLabel}>Slug</label>
                <input
                  className={styles.FormTextField}
                  type="slug"
                  name="slug"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.slug}
                />
                <p className="ErrorMessage">
                  {errors.slug && touched.slug && errors.slug}
                </p>
              </div>

              <div className={styles.FormFieldContainer}>
                <label className="FormLabel">Logo</label>
                {modifiedNonFormData.logo_url && (
                  <IMPhoto
                    openable
                    dismissable
                    className="photo"
                    src={modifiedNonFormData.logo_url}
                    onDelete={src => handleDeletePhoto(src, 'logo_url', false)}
                  />
                )}
                <input
                  className={styles.FormFileField}
                  id="logo_url"
                  name="logo_url"
                  type="file"
                  onChange={event => {
                    handleImageUpload(event, 'logo_url', false)
                  }}
                />
              </div>

              <div className={styles.FormFieldContainer}>
                <label className="FormLabel">SEO Title</label>
                <input
                  className="FormTextField"
                  type="seo_title"
                  name="seo_title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.seo_title}
                />
                <p className="ErrorMessage">
                  {errors.seo_title && touched.seo_title && errors.seo_title}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">SEO Description</label>
                <input
                  className="FormTextField"
                  type="seo_description"
                  name="seo_description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.seo_description}
                />
                <p className="ErrorMessage">
                  {errors.seo_description &&
                    touched.seo_description &&
                    errors.seo_description}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">Canonical URL</label>
                <input
                  className="FormTextField"
                  type="canonical_url"
                  name="canonical_url"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.canonical_url}
                />
                <p className="ErrorMessage">
                  {errors.canonical_url &&
                    touched.canonical_url &&
                    errors.canonical_url}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">SEO Cover Image</label>
                {modifiedNonFormData.seo_image_url && (
                  <IMPhoto
                    openable
                    dismissable
                    className="photo"
                    src={modifiedNonFormData.seo_image_url}
                    onDelete={src =>
                      handleDeletePhoto(src, 'seo_image_url', false)
                    }
                  />
                )}
                <input
                  className="FormFileField"
                  id="seo_image_url"
                  name="seo_image_url"
                  type="file"
                  onChange={event => {
                    handleImageUpload(event, 'seo_image_url', false)
                  }}
                />
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">Published</label>
                <IMToggleSwitchComponent
                  isChecked={modifiedNonFormData.published}
                  onSwitchChange={() =>
                    handleSwitchChange(
                      modifiedNonFormData['published'],
                      'published',
                    )
                  }
                />
                <p className="ErrorMessage">
                  {errors.published && touched.published && errors.published}
                </p>
              </div>

              <div className="FormFieldContainer">
                <label className="FormLabel">Parent Category</label>
                {/* <IMParentArticleCategoryTypeaheadComponent
                  onSelect={value => onTypeaheadSelect(value, 'parent_id')}
                  id={originalData && originalData.parent_id}
                  name={originalData && originalData.parent_id}
                /> */}
              </div>

              <div className={styles.FormActionContainer}>
                <button
                  className={styles.PrimaryButton}
                  type="submit"
                  disabled={isSubmitting}>
                  Create category
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddNewCategoryView
