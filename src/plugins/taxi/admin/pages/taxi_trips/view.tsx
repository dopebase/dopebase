// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { formatTimestamp } from '../../../../../utils'
import {
  IMForeignKeyComponent,
  IMForeignKeysComponent,
  IMMultimediaComponent,
  IMForeignKeysIdComponent,
  IMPhoto,
  IMToggleSwitchComponent,
  IMColorBoxComponent,
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

const beautify_html = require('js-beautify').html
import { pluginsAPIURL } from '../../../../../config/config'
import { authFetch } from '../../../../../modules/auth/utils/authFetch'
const baseAPIURL = `${pluginsAPIURL}admin/taxi/`

const DetailedTripsView = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)

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
        } else {
          alert('Error fetching data - try refreshing the page')
        }
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (isLoading || !originalData) {
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

  const editPath = './update?id=' + id

  return (
    <div className={`${styles.FormCard} ${styles.Card} Card FormCard`}>
      <div className={`${styles.CardBody} CardBody`}>
        <h1>
          {originalData && originalData.name}
          <a
            className={`${styles.Link} ${styles.EditLink} Link EditLink`}
            href={editPath}>
            Edit
          </a>
        </h1>

        {/* Insert all view form fields here */}
            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>ID</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.id}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Pickup Location</label>
                {originalData.pickup && (
                    <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.pickup.address ?? `Lat: ${originalData.pickup.latitude} Long: ${originalData.pickup.longitude}` }</span>
                )}
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Dropoff Location</label>
                {originalData.dropoff && (
                    <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.dropoff.address ?? `Lat: ${originalData.dropoff.latitude} Long: ${originalData.dropoff.longitude}` }</span>
                )}
            </div>
    

              <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                  <label className={`${styles.FormLabel} FormLabel`}>Status</label>
                  <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData && originalData.status}</span>
              </div>
          

             <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Passenger</label>
                <IMForeignKeyComponent id={originalData.passenger.id} apiRouteName="admin/taxi/users" viewRoute="../users" titleKey="email" />
            </div>
    

             <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Passenger ID</label>
                <IMForeignKeyComponent id={originalData.passengerID} apiRouteName="admin/taxi/users" viewRoute="../users" titleKey="email" />
            </div>
    

             <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Car Type</label>
                <IMForeignKeyComponent id={originalData.carType} apiRouteName="admin/taxi/taxi_car_categories" viewRoute="../taxi_car_categories" titleKey="name" />
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Price Range</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.priceRange}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Ride</label>
                <span className={`${styles.FormArrayField} FormArrayField`}>
                    { originalData.ride && Object.keys(originalData.ride).map( key => {
                        if(typeof originalData.ride[key] === "string" || typeof originalData.ride[key] === "number") {
                            return (<li>{key}: {originalData.ride[key]}</li>)}
                        }
                    )}
                </span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Current Location</label>
                {originalData.carDrive && (
                    <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.carDrive.address ?? `Lat: ${originalData.carDrive.latitude} Long: ${originalData.carDrive.longitude}` }</span>
                )}
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Created At</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.createdAt && formatTimestamp(originalData.createdAt)}</span>
            </div>
    

            <div className={`${styles.FormFieldContainer} FormFieldContainer`}>
                <label className={`${styles.FormLabel} FormLabel`}>Updated At</label>
                <span className={`${styles.LockedFieldValue} LockedFieldValue`}>{originalData.updatedAt && formatTimestamp(originalData.updatedAt)}</span>
            </div>
    

      </div>
    </div>
  )
}

export default DetailedTripsView
