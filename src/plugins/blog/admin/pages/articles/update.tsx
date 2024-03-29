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
    import('codemirror/mode/javascript/javascript')
    import('codemirror/mode/css/css')
    import('codemirror/mode/htmlmixed/htmlmixed')
    import('codemirror/mode/markdown/markdown')
    return import('react-codemirror2').then(mod => mod.Controlled)
  },
  { ssr: false },
)
import styles from '../../../../../admin/themes/admin.module.css'

/* Insert extra imports here */
import IMArticleTagsMultipleTypeaheadIdComponent from '../../components/IMArticleTagsMultipleTypeaheadIdComponent.js'

import ArticleCategoryTypeaheadComponent from '../../components/ArticleCategoryTypeaheadComponent.js'

import ArticleAuthorTypeaheadComponent from '../../components/ArticleAuthorTypeaheadComponent.js'


const beautify_html = require('js-beautify').html
import { pluginsAPIURL } from '../../../../../config/config'
import {
  authFetch,
  authPost,
} from '../../../../../modules/auth/utils/authFetch'
const baseAPIURL = `${pluginsAPIURL}admin/blog/`

const UpdateArticleView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)
  const [modifiedNonFormData, setModifiedNonFormData] = useState({})

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch(
          baseAPIURL + 'articles/view?id=' + id,
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
          if (originalData.content) {
              nonFormData['content'] = originalData.content
          }
          
          if (originalData.cover_photo) {
              nonFormData['cover_photo'] = originalData.cover_photo
          }
          
          if (originalData.photo_urls) {
              nonFormData['photo_urls'] = originalData.photo_urls
          }
          
          if (originalData.published) {
              nonFormData['published'] = originalData.published
          }
          
          if (originalData.outdated) {
              nonFormData['outdated'] = originalData.outdated
          }
          
          if (originalData.tags) {
              nonFormData['tags'] = originalData.tags
          }
          
          if (originalData.created_at) {
              nonFormData['created_at'] = originalData.created_at
          }
          
          if (originalData.updated_at) {
              nonFormData['updated_at'] = originalData.updated_at
          }
          

    console.log(nonFormData)
    setModifiedNonFormData(nonFormData)
  }

  const saveChanges = async (modifiedData, setSubmitting) => {
    const response = await authPost(
      baseAPIURL + 'articles/update?id=' + id,
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
                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Title</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="title"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.title && touched.title && errors.title}
                        </p>
                    </div>
    

    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
        <label className={`${styles.FormLabel} FormLabel`}>Content</label>

        <div className={`${styles.FormEditorContainer} FormEditorContainer`}>
          <Editor
            defaultValue={modifiedNonFormData.content}
            onChange={value => {
              onCodeChange(value(), 'content')
            }}
          />
        </div>
        <p className={`${styles.ErrorMessage} ErrorMessage`}>
            {errors.content && touched.content && errors.content}
        </p>
    </div>


                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Cover Photo</label>
                        {modifiedNonFormData.cover_photo && (
                            <IMPhoto openable dismissable className="photo" src={modifiedNonFormData.cover_photo} onDelete={(src) => handleDeletePhoto(src, "cover_photo", false) } />
                        )}
                        <input className="FormFileField" id="cover_photo" name="cover_photo" type="file" onChange={(event) => {
                            handleImageUpload(event, "cover_photo", false);
                        }} />
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Photos</label>
                        {modifiedNonFormData.photo_urls && modifiedNonFormData.photo_urls.map((url) =>
                            <IMPhoto openable dismissable className="photo" src={url} onDelete={(src) => handleDeletePhoto(src, "photo_urls", true) } />
                        )}
                        <input className="FormFileField" multiple id="photo_urls" name="photo_urls" type="file" onChange={(event) => {
                            handleImageUpload(event, "photo_urls", true);
                        }} />
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Github URL</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="source_code_url"
                            name="source_code_url"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.source_code_url}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.source_code_url && touched.source_code_url && errors.source_code_url}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Canonical URL</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="canonical_url"
                            name="canonical_url"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.canonical_url}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.canonical_url && touched.canonical_url && errors.canonical_url}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Published</label>
                        <IMToggleSwitchComponent isChecked={modifiedNonFormData.published} onSwitchChange={() => handleSwitchChange(modifiedNonFormData["published"], "published")} />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.published && touched.published && errors.published}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Outdated</label>
                        <IMToggleSwitchComponent isChecked={modifiedNonFormData.outdated} onSwitchChange={() => handleSwitchChange(modifiedNonFormData["outdated"], "outdated")} />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.outdated && touched.outdated && errors.outdated}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Slug</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="slug"
                            name="slug"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.slug}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.slug && touched.slug && errors.slug}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>SEO Title</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="seo_title"
                            name="seo_title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.seo_title}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.seo_title && touched.seo_title && errors.seo_title}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>SEO Description</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="seo_description"
                            name="seo_description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.seo_description}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.seo_description && touched.seo_description && errors.seo_description}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>SEO Keyword</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="seo_keyword"
                            name="seo_keyword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.seo_keyword}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.seo_keyword && touched.seo_keyword && errors.seo_keyword}
                        </p>
                    </div>
    

          <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
              <label className={`${styles.FormLabel} FormLabel`}>Author</label>
              <ArticleAuthorTypeaheadComponent onSelect={(value) => onTypeaheadSelect(value, "author_id")} id={originalData && originalData.author_id} name={originalData && originalData.author_id} />
          </div>
      

          <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
              <label className={`${styles.FormLabel} FormLabel`}>Category</label>
              <ArticleCategoryTypeaheadComponent onSelect={(value) => onTypeaheadSelect(value, "category_id")} id={originalData && originalData.category_id} name={originalData && originalData.category_id} />
          </div>
      

          <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
              <label className={`${styles.FormLabel} FormLabel`}>ArticleTags</label>
              <IMArticleTagsMultipleTypeaheadIdComponent onSelect={(value) => onMultipleTypeaheadSelect(value, "tags")} onDelete={(index) => onMultipleTypeaheadDelete(index, "tags")} ids={modifiedNonFormData.tags} name={"tags"} />
          </div>
      

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Created At</label>
                        <IMDatePicker
                            selected={modifiedNonFormData.created_at}
                            onChange={(toDate) => onDateChange(toDate, "created_at")}
                        />
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Updated At</label>
                        <IMDatePicker
                            selected={modifiedNonFormData.updated_at}
                            onChange={(toDate) => onDateChange(toDate, "updated_at")}
                        />
                    </div>
    


              <div
                className={`${styles.FormActionContainer} FormActionContainer`}>
                <button
                  className={`${styles.PrimaryButton} PrimaryButton`}
                  type="submit"
                  disabled={isSubmitting}>
                  Save article
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UpdateArticleView
