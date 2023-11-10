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
import TripTaxiCategoryTypeaheadComponent from '../../components/TripTaxiCategoryTypeaheadComponent.js'

import TripPassengerTypeaheadComponent from '../../components/TripPassengerTypeaheadComponent.js'

import TaxiTripPassengerTypeaheadComponent from '../../components/TaxiTripPassengerTypeaheadComponent.js'


const beautify_html = require('js-beautify').html
import { pluginsAPIURL } from '../../../../../config/config'
import {
  authFetch,
  authPost,
} from '../../../../../modules/auth/utils/authFetch'
const baseAPIURL = `${pluginsAPIURL}admin/taxi/`

const UpdateTaxiTripView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)
  const [modifiedNonFormData, setModifiedNonFormData] = useState({})

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch(
          baseAPIURL + 'taxi_trips/view?id=' + id,
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
          if (originalData.pickup) {
              nonFormData['pickup'] = originalData.pickup
          }
          
          if (originalData.dropoff) {
              nonFormData['dropoff'] = originalData.dropoff
          }
          
          if (originalData.status) {
              nonFormData['status'] = originalData.status
          }
          
          if (originalData.passenger) {
              nonFormData['passenger'] = originalData.passenger
          }
          
          if (originalData.ride) {
              nonFormData['ride'] = originalData.ride
          }
          
          if (originalData.carDrive) {
              nonFormData['carDrive'] = originalData.carDrive
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
      baseAPIURL + 'taxi_trips/update?id=' + id,
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
        if (!values.status) {
            errors.status = 'Field Required!'
        }

        if (!values.passenger) {
            errors.passenger = 'Field Required!'
        }

        if (!values.createdAt) {
            errors.createdAt = 'Field Required!'
        }

        if (!values.updatedAt) {
            errors.updatedAt = 'Field Required!'
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
                        <label className={`${styles.FormLabel} FormLabel`}>Pickup Location</label>
                        <LocationPicker
                            initialValue={modifiedNonFormData.pickup && modifiedNonFormData.pickup.address}
                            onLocationChange={(addressObject) => onLocationChange(addressObject, "pickup")}                    
                        />
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Dropoff Location</label>
                        <LocationPicker
                            initialValue={modifiedNonFormData.dropoff && modifiedNonFormData.dropoff.address}
                            onLocationChange={(addressObject) => onLocationChange(addressObject, "dropoff")}                    
                        />
                    </div>
    

              <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                  <label className={`${styles.FormLabel} FormLabel`}>Status</label>
                  <IMStaticSelectComponent
                      options={["awaiting_driver","no_driver_found","passenger_cancelled","driver_rejected","driver_accepted","trip_started","trip_completed"]}
                      name="status"
                      onChange={handleSelectChange}
                      selectedOption={modifiedNonFormData.status}
                  />
                  <p className={`${styles.ErrorMessage} ErrorMessage`}>
                      {errors.status && touched.status && errors.status}
                  </p>
              </div>
              

          <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
              <label className={`${styles.FormLabel} FormLabel`}>Passenger</label>
              <TaxiTripPassengerTypeaheadComponent onSelect={(value) => onTypeaheadSelect(value, "passenger")} id={originalData && originalData.passenger.id} name={originalData && originalData.passenger} />
          </div>
      

          <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
              <label className={`${styles.FormLabel} FormLabel`}>Passenger ID</label>
              <TripPassengerTypeaheadComponent onSelect={(value) => onTypeaheadSelect(value, "passengerID")} id={originalData && originalData.passengerID} name={originalData && originalData.passengerID} />
          </div>
      

          <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
              <label className={`${styles.FormLabel} FormLabel`}>Car Type</label>
              <TripTaxiCategoryTypeaheadComponent onSelect={(value) => onTypeaheadSelect(value, "carType")} id={originalData && originalData.carType} name={originalData && originalData.carType} />
          </div>
      

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Price Range</label>
                        <input
                            className={`${styles.FormTextField} FormTextField`}
                            type="priceRange"
                            name="priceRange"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.priceRange}
                        />
                        <p className={`${styles.ErrorMessage} ErrorMessage`}>
                            {errors.priceRange && touched.priceRange && errors.priceRange}
                        </p>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Ride</label>
                        <div className={`${styles.FormArrayField} FormArrayField`}>
                            <IMObjectInputComponent 
                            keyPlaceholder="Ride Name" 
                            valuePlaceholder="Ride Value" 
                            handleClick={(key, value) => handleObjectInput(key, value, "ride")} 
                            handleDelete={(key) => handleObjectDelete(key, "ride")} 
                            data={modifiedNonFormData["ride"]}
                        />
                            <p className={`${styles.ErrorMessage} ErrorMessage`}>
                                {errors.ride && touched.ride && errors.ride}
                            </p>
                        </div>
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Current Location</label>
                        <LocationPicker
                            initialValue={modifiedNonFormData.carDrive && modifiedNonFormData.carDrive.address}
                            onLocationChange={(addressObject) => onLocationChange(addressObject, "carDrive")}                    
                        />
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Created At</label>
                        <IMDatePicker
                            selected={modifiedNonFormData.createdAt}
                            onChange={(toDate) => onDateChange(toDate, "createdAt")}
                        />
                    </div>
    

                    <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                        <label className={`${styles.FormLabel} FormLabel`}>Updated At</label>
                        <IMDatePicker
                            selected={modifiedNonFormData.updatedAt}
                            onChange={(toDate) => onDateChange(toDate, "updatedAt")}
                        />
                    </div>
    


              <div
                className={`${styles.FormActionContainer} FormActionContainer`}>
                <button
                  className={`${styles.PrimaryButton} PrimaryButton`}
                  type="submit"
                  disabled={isSubmitting}>
                  Save taxi_trip
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UpdateTaxiTripView
